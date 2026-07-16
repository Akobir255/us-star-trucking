// Vercel Serverless Function — upload driver license / insurance documents (password protected).
// Endpoint: POST /api/upload-document
// Body: { order_number, doc_type: "license" | "insurance", filename, content_type, file_base64 }
// Every request must include header:  x-admin-password: <ADMIN_PASSWORD env>
//
// Files are stored in a PRIVATE Supabase Storage bucket ("driver-documents").
// They are never publicly accessible — /api/admin-orders generates short-lived
// signed URLs (1 hour) when listing orders, so only logged-in admins can view them.

const SUPABASE_URL = (process.env.SUPABASE_URL || "").trim();
const SUPABASE_KEY = (process.env.SUPABASE_SERVICE_ROLE_KEY || "").trim();
const ADMIN_PASSWORD = (process.env.ADMIN_PASSWORD || "").trim();

const BUCKET = "driver-documents";
// Vercel serverless functions cap request bodies around 4.5MB. Base64 encoding
// inflates file size by ~33%, so keep the raw file comfortably under that.
const MAX_BYTES = 3 * 1024 * 1024; // 3MB raw file size

// Encode each path segment individually so real "/" folder separators are
// preserved (encodeURIComponent alone turns "/" into "%2F", which breaks
// Supabase's signature matching between upload-time and sign-time).
function encodePath(path) {
  return path.split("/").map(encodeURIComponent).join("/");
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  if (!SUPABASE_URL || !SUPABASE_KEY || !ADMIN_PASSWORD) {
    return res.status(500).json({ error: "Server not configured" });
  }

  const provided = (req.headers["x-admin-password"] || "").toString();
  if (provided !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: "UNAUTHORIZED" });
  }

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};
    const { order_number, doc_type, filename, content_type, file_base64 } = body;

    if (!order_number || !doc_type || !filename || !file_base64) {
      return res
        .status(400)
        .json({ error: "order_number, doc_type, filename and file_base64 are required" });
    }
    if (!["license", "insurance"].includes(doc_type)) {
      return res.status(400).json({ error: "INVALID_DOC_TYPE" });
    }

    const buffer = Buffer.from(file_base64, "base64");
    if (buffer.length > MAX_BYTES) {
      return res.status(400).json({
        error: "FILE_TOO_LARGE",
        detail: `File is ${(buffer.length / (1024 * 1024)).toFixed(1)}MB. Max is 3MB — please use a smaller photo or a compressed scan.`,
      });
    }

    const safeName = filename.replace(/[^a-zA-Z0-9._-]/g, "_");
    const orderNumber = order_number.toString().trim().toUpperCase();
    const path = `${orderNumber}/${doc_type}-${Date.now()}-${safeName}`;

    const uploadRes = await fetch(
      `${SUPABASE_URL}/storage/v1/object/${BUCKET}/${encodePath(path)}`,
      {
        method: "POST",
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
          "Content-Type": content_type || "application/octet-stream",
          "x-upsert": "true",
        },
        body: buffer,
      }
    );

    if (!uploadRes.ok) {
      const text = await uploadRes.text();
      console.error("Storage upload error:", text);
      return res.status(500).json({ error: "UPLOAD_FAILED", detail: text });
    }

    const column = doc_type === "license" ? "driver_license_path" : "insurance_path";
    const patchRes = await fetch(
      `${SUPABASE_URL}/rest/v1/orders?order_number=eq.${encodeURIComponent(orderNumber)}`,
      {
        method: "PATCH",
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
          "Content-Type": "application/json",
          Prefer: "return=representation",
        },
        body: JSON.stringify({ [column]: path, updated_at: new Date().toISOString() }),
      }
    );
    const data = await patchRes.json();
    if (!Array.isArray(data) || data.length === 0) {
      return res.status(404).json({ error: "ORDER_NOT_FOUND" });
    }

    return res.status(200).json({ path, order: data[0] });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "SERVER_ERROR" });
  }
}