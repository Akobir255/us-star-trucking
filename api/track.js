// Vercel Serverless Function — public order tracking lookup.
// Endpoint: GET /api/track?order=US-123456

const SUPABASE_URL = (process.env.SUPABASE_URL || "").trim();
const SUPABASE_KEY = (process.env.SUPABASE_SERVICE_ROLE_KEY || "").trim();

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  if (!SUPABASE_URL || !SUPABASE_KEY) {
    return res.status(500).json({ error: "Server not configured" });
  }

  const order = (req.query.order || "").toString().trim().toUpperCase();
  if (!/^US-\d{6}$/.test(order)) {
    return res.status(400).json({ error: "INVALID_ORDER_NUMBER" });
  }

  try {
    const r = await fetch(
      `${SUPABASE_URL}/rest/v1/orders?order_number=eq.${encodeURIComponent(order)}` +
        `&select=order_number,customer_name,pickup,delivery,vehicle,transport,status,eta,note,updated_at`,
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

    return res.status(200).json({
      order: {
        orderNumber: o.order_number,
        customerFirstName: firstName,
        pickup: o.pickup,
        delivery: o.delivery,
        vehicle: o.vehicle,
        transport: o.transport,
        status: o.status,
        eta: o.eta,
        note: o.note,
        updatedAt: o.updated_at,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "SERVER_ERROR" });
  }
}