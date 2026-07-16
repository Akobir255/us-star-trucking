// Vercel Serverless Function — public order tracking lookup.
// Endpoints:
//   GET /api/track?order=12345678-US[&verify=<email or last name>]
//   GET /api/track?phone=8657227114[&verify=<email or last name>]
//
// Phone lookup returns the customer's most recent order.
// Basic lookup returns status info only. The driver license / insurance
// document links are only included after the caller verifies with the
// customer's email address or last name. Phone lookups and verification
// attempts are rate-limited per IP.

const SUPABASE_URL = (process.env.SUPABASE_URL || "").trim();
const SUPABASE_KEY = (process.env.SUPABASE_SERVICE_ROLE_KEY || "").trim();

const BUCKET = "driver-documents";

// --- Rate limiting (per serverless instance).
// Note: memory is per-instance on Vercel, so this is a soft limit — but it
// still blocks naive guessing scripts that hit a warm instance.
const LIMITS = {
  verify: { max: 10, windowMs: 10 * 60_000 },
  phone: { max: 15, windowMs: 10 * 60_000 },
};
const hits = new Map(); // key: `${kind}:${ip}` -> [timestamps]

function isRateLimited(kind, ip) {
  const { max, windowMs } = LIMITS[kind];
  const key = `${kind}:${ip}`;
  const now = Date.now();
  const arr = (hits.get(key) || []).filter((t) => now - t < windowMs);
  arr.push(now);
  hits.set(key, arr);
  if (hits.size > 5000) {
    for (const [k, v] of hits) {
      if (v.every((t) => now - t > 10 * 60_000)) hits.delete(k);
    }
  }
  return arr.length > max;
}

function getIp(req) {
  return (
    (req.headers["x-forwarded-for"] || "").split(",")[0].trim() ||
    req.socket?.remoteAddress ||
    "unknown"
  );
}

// Encode each path segment individually so real "/" folder separators are
// preserved (encodeURIComponent alone turns "/" into "%2F", which breaks
// Supabase's signature matching between sign-time and redemption-time).
function encodePath(path) {
  return path.split("/").map(encodeURIComponent).join("/");
}

async function signUrl(path) {
  if (!path) return null;
  try {
    const r = await fetch(
      `${SUPABASE_URL}/storage/v1/object/sign/${BUCKET}/${encodePath(path)}`,
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

// Does the supplied value match the customer's email or last name?
function matchesCustomer(verify, customerEmail, customerName) {
  const v = (verify || "").toString().trim().toLowerCase();
  if (!v) return false;

  const email = (customerEmail || "").toString().trim().toLowerCase();
  if (email && v === email) return true;

  const nameParts = (customerName || "").toString().trim().toLowerCase().split(/\s+/);
  const lastName = nameParts[nameParts.length - 1] || "";
  // Require at least 2 chars so a stray single letter can't match.
  if (lastName.length >= 2 && v === lastName) return true;

  return false;
}

// Normalize any phone string down to its 10 significant digits.
function normalizePhone(value) {
  let d = (value || "").toString().replace(/\D/g, "");
  if (d.length === 11 && d.startsWith("1")) d = d.slice(1);
  return d;
}

const SELECT_FIELDS =
  "order_number,customer_name,customer_email,pickup,delivery,vehicle,transport," +
  "status,eta,note,updated_at,created_at,carrier_company,driver_name,driver_phone," +
  "driver_license_path,insurance_path";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  if (!SUPABASE_URL || !SUPABASE_KEY) {
    return res.status(500).json({ error: "Server not configured" });
  }

  const orderParam = (req.query.order || "").toString().trim().toUpperCase();
  const phoneParam = (req.query.phone || "").toString();
  const verify = (req.query.verify || "").toString().trim();

  if (!orderParam && !phoneParam) {
    return res.status(400).json({ error: "MISSING_LOOKUP" });
  }

  const ip = getIp(req);
  if (verify && isRateLimited("verify", ip)) {
    return res.status(429).json({ error: "RATE_LIMITED" });
  }

  const headers = {
    apikey: SUPABASE_KEY,
    Authorization: `Bearer ${SUPABASE_KEY}`,
  };

  try {
    let queryUrl;

    if (orderParam) {
      // --- Lookup by order number ---
      // New format: 8 digits + optional dash + US + optional trailing zeros (e.g. 12345678-US)
      // Old format kept for backward compatibility with existing orders: US-123456
      const NEW_FORMAT = /^\d{8}-?US0{0,4}$/;
      const OLD_FORMAT = /^US-\d{6}$/;
      if (!NEW_FORMAT.test(orderParam) && !OLD_FORMAT.test(orderParam)) {
        return res.status(400).json({ error: "INVALID_ORDER_NUMBER" });
      }
      queryUrl =
        `${SUPABASE_URL}/rest/v1/orders?order_number=eq.${encodeURIComponent(orderParam)}` +
        `&select=${SELECT_FIELDS}&limit=1`;
    } else {
      // --- Lookup by customer phone (most recent order) ---
      let digits = phoneParam.replace(/\D/g, "");
      if (digits.length === 11 && digits.startsWith("1")) digits = digits.slice(1);
      if (digits.length !== 10) {
        return res.status(400).json({ error: "INVALID_PHONE" });
      }
      if (isRateLimited("phone", ip)) {
        return res.status(429).json({ error: "RATE_LIMITED" });
      }
      // Loose search: digits in order with anything between the groups
      // (matches "(346) 381-9554", "346.381.9554", "+1 3463819554", ...).
      // Exact digit comparison happens below in JS.
      const pattern = `*${digits.slice(0, 3)}*${digits.slice(3, 6)}*${digits.slice(6)}*`;
      queryUrl =
        `${SUPABASE_URL}/rest/v1/orders?customer_phone=ilike.${encodeURIComponent(pattern)}` +
        `&select=${SELECT_FIELDS}&order=created_at.desc&limit=10`;
    }

    const r = await fetch(queryUrl, { headers });
    let data = await r.json();

    // For phone lookups, keep only rows whose digits match exactly.
    if (!orderParam && Array.isArray(data)) {
      const digits = normalizePhone(phoneParam);
      data = data.filter((row) => normalizePhone(row.customer_phone) === digits);
    }

    if (!Array.isArray(data) || data.length === 0) {
      return res.status(404).json({ error: "NOT_FOUND" });
    }

    const o = data[0];
    // Only show the first name publicly
    const firstName = (o.customer_name || "").split(" ")[0];

    const hasDocuments = Boolean(o.driver_license_path || o.insurance_path);

    // Documents are only signed + returned after successful verification.
    let licenseUrl = null;
    let insuranceUrl = null;
    let verified = false;
    let verifyFailed = false;

    if (verify && hasDocuments) {
      if (matchesCustomer(verify, o.customer_email, o.customer_name)) {
        verified = true;
        [licenseUrl, insuranceUrl] = await Promise.all([
          signUrl(o.driver_license_path),
          signUrl(o.insurance_path),
        ]);
      } else {
        verifyFailed = true;
      }
    }

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
        hasDocuments,
        verified,
        verifyFailed,
        licenseUrl,
        insuranceUrl,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "SERVER_ERROR" });
  }
}