// Vercel Serverless Function — runs on the server, keeps API keys secret.
// Endpoint: POST /api/quote
// Includes: in-memory rate limiting + honeypot spam protection.
// Perf: geocodes both ZIPs in parallel; emails are sent in the background
// (waitUntil) so the customer sees their quote immediately.

import { waitUntil } from "@vercel/functions";

const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 60_000;
const hits = new Map();

function isRateLimited(ip) {
  const now = Date.now();
  const arr = (hits.get(ip) || []).filter((t) => now - t < RATE_WINDOW_MS);
  arr.push(now);
  hits.set(ip, arr);
  if (hits.size > 5000) {
    for (const [k, v] of hits) {
      if (v.every((t) => now - t > RATE_WINDOW_MS)) hits.delete(k);
    }
  }
  return arr.length > RATE_LIMIT;
}

// Promo codes and their discounts
const PROMO_CODES = {
  USSTAR50: { discount: 50, label: "$50 off first shipment" },
  USSTAR100: { discount: 100, label: "$100 off second shipment" },
  REFER50: { discount: 50, label: "$50 off referral" },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const ip =
    (req.headers["x-forwarded-for"] || "").split(",")[0].trim() ||
    req.socket?.remoteAddress ||
    "unknown";

  if (isRateLimited(ip)) {
    return res.status(429).json({ error: "RATE_LIMITED" });
  }

  const ORS_KEY = (process.env.ORS_KEY || "").trim();
  const EMAILJS_SERVICE = (process.env.EMAILJS_SERVICE_ID || "").trim();
  const EMAILJS_TEMPLATE = (process.env.EMAILJS_TEMPLATE_ID || "").trim();
  const EMAILJS_CUSTOMER_TEMPLATE = (process.env.EMAILJS_CUSTOMER_TEMPLATE_ID || "").trim();
  const EMAILJS_PUBLIC = (process.env.EMAILJS_PUBLIC_KEY || "").trim();
  const EMAILJS_PRIVATE = (process.env.EMAILJS_PRIVATE_KEY || "").trim();

  if (!ORS_KEY) {
    return res.status(500).json({ error: "Server not configured (missing ORS key)" });
  }

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;

    // Honeypot
    if (body.website || body.company_url) {
      return res.status(200).json({ quote: null, emailSent: false, ignored: true });
    }

    const { pickup, delivery, vehicle, condition, transport, promoCode } = body;
    if (!pickup || !delivery || !vehicle || !condition || !transport) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    if (!/^\d{5}$/.test(String(pickup)) || !/^\d{5}$/.test(String(delivery))) {
      return res.status(422).json({ error: "INVALID_ZIP" });
    }

    // 1. Geocode both ZIPs — in parallel
    const geocode = async (zip) => {
      const r = await fetch(
        `https://api.openrouteservice.org/geocode/search?api_key=${ORS_KEY}&text=${encodeURIComponent(zip)}&boundary.country=USA&size=1`
      );
      const d = await r.json();
      if (!d.features || d.features.length === 0) throw new Error("INVALID_ZIP");
      const f = d.features[0];
      return {
        coordinates: f.geometry.coordinates,
        city: f.properties.locality || f.properties.county || f.properties.region || "",
        state: f.properties.region_a || f.properties.region || "",
      };
    };

    let origin, destination;
    try {
      [origin, destination] = await Promise.all([geocode(pickup), geocode(delivery)]);
    } catch (e) {
      if (e.message === "INVALID_ZIP") return res.status(422).json({ error: "INVALID_ZIP" });
      throw e;
    }

    // 2. Route via ORS
    const routeRes = await fetch(
      "https://api.openrouteservice.org/v2/directions/driving-car",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${ORS_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          coordinates: [origin.coordinates, destination.coordinates],
          radiuses: [-1, -1],
        }),
      }
    );
    const routeData = await routeRes.json();
    if (!routeData.routes || routeData.routes.length === 0) {
      return res.status(422).json({ error: "NO_ROUTE" });
    }

    const summary = routeData.routes[0].summary;
    const miles = Math.round(summary.distance * 0.000621371);
    const hours = summary.duration / 3600;

    // 3. Calculate base price
    let basePrice = calculateQuote(miles, vehicle, condition, transport);

    // 4. Apply promo code discount
    const code = (promoCode || "").toString().toUpperCase().trim();
    const promo = PROMO_CODES[code] || null;
    let finalPrice = basePrice;
    let discountApplied = 0;

    if (promo) {
      discountApplied = promo.discount;
      finalPrice = Math.max(0, basePrice - discountApplied);
    }

    const quote = {
      miles,
      distance: `${miles} miles`,
      duration: `${hours.toFixed(1)} hours`,
      price: finalPrice,
      originalPrice: basePrice,
      discountApplied,
      promoCode: promo ? code : null,
      promoLabel: promo ? promo.label : null,
      pickupCity: origin.city,
      pickupState: origin.state,
      deliveryCity: destination.city,
      deliveryState: destination.state,
    };

    // Helper — send one email via EmailJS
    const sendEmail = async (templateId, templateParams) => {
      const payload = {
        service_id: EMAILJS_SERVICE,
        template_id: templateId,
        user_id: EMAILJS_PUBLIC,
        template_params: templateParams,
      };
      if (EMAILJS_PRIVATE) payload.accessToken = EMAILJS_PRIVATE;

      const r = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!r.ok) {
        const text = await r.text();
        console.error(`EmailJS error (template ${templateId}):`, text);
        return false;
      }
      return true;
    };

    const sharedParams = {
      ...body,
      distance: quote.distance,
      duration: quote.duration,
      miles: quote.miles,
      route: `${origin.city}, ${origin.state} (${pickup}) → ${destination.city}, ${destination.state} (${delivery})`,
      estimated_price: `$${quote.price}`,
      original_price: `$${quote.originalPrice}`,
      discount_applied: discountApplied > 0 ? `$${discountApplied} off (${code})` : "None",
    };

    // 5 + 6. Send both emails in the BACKGROUND — the customer gets their
    // quote immediately instead of waiting for EmailJS.
    const emailJobs = [];

    if (EMAILJS_SERVICE && EMAILJS_TEMPLATE && EMAILJS_PUBLIC) {
      emailJobs.push(sendEmail(EMAILJS_TEMPLATE, sharedParams));
    }

    const customerEmail = (body.email || "").toString().trim();
    const looksLikeEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerEmail);

    if (
      EMAILJS_SERVICE &&
      EMAILJS_CUSTOMER_TEMPLATE &&
      EMAILJS_PUBLIC &&
      looksLikeEmail
    ) {
      emailJobs.push(
        sendEmail(EMAILJS_CUSTOMER_TEMPLATE, {
          ...sharedParams,
          customer_email: customerEmail,
          customer_name: (body.name || "there").toString().trim() || "there",
        })
      );
    }

    if (emailJobs.length > 0) {
      waitUntil(Promise.allSettled(emailJobs));
    }

    return res.status(200).json({ quote, emailSent: emailJobs.length > 0 });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "SERVER_ERROR" });
  }
}

function calculateQuote(miles, vehicle, condition, transport) {
  let rate;
  if (miles <= 300) rate = 1.3;
  else if (miles <= 700) rate = 1.1;
  else if (miles <= 1200) rate = 0.85;
  else if (miles <= 2400) rate = 0.7;
  else rate = 0.6;

  let price = miles * rate;
  if (price < 200) price = 200;
  if (vehicle === "SUV") price += 100;
  if (vehicle === "Pickup Truck") price += 150;
  if (vehicle === "Van") price += 100;
  if (condition === "Non-Running") price += 100;
  if (transport === "Enclosed") price *= 1.3;

  return Math.round(price);
}