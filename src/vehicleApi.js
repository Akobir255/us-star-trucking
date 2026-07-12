const BASE = "https://vpic.nhtsa.dot.gov/api";

export async function searchMakes(query) {
  if (!query) return [];

  const res = await fetch(
    `${BASE}/vehicles/GetAllMakes?format=json`
  );

  const data = await res.json();

  return data.Results
    .filter((m) =>
      m.Make_Name.toLowerCase().startsWith(query.toLowerCase())
    )
    .slice(0, 10);
}

export async function searchModels(make) {
  if (!make) return [];

  const res = await fetch(
    `${BASE}/vehicles/GetModelsForMake/${make}?format=json`
  );

  const data = await res.json();

  return data.Results;
}