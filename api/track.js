// Vercel Serverless Function — public order tracking lookup.
// Endpoint: GET /api/track?order=12345678-US[&verify=<email or last name>]
//
// Basic lookup returns status info only. The driver license / insurance
// document links are only included when the caller proves they're the
// customer by supplying their email address or last name in `verify`.
// Failed verification attempts are rate-limited per IP.

const SUPABASE_URL = (process.env.SUPABASE_URL || "").trim();
const SUPABASE_KEY = (process.env.SUPABASE_SERVICE_ROLE_KEY || "").trim();

const BUCKET = "driver-documents";

// --- Rate limiting for verification attempts (per serverless instance).
// Note: memory is per-instance on Vercel, so this is a soft limit — but it
// still blocks naive guessing scripts that hit a warm instance.
const VERIFY_LIMIT = 10; // attempts
const VERIFY_WINDOW_MS = 10 * 60_000; // per 10 minutes
const verifyHits = new Map();

function isVerifyRateLimited(ip) {
  const now = Date.now();
  const arr = (verifyHits.get(ip) || []).filter((t) => now - t < VERIFY_WINDOW_MS);
  arr.push(now);
  verifyHits.set(ip, arr);
  if (verifyHits.size > 5000) {
    for (const [k, v] of verifyHits) {
      if (v.every((t) => now - t > VERIFY_WINDOW_MS)) verifyHits.delete(k);
    }
  }
  return arr.length > VERIFY_LIMIT;
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

  const verify = (req.query.verify || "").toString().trim();

  // Rate-limit only verification attempts, not plain status lookups.
  if (verify) {
    const ip =
      (req.headers["x-forwarded-for"] || "").split(",")[0].trim() ||
      req.socket?.remoteAddress ||
      "unknown";
    if (isVerifyRateLimited(ip)) {
      return res.status(429).json({ error: "RATE_LIMITED" });
    }
  }

  try {
    const r = await fetch(
      `${SUPABASE_URL}/rest/v1/orders?order_number=eq.${encodeURIComponent(order)}` +
        `&select=order_number,customer_name,customer_email,pickup,delivery,vehicle,transport,status,eta,note,updated_at,carrier_company,driver_name,driver_phone,driver_license_path,insurance_path`,
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