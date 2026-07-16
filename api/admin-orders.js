// Vercel Serverless Function — admin order management (password protected).
// Endpoint: /api/admin-orders
//   GET    -> list all orders (newest first), with temporary signed URLs for
//             any uploaded driver license / insurance documents
//   POST   -> create order  { customer_name, pickup, delivery, ... }
//   PATCH  -> update order  { order_number, status?, eta?, note?, ... }
// Every request must include header:  x-admin-password: <ADMIN_PASSWORD env>

const SUPABASE_URL = (process.env.SUPABASE_URL || "").trim();
const SUPABASE_KEY = (process.env.SUPABASE_SERVICE_ROLE_KEY || "").trim();
const ADMIN_PASSWORD = (process.env.ADMIN_PASSWORD || "").trim();

const BUCKET = "driver-documents";

const ALLOWED_STATUSES = [
  "Booked",
  "Driver Assigned",
  "Picked Up",
  "In Transit",
  "Delivered",
];

const sb = (path, options = {}) =>
  fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    ...options,
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
      ...(options.headers || {}),
    },
  });

// Generate a short-lived signed URL for a private storage object.
// Returns null if there's no path, or if signing fails (e.g. file was deleted).
async function signUrl(path) {
  if (!path) return null;
  try {
    const r = await fetch(
      `${SUPABASE_URL}/storage/v1/object/sign/${BUCKET}/${encodeURIComponent(path)}`,
      {
        method: "POST",
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ expiresIn: 3600 }), // 1 hour
      }
    );
    if (!r.ok) return null;
    const data = await r.json();
    return data.signedURL ? `${SUPABASE_URL}/storage/v1${data.signedURL}` : null;
  } catch {
    return null;
  }
}

export default async function handler(req, res) {
  if (!SUPABASE_URL || !SUPABASE_KEY || !ADMIN_PASSWORD) {
    return res.status(500).json({ error: "Server not configured" });
  }

  const provided = (req.headers["x-admin-password"] || "").toString();
  if (provided !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: "UNAUTHORIZED" });
  }

  try {
    // ---- LIST ----
    if (req.method === "GET") {
      const r = await sb("orders?select=*&order=created_at.desc&limit=200");
      const data = await r.json();
      const withUrls = await Promise.all(
        (Array.isArray(data) ? data : []).map(async (o) => ({
          ...o,
          driver_license_url: await signUrl(o.driver_license_path),
          insurance_url: await signUrl(o.insurance_path),
        }))
      );
      return res.status(200).json({ orders: withUrls });
    }

    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};

    // ---- CREATE ----
    if (req.method === "POST") {
      const { customer_name, pickup, delivery } = body;
      if (!customer_name || !pickup || !delivery) {
        return res.status(400).json({ error: "customer_name, pickup and delivery are required" });
      }

      // Generate a unique order number like US-483920 (retry on rare collision)
      for (let attempt = 0; attempt < 5; attempt++) {
        const orderNumber = "US-" + Math.floor(100000 + Math.random() * 900000);
        const r = await sb("orders", {
          method: "POST",
          body: JSON.stringify({
            order_number: orderNumber,
            customer_name,
            customer_phone: body.customer_phone || null,
            customer_email: body.customer_email || null,
            pickup,
            delivery,
            vehicle: body.vehicle || null,
            transport: body.transport || null,
            status: ALLOWED_STATUSES.includes(body.status) ? body.status : "Booked",
            eta: body.eta || null,
            note: body.note || null,
            carrier_company: body.carrier_company || null,
            driver_name: body.driver_name || null,
            driver_phone: body.driver_phone || null,
          }),
        });
        if (r.ok) {
          const data = await r.json();
          return res.status(200).json({ order: data[0] });
        }
        const text = await r.text();
        if (!text.includes("duplicate")) {
          console.error("Supabase insert error:", text);
          return res.status(500).json({ error: "DB_ERROR" });
        }
        // duplicate order number -> loop and try a new one
      }
      return res.status(500).json({ error: "COULD_NOT_GENERATE_ORDER_NUMBER" });
    }

    // ---- UPDATE ----
    if (req.method === "PATCH") {
      const orderNumber = (body.order_number || "").toString().trim().toUpperCase();
      if (!orderNumber) {
        return res.status(400).json({ error: "order_number is required" });
      }

      const patch = { updated_at: new Date().toISOString() };
      if (body.status) {
        if (!ALLOWED_STATUSES.includes(body.status)) {
          return res.status(400).json({ error: "INVALID_STATUS" });
        }
        patch.status = body.status;
      }
      for (const field of ["eta", "note", "customer_phone", "customer_email", "vehicle", "transport", "pickup", "delivery", "customer_name", "carrier_company", "driver_name", "driver_phone"]) {
        if (field in body) patch[field] = body[field];
      }

      const r = await sb(`orders?order_number=eq.${encodeURIComponent(orderNumber)}`, {
        method: "PATCH",
        body: JSON.stringify(patch),
      });
      const data = await r.json();
      if (!Array.isArray(data) || data.length === 0) {
        return res.status(404).json({ error: "NOT_FOUND" });
      }
      return res.status(200).json({ order: data[0] });
    }

    // ---- DELETE ----
    if (req.method === "DELETE") {
      const orderNumber = (body.order_number || req.query.order_number || "")
        .toString()
        .trim()
        .toUpperCase();
      if (!orderNumber) {
        return res.status(400).json({ error: "order_number is required" });
      }

      const r = await sb(`orders?order_number=eq.${encodeURIComponent(orderNumber)}`, {
        method: "DELETE",
      });
      if (!r.ok) {
        const text = await r.text();
        console.error("Supabase delete error:", text);
        return res.status(500).json({ error: "DB_ERROR" });
      }
      const data = await r.json();
      if (!Array.isArray(data) || data.length === 0) {
        return res.status(404).json({ error: "NOT_FOUND" });
      }
      return res.status(200).json({ deleted: orderNumber });
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "SERVER_ERROR" });
  }
}