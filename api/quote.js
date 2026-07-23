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

// ============================================================
// ALASKA & HAWAII OCEAN ROUTES
// All rates below are editable business constants (market-checked
// July 2026 against TOTE Maritime, Matson, Pasha Hawaii, and
// Young Brothers published/broker rates).
// ============================================================
const OCEAN = {
  // Lower 48 <-> Hawaii: ground leg to/from Long Beach + ocean freight.
  HI_OCEAN_BASE: 1600,          // per vehicle, West Coast port <-> Honolulu (Oahu)
  HI_NEIGHBOR_ISLAND_FEE: 300,  // extra for Maui / Big Island / Kauai (bi-weekly sailings)
  // Lower 48 <-> Alaska: ground leg to/from Tacoma + ocean freight.
  AK_OCEAN_BASE: 2200,          // per vehicle, Tacoma <-> Anchorage (TOTE/Matson lane)
  AK_FAIRBANKS_FEE: 400,        // inland trucking leg Anchorage <-> Fairbanks
  // Inside Hawaii (Young Brothers barge, hub-and-spoke via Honolulu)
  HI_INTERISLAND_ONE_LEG: 550,  // Oahu <-> any neighbor island
  HI_INTERISLAND_TWO_LEGS: 1000,// neighbor island <-> neighbor island (via Honolulu)
  // Vehicle adjustments on ocean legs
  LARGE_VEHICLE_MULT: 1.2,      // SUV / Pickup Truck / Van (+15-30% market standard)
  ENCLOSED_OCEAN_MULT: 1.5,     // container service instead of RoRo
};

// Port coordinates for the ground leg ([lon, lat] — ORS order)
const PORT_LONG_BEACH = [-118.2160, 33.7542]; // Hawaii gateway
const PORT_TACOMA = [-122.4130, 47.2680];     // Alaska gateway

const ANCHORAGE = [-149.9003, 61.2181];
const FAIRBANKS = [-147.7164, 64.8378];

// EV makes/models restricted by ocean carriers (Matson suspended EVs/PHEVs)
const EV_MAKES = ["tesla", "rivian", "lucid", "polestar"];
const EV_MODELS = ["leaf", "bolt", "ioniq 5", "ioniq 6", "id.4", "ev6", "mach-e", "i4", "ix", "e-tron", "taycan"];

function haversineMiles([lon1, lat1], [lon2, lat2]) {
  const R = 3958.8;
  const toRad = (d) => (d * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// Which Hawaiian island a coordinate falls on (longitude bands)
function hawaiiIsland([lon]) {
  if (lon < -159.0) return "Kauai";
  if (lon < -157.55) return "Oahu";
  if (lon < -155.95) return "Maui"; // Maui county incl. Molokai & Lanai
  return "Big Island";
}

// Alaska service zone for a coordinate
function alaskaZone(coords) {
  const [lon, lat] = coords;
  // Southeast panhandle (Juneau, Ketchikan, Sitka…) — no road connection
  if (lon > -141 && lat < 60.5) return "southeast";
  if (haversineMiles(coords, ANCHORAGE) <= 150) return "anchorage"; // incl. Mat-Su & Kenai
  if (haversineMiles(coords, FAIRBANKS) <= 100) return "fairbanks";
  return "remote";
}

function classifyLocation(geo) {
  const st = (geo.state || "").toUpperCase();
  if (st === "HI" || st === "HAWAII")
    return { region: "hawaii", island: hawaiiIsland(geo.coordinates) };
  if (st === "AK" || st === "ALASKA")
    return { region: "alaska", zone: alaskaZone(geo.coordinates) };
  return { region: "lower48" };
}

function isEV(v) {
  const make = (v.make || "").toLowerCase().trim();
  const model = (v.model || "").toLowerCase().trim();
  return EV_MAKES.includes(make) || EV_MODELS.some((m) => model.includes(m));
}

function oceanFeePerVehicle(base, v, transport) {
  let fee = base;
  if (["SUV", "Pickup Truck", "Van"].includes(v.vehicle)) fee *= OCEAN.LARGE_VEHICLE_MULT;
  if (transport === "Enclosed") fee *= OCEAN.ENCLOSED_OCEAN_MULT;
  return Math.round(fee);
}

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

    const { pickup, delivery, transport, promoCode } = body;
    const mode = body.mode === "estimate" ? "estimate" : "book";

    // Normalize vehicles: prefer the vehicles[] array, fall back to flat fields
    const vehiclesList =
      Array.isArray(body.vehicles) && body.vehicles.length > 0
        ? body.vehicles
        : [{ vehicle: body.vehicle, condition: body.condition }];

    const vehiclesValid = vehiclesList.every((v) => v && v.vehicle && v.condition);

    if (!pickup || !delivery || !transport || !vehiclesValid) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Contact details are only required when booking (step 2), not for estimates
    if (mode === "book" && (!body.name || !body.phone || !body.email)) {
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

    // 2. Classify both ends and pick the route category
    const originLoc = classifyLocation(origin);
    const destLoc = classifyLocation(destination);

    const orsRoute = async (fromCoords, toCoords) => {
      const routeRes = await fetch(
        "https://api.openrouteservice.org/v2/directions/driving-car",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${ORS_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            coordinates: [fromCoords, toCoords],
            radiuses: [-1, -1],
          }),
        }
      );
      const routeData = await routeRes.json();
      if (!routeData.routes || routeData.routes.length === 0) return null;
      const summary = routeData.routes[0].summary;
      return {
        miles: Math.round(summary.distance * 0.000621371),
        hours: summary.duration / 3600,
      };
    };

    const anyEV = vehiclesList.some(isEV);
    const regions = [originLoc.region, destLoc.region];
    const involvesOcean = regions.includes("hawaii") || regions.includes("alaska");

    let miles = 0;
    let hours = 0;
    let basePrice = 0;
    let routeType = "ground";
    let oceanNote = null;
    let manualReason = null;
    let distanceLabel = null;
    let durationLabel = null;

    const manualQuote = (reason) => {
      manualReason = reason;
      routeType = "manual";
    };

    if (originLoc.region === "lower48" && destLoc.region === "lower48") {
      // ---------- Standard Lower 48 route (existing behavior) ----------
      const route = await orsRoute(origin.coordinates, destination.coordinates);
      if (!route) return res.status(422).json({ error: "NO_ROUTE" });
      miles = route.miles;
      hours = route.hours;
      basePrice = vehiclesList.reduce(
        (sum, v) => sum + calculateQuote(miles, v.vehicle, v.condition, transport),
        0
      );
    } else if (involvesOcean && anyEV) {
      // EVs/PHEVs are restricted on ocean carriers — quote personally
      manualQuote("Electric vehicles have carrier restrictions on ocean routes — our specialist will confirm availability and price.");
    } else if (
      (originLoc.region === "lower48" && destLoc.region === "hawaii") ||
      (originLoc.region === "hawaii" && destLoc.region === "lower48")
    ) {
      // ---------- Lower 48 <-> Hawaii: ground leg to Long Beach + ocean ----------
      const mainland = originLoc.region === "lower48" ? origin : destination;
      const islandSide = originLoc.region === "hawaii" ? originLoc : destLoc;
      const route = await orsRoute(mainland.coordinates, PORT_LONG_BEACH);
      if (!route) return res.status(422).json({ error: "NO_ROUTE" });
      miles = route.miles;
      hours = route.hours;
      const neighborFee = islandSide.island === "Oahu" ? 0 : OCEAN.HI_NEIGHBOR_ISLAND_FEE;
      basePrice = vehiclesList.reduce(
        (sum, v) =>
          sum +
          calculateQuote(miles, v.vehicle, v.condition, transport) +
          oceanFeePerVehicle(OCEAN.HI_OCEAN_BASE + neighborFee, v, transport),
        0
      );
      routeType = "hawaii";
      oceanNote = "Includes ocean freight via West Coast port — final ocean rate confirmed at booking.";
      distanceLabel = `${miles} mi ground + ~2,500 mi ocean`;
      durationLabel = "≈ 2–3 weeks door to door";
    } else if (
      (originLoc.region === "lower48" && destLoc.region === "alaska") ||
      (originLoc.region === "alaska" && destLoc.region === "lower48")
    ) {
      // ---------- Lower 48 <-> Alaska: ground leg to Tacoma + ocean ----------
      const akSide = originLoc.region === "alaska" ? originLoc : destLoc;
      if (akSide.zone === "southeast" || akSide.zone === "remote") {
        manualQuote("This Alaska destination is off the main road system — our specialist will price the barge/ferry leg personally.");
      } else {
        const mainland = originLoc.region === "lower48" ? origin : destination;
        const route = await orsRoute(mainland.coordinates, PORT_TACOMA);
        if (!route) return res.status(422).json({ error: "NO_ROUTE" });
        miles = route.miles;
        hours = route.hours;
        const inlandFee = akSide.zone === "fairbanks" ? OCEAN.AK_FAIRBANKS_FEE : 0;
        basePrice = vehiclesList.reduce(
          (sum, v) =>
            sum +
            calculateQuote(miles, v.vehicle, v.condition, transport) +
            oceanFeePerVehicle(OCEAN.AK_OCEAN_BASE, v, transport) +
            inlandFee,
          0
        );
        routeType = "alaska";
        oceanNote = "Includes ocean freight via Port of Tacoma — final ocean rate confirmed at booking.";
        distanceLabel = `${miles} mi ground + ~1,650 mi ocean`;
        durationLabel = akSide.zone === "fairbanks" ? "≈ 3–4 weeks door to door" : "≈ 2–3 weeks door to door";
      }
    } else if (originLoc.region === "hawaii" && destLoc.region === "hawaii") {
      // ---------- Inside Hawaii ----------
      if (originLoc.island === destLoc.island) {
        // Same island — normal ground transport
        const route = await orsRoute(origin.coordinates, destination.coordinates);
        if (!route) return res.status(422).json({ error: "NO_ROUTE" });
        miles = route.miles;
        hours = route.hours;
        basePrice = vehiclesList.reduce(
          (sum, v) => sum + calculateQuote(miles, v.vehicle, v.condition, transport),
          0
        );
      } else {
        // Inter-island barge (Young Brothers, hub-and-spoke via Honolulu)
        const oneLeg = originLoc.island === "Oahu" || destLoc.island === "Oahu";
        const bargeBase = oneLeg ? OCEAN.HI_INTERISLAND_ONE_LEG : OCEAN.HI_INTERISLAND_TWO_LEGS;
        basePrice = vehiclesList.reduce(
          (sum, v) => sum + oceanFeePerVehicle(bargeBase, v, transport),
          0
        );
        miles = Math.round(haversineMiles(origin.coordinates, destination.coordinates));
        hours = 0;
        routeType = "interisland";
        oceanNote = oneLeg
          ? "Inter-island barge service — sailing schedule confirmed at booking."
          : "Inter-island barge via Honolulu (two legs) — sailing schedule confirmed at booking.";
        distanceLabel = `${originLoc.island} → ${destLoc.island} by barge`;
        durationLabel = oneLeg ? "≈ 3–7 days" : "≈ 1–2 weeks";
      }
    } else if (originLoc.region === "alaska" && destLoc.region === "alaska") {
      // ---------- Inside Alaska ----------
      const roadZones = ["anchorage", "fairbanks"];
      if (roadZones.includes(originLoc.zone) && roadZones.includes(destLoc.zone)) {
        const route = await orsRoute(origin.coordinates, destination.coordinates);
        if (!route) {
          manualQuote("We couldn't confirm a road route for this Alaska lane — our specialist will price it personally.");
        } else {
          miles = route.miles;
          hours = route.hours;
          basePrice = vehiclesList.reduce(
            (sum, v) => sum + calculateQuote(miles, v.vehicle, v.condition, transport),
            0
          );
          // Winter-capable AK carriers run at a premium over Lower 48 rates
          basePrice = Math.round(basePrice * 1.25);
          routeType = "alaska-ground";
        }
      } else {
        manualQuote("One of these Alaska locations is off the main road system — our specialist will price the barge/ferry leg personally.");
      }
    } else {
      // ---------- Alaska <-> Hawaii (two ocean legs via Tacoma) ----------
      manualQuote("Alaska–Hawaii shipments involve two ocean legs — our specialist will build this quote personally.");
    }

    // Manual-quote routes: no instant price, but still a valid submission —
    // the lead is captured and (in book mode) emails still fire.
    if (routeType === "manual") {
      const quote = {
        manual: true,
        manualReason,
        miles: 0,
        distance: "Personally quoted route",
        duration: "Confirmed by our specialist",
        price: null,
        originalPrice: null,
        discountApplied: 0,
        promoCode: null,
        promoLabel: null,
        pickupCity: origin.city,
        pickupState: origin.state,
        deliveryCity: destination.city,
        deliveryState: destination.state,
      };

      if (mode === "estimate") {
        return res.status(200).json({ quote, emailSent: false });
      }

      // Book mode: notify the business + confirm to the customer
      const sendEmailManual = async (templateId, templateParams) => {
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
        if (!r.ok) console.error(`EmailJS error (template ${templateId}):`, await r.text());
        return r.ok;
      };

      const manualParams = {
        ...body,
        first_available_date: body.pickupDate || "Not specified",
        vehicles_summary: vehiclesList
          .map((v) => `${v.year || ""} ${v.make || ""} ${v.model || ""} (${v.vehicle}, ${v.condition})`.trim())
          .join(" | "),
        distance: "Personally quoted route",
        duration: manualReason,
        miles: 0,
        route: `${origin.city}, ${origin.state} (${pickup}) → ${destination.city}, ${destination.state} (${delivery})`,
        estimated_price: "MANUAL QUOTE — call customer",
        original_price: "—",
        discount_applied: "—",
      };

      const manualJobs = [];
      if (EMAILJS_SERVICE && EMAILJS_TEMPLATE && EMAILJS_PUBLIC) {
        manualJobs.push(sendEmailManual(EMAILJS_TEMPLATE, manualParams));
      }
      const custEmail = (body.email || "").toString().trim();
      if (EMAILJS_SERVICE && EMAILJS_CUSTOMER_TEMPLATE && EMAILJS_PUBLIC && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(custEmail)) {
        manualJobs.push(
          sendEmailManual(EMAILJS_CUSTOMER_TEMPLATE, {
            ...manualParams,
            estimated_price: "Personal quote — we'll call you shortly",
            customer_email: custEmail,
            customer_name: (body.name || "there").toString().trim() || "there",
          })
        );
      }
      if (manualJobs.length > 0) waitUntil(Promise.allSettled(manualJobs));

      return res.status(200).json({ quote, emailSent: manualJobs.length > 0 });
    }

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
      distance: distanceLabel || `${miles} miles`,
      duration: durationLabel || `${hours.toFixed(1)} hours`,
      routeType,
      oceanNote,
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

    // Estimate mode (step 1): return the price only — no emails, no lead yet.
    if (mode === "estimate") {
      return res.status(200).json({ quote, emailSent: false });
    }

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
      first_available_date: body.pickupDate || "Not specified",
      vehicles_summary: vehiclesList
        .map((v) => `${v.year || ""} ${v.make || ""} ${v.model || ""} (${v.vehicle}, ${v.condition})`.trim())
        .join(" | "),
      distance: quote.distance,
      duration: quote.duration,
      miles: quote.miles,
      route: `${origin.city}, ${origin.state} (${pickup}) → ${destination.city}, ${destination.state} (${delivery})${oceanNote ? " [OCEAN ROUTE]" : ""}`,
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