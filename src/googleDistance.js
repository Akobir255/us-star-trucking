const API_KEY =
  "eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6IjdjZWRkNmIwOTdmYTQyNWQ5MmNiMzQ0NzVmNDQ0ZTkzIiwiaCI6Im11cm11cjY0In0=";

async function getCoordinates(zip) {
  const res = await fetch(
    `https://api.openrouteservice.org/geocode/search?api_key=${API_KEY}&text=${zip}&boundary.country=USA&size=1`
  );

  const data = await res.json();

  if (!data.features || data.features.length === 0) {
    throw new Error("Invalid ZIP Code");
  }

  return data.features[0].geometry.coordinates;
}

export async function getDistance(originZip, destinationZip) {
  const origin = await getCoordinates(originZip);
  const destination = await getCoordinates(destinationZip);

  const response = await fetch(
    "https://api.openrouteservice.org/v2/directions/driving-car",
    {
      method: "POST",
      headers: {
        Authorization: API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        coordinates: [origin, destination],
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
  };
}