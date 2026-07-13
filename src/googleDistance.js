const ORS_KEY = "eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6IjdjZWRkNmIwOTdmYTQyNWQ5MmNiMzQ0NzVmNDQ0ZTkzIiwiaCI6Im11cm11cjY0In0=";

// Fetch with automatic retry for transient network/CORS failures
async function fetchWithRetry(url, options, retries = 3) {
  let lastErr;
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url, options);
      return res;
    } catch (err) {
      lastErr = err;
      await new Promise((r) => setTimeout(r, 500 * (i + 1)));
    }
  }
  throw lastErr;
}

// ORS geocoding: ZIP -> coordinates [lon, lat] + city/state
async function getLocation(zip) {
  const res = await fetchWithRetry(
    `https://api.openrouteservice.org/geocode/search?api_key=${ORS_KEY}&text=${zip}&boundary.country=USA&size=1`
  );

  const data = await res.json();

  if (!data.features || data.features.length === 0) {
    throw new Error("Invalid ZIP Code");
  }

  const feature = data.features[0];
  const coordinates = feature.geometry.coordinates; // already [lon, lat]
  const props = feature.properties;

  const city = props.locality || props.county || props.region || "";
  const state = props.region_a || props.region || "";

  return { coordinates, city, state };
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