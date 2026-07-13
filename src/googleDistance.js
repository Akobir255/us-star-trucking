// Frontend helper — calls YOUR OWN serverless endpoints.
// No API keys live here anymore. All secrets stay on the server.

// Submit the full quote: server geocodes, routes, prices, and emails.
// Returns { quote, emailSent }. Throws Error with .code on failure.
export async function submitQuote(formData) {
  const res = await fetch("/api/quote", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const err = new Error(data?.error || "SERVER_ERROR");
    err.code = data?.error || "SERVER_ERROR";
    throw err;
  }
  return data; // { quote, emailSent }
}

// City/State label for the ZIP fields (server-side, no key exposed).
export async function getCityState(zip) {
  try {
    const res = await fetch(`/api/citystate?zip=${encodeURIComponent(zip)}`);
    if (!res.ok) return null;
    const data = await res.json();
    return data.label || null;
  } catch {
    return null;
  }
}