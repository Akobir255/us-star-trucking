// Vercel Serverless Function — runs on the server, keeps API keys secret.
// Endpoint: POST /api/quote
// Body: { pickup, delivery, vehicle, condition, transport, ...contactFields }

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const ORS_KEY = process.env.ORS_KEY;
  const EMAILJS_SERVICE = process.env.EMAILJS_SERVICE_ID;
  const EMAILJS_TEMPLATE = process.env.EMAILJS_TEMPLATE_ID;
  const EMAILJS_PUBLIC = process.env.EMAILJS_PUBLIC_KEY;
  const EMAILJS_PRIVATE = process.env.EMAILJS_PRIVATE_KEY; // optional but recommended

  if (!ORS_KEY) {
    return res.status(500).json({ error: "Server not configured (missing ORS key)" });
  }

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    const { pickup, delivery, vehicle, condition, transport } = body;

    if (!pickup || !delivery || !vehicle || !condition || !transport) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // 1. Geocode both ZIPs via ORS
    const geocode = async (zip) => {
      const r = await fetch(
        `https://api.openrouteservice.org/geocode/search?api_key=${ORS_KEY}&text=${encodeURIComponent(zip)}&boundary.country=USA&size=1`
      );
      const d = await r.json();
      if (!d.features || d.features.length === 0) {
        throw new Error("INVALID_ZIP");
      }
      const f = d.features[0];
      return {
        coordinates: f.geometry.coordinates,
        city: f.properties.locality || f.properties.county || f.properties.region || "",
        state: f.properties.region_a || f.properties.region || "",
      };
    };

    let origin, destination;
    try {
      origin = await geocode(pickup);
      destination = await geocode(delivery);
    } catch (e) {
      if (e.message === "INVALID_ZIP") {
        return res.status(422).json({ error: "INVALID_ZIP" });
      }
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

    // 3. Price (same logic as pricing.js — kept here so it stays server-side)
    const price = calculateQuote(miles, vehicle, condition, transport);

    const quote = {
      miles,
      distance: `${miles} miles`,
      duration: `${hours.toFixed(1)} hours`,
      price,
      pickupCity: origin.city,
      pickupState: origin.state,
      deliveryCity: destination.city,
      deliveryState: destination.state,
    };

    // 4. Send the email via EmailJS REST API (server-side)
    if (EMAILJS_SERVICE && EMAILJS_TEMPLATE && EMAILJS_PUBLIC) {
      const emailPayload = {
        service_id: EMAILJS_SERVICE,
        template_id: EMAILJS_TEMPLATE,
        user_id: EMAILJS_PUBLIC,
        template_params: {
          ...body,
          distance: quote.distance,
          miles: quote.miles,
          estimated_price: `$${quote.price}`,
        },
      };
      // The private key is required for server-side ("strict mode") sends.
      if (EMAILJS_PRIVATE) emailPayload.accessToken = EMAILJS_PRIVATE;

      const emailRes = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(emailPayload),
      });

      if (!emailRes.ok) {
        const text = await emailRes.text();
        console.error("EmailJS error:", text);
        // Still return the quote — the customer sees their price even if email fails.
        return res.status(200).json({ quote, emailSent: false });
      }
    }

    return res.status(200).json({ quote, emailSent: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "SERVER_ERROR" });
  }
}

// Pricing logic (mirrors your pricing.js)
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