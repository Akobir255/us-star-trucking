// Vercel Serverless Function — returns "City, ST" for a ZIP without exposing the ORS key.
// Endpoint: GET /api/citystate?zip=37914
export default async function handler(req, res) {
  const ORS_KEY = process.env.ORS_KEY;
  const zip = (req.query.zip || "").toString().trim();

  if (!ORS_KEY) return res.status(500).json({ error: "Server not configured" });
  if (!/^\d{5}$/.test(zip)) return res.status(400).json({ error: "Bad ZIP" });

  try {
    const r = await fetch(
      `https://api.openrouteservice.org/geocode/search?api_key=${ORS_KEY}&text=${zip}&boundary.country=USA&size=1`
    );
    const d = await r.json();
    if (!d.features || d.features.length === 0) {
      return res.status(200).json({ label: null });
    }
    const p = d.features[0].properties;
    const city = p.locality || p.county || "";
    const state = p.region_a || p.region || "";
    return res.status(200).json({ label: city && state ? `${city}, ${state}` : null });
  } catch (e) {
    console.error(e);
    return res.status(200).json({ label: null });
  }
}