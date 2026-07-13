const ORS_KEY = "eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6IjdjZWRkNmIwOTdmYTQyNWQ5MmNiMzQ0NzVmNDQ0ZTkzIiwiaCI6Im11cm11cjY0In0=";
const GOOGLE_KEY = "AIzaSyD4c8Gs15mvWYKOWFXB8viJggDLRn-OtQY";

// Fetch with automatic retry for transient network failures
async function fetchWithRetry(url, options, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url, options);
      return res;
    } catch (err) {
      if (i === retries - 1) throw err;
      await new Promise((r) => setTimeout(r, 500 * (i + 1)));
    }
  }
}

// Use Google Geocoding (no CORS issues) to turn a ZIP into coordinates + city/state.
// ORS expects [longitude, latitude] order.
async function getLocation(zip) {
  const res = await fetchWithRetry(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${zip}&components=country:US&key=${GOOGLE_KEY}`
  );

  const data = await res.json();

  if (!data.results || data.results.length === 0) {
    throw new Error("Invalid ZIP Code");
  }

  const result = data.results[0];
  const { lat, lng } = result.geometry.location;
  const components = result.address_components;

  const city =
    components.find((c) => c.types.includes("locality"))?.long_name ||
    components.find((c) => c.types.includes("sublocality"))?.long_name ||
    "";

  const state =
    components.find((c) => c.types.includes("administrative_area_level_1"))?.short_name || "";

  return {
    coordinates: [lng, lat], // ORS wants [lon, lat]
    city,
    state,
  };
}

export async function getDistance(originZip, destinationZip) {
  const origin = await getLocation(originZip);
  const destination = await getLocation(destinationZip);

  const response = await fetchWithRetry(
    "https://api.openrouteservice.org/v2/directions/driving-car",
    {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${ORS_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        coordinates: [
          origin.coordinates,
          destination.coordinates,
        ],
        radiuses: [-1, -1],
      }),
    }
  );

  const data = await response.json();

  if (!data.routes || data.routes.length === 0) {
    throw new Error("Unable to calculate route");
  }

  const summary = data.routes[0].summary;
  const miles = Math.round(summary.distance * 0.000621371);
  const hours = summary.duration / 3600;

  return {
    miles,
    distance: `${miles} miles`,
    duration: `${hours.toFixed(1)} hours`,
    pickupCity: origin.city,
    pickupState: origin.state,
    deliveryCity: destination.city,
    deliveryState: destination.state,
  };
}