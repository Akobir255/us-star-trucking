// Vercel Serverless Function — public order tracking lookup.
// Endpoint: GET /api/track?order=US-123456
//
// Also returns short-lived signed links to the driver license / insurance
// documents (if uploaded), so the customer can view them from this order's
// tracking page. Anyone who has the order number can view these — same
// access model as the rest of tracking.

const SUPABASE_URL = (process.env.SUPABASE_URL || "").trim();
const SUPABASE_KEY = (process.env.SUPABASE_SERVICE_ROLE_KEY || "").trim();

const BUCKET = "driver-documents";

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
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  if (!SUPABASE_URL || !SUPABASE_KEY) {
    return res.status(500).json({ error: "Server not configured" });
  }

  const order = (req.query.order || "").toString().trim().toUpperCase();
  // New format: 8 digits + optional dash + US + optional trailing zeros (e.g. 12345678-US, 12345678US0)
  // Old format kept for backward compatibility with existing orders: US-123456
  const NEW_FORMAT = /^\d{8}-?US0{0,4}$/;
  const OLD_FORMAT = /^US-\d{6}$/;
  if (!NEW_FORMAT.test(order) && !OLD_FORMAT.test(order)) {
    return res.status(400).json({ error: "INVALID_ORDER_NUMBER" });
  }

  try {
    const r = await fetch(
      `${SUPABASE_URL}/rest/v1/orders?order_number=eq.${encodeURIComponent(order)}` +
        `&select=order_number,customer_name,pickup,delivery,vehicle,transport,status,eta,note,updated_at,carrier_company,driver_name,driver_phone,driver_license_path,insurance_path`,
      {
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
        },
      }
    );
    const data = await r.json();

    if (!Array.isArray(data) || data.length === 0) {
      return res.status(404).json({ error: "NOT_FOUND" });
    }

    const o = data[0];
    // Only show the first name publicly
    const firstName = (o.customer_name || "").split(" ")[0];

    const [licenseUrl, insuranceUrl] = await Promise.all([
      signUrl(o.driver_license_path),
      signUrl(o.insurance_path),
    ]);

    return res.status(200).json({
      order: {
        orderNumber: o.order_number,
        customerFirstName: firstName,
        pickup: o.pickup,
        delivery: o.delivery,
        vehicle: o.vehicle,
        transport: o.transport,
        carrierCompany: o.carrier_company,
        driverName: o.driver_name,
        driverPhone: o.driver_phone,
        status: o.status,
        eta: o.eta,
        note: o.note,
        updatedAt: o.updated_at,
        licenseUrl,
        insuranceUrl,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "SERVER_ERROR" });
  }
}