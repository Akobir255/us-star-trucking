import { useState } from "react";

const STEPS = ["Booked", "Driver Assigned", "Picked Up", "In Transit", "Delivered"];

function ProgressBar({ status }) {
  const currentIndex = STEPS.indexOf(status);
  return (
    <div className="mt-8">
      <div className="flex items-center">
        {STEPS.map((step, i) => (
          <div key={step} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-bold transition ${
                  i < currentIndex
                    ? "bg-green-500 border-green-500 text-white"
                    : i === currentIndex
                    ? "bg-blue-600 border-blue-400 text-white animate-pulse"
                    : "bg-slate-800 border-slate-600 text-slate-500"
                }`}
              >
                {i < currentIndex ? "✓" : i + 1}
              </div>
              <span
                className={`mt-2 text-[11px] sm:text-xs font-semibold text-center w-16 sm:w-20 leading-tight ${
                  i <= currentIndex ? "text-white" : "text-slate-500"
                }`}
              >
                {step}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className={`h-1 flex-1 mx-1 sm:mx-2 rounded -mt-6 ${
                  i < currentIndex ? "bg-green-500" : "bg-slate-700"
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function TrackOrder() {
  const [lookupInput, setLookupInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [order, setOrder] = useState(null);

  // Document verification (email or last name)
  const [verifyInput, setVerifyInput] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [verifyError, setVerifyError] = useState("");

  const fetchOrder = async (params) => {
    const search = new URLSearchParams(params);
    const r = await fetch(`/api/track?${search.toString()}`);
    const data = await r.json();
    return { r, data };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setOrder(null);
    setVerifyInput("");
    setVerifyError("");

    const raw = lookupInput.trim();
    const asOrder = raw.toUpperCase();
    const NEW_FORMAT = /^\d{8}-?US0{0,4}$/;
    const OLD_FORMAT = /^US-\d{6}$/;

    // Decide: order number or phone number?
    let params;
    if (NEW_FORMAT.test(asOrder) || OLD_FORMAT.test(asOrder)) {
      params = { order: asOrder };
    } else {
      let digits = raw.replace(/\D/g, "");
      if (digits.length === 11 && digits.startsWith("1")) digits = digits.slice(1);
      if (digits.length === 10) {
        params = { phone: digits };
      } else {
        setError(
          "Please enter your order number (e.g. 12345678-US) or the 10-digit phone number used for your booking."
        );
        return;
      }
    }

    setLoading(true);
    try {
      const { r, data } = await fetchOrder(params);
      if (!r.ok) {
        setError(
          data.error === "NOT_FOUND"
            ? "We couldn't find a shipment for that. Please check the number or call us at (865) 722-7114."
            : data.error === "RATE_LIMITED"
            ? "Too many attempts. Please wait a few minutes and try again."
            : "Something went wrong. Please try again."
        );
      } else {
        setOrder(data.order);
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setVerifyError("");

    const value = verifyInput.trim();
    if (value.length < 2) {
      setVerifyError("Please enter your email address or last name.");
      return;
    }

    setVerifying(true);
    try {
      const { r, data } = await fetchOrder({ order: order.orderNumber, verify: value });
      if (!r.ok) {
        setVerifyError(
          data.error === "RATE_LIMITED"
            ? "Too many attempts. Please wait a few minutes and try again."
            : "Something went wrong. Please try again."
        );
      } else if (data.order.verified) {
        setOrder(data.order);
      } else {
        setVerifyError(
          "That doesn't match our records. Please use the email or last name from your booking, or call us at (865) 722-7114."
        );
      }
    } catch {
      setVerifyError("Something went wrong. Please try again.");
    } finally {
      setVerifying(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white">
      {/* Simple header */}
      <header className="border-b border-white/10">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="/" className="font-bold text-lg">
            US Star Trucking LLC
          </a>
          <a href="/" className="text-sm text-blue-300 hover:text-white transition">
            ← Back to Home
          </a>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-16">
        <div className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl font-extrabold">Track Your Shipment</h1>
          <p className="mt-4 text-blue-300 text-lg">
            Enter your order number or the phone number you booked with.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
          <div className="flex-1">
            <label htmlFor="track-lookup" className="sr-only">
              Order number or phone number
            </label>
            <input
              id="track-lookup"
              name="track-lookup"
              type="text"
              value={lookupInput}
              onChange={(e) => setLookupInput(e.target.value)}
              placeholder="Order number or phone number"
              autoComplete="off"
              className="w-full rounded-xl border border-white/20 bg-white/10 px-5 py-4 text-white placeholder-slate-400 tracking-wide focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`rounded-xl px-8 py-4 font-bold transition ${
              loading ? "bg-gray-500 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Searching..." : "Track"}
          </button>
        </form>

        {error && (
          <p className="mt-6 text-center text-red-400 font-medium max-w-xl mx-auto">{error}</p>
        )}

        {order && (
          <div className="mt-12 rounded-3xl border border-white/15 bg-white/5 backdrop-blur p-6 sm:p-10">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <p className="text-sm text-blue-300">Order</p>
                <p className="text-2xl font-bold font-mono">{order.orderNumber}</p>
              </div>
              <div className="sm:text-right">
                <p className="text-sm text-blue-300">Current status</p>
                <p className="text-2xl font-bold text-green-400">{order.status}</p>
              </div>
            </div>

            <ProgressBar status={order.status} />

            <div className="mt-10 grid sm:grid-cols-2 gap-x-10 gap-y-4 text-sm">
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-slate-400 font-semibold">Customer</span>
                <span>{order.customerFirstName}</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-slate-400 font-semibold">Vehicle</span>
                <span>{order.vehicle || "—"}</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-slate-400 font-semibold">From</span>
                <span>{order.pickup}</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-slate-400 font-semibold">To</span>
                <span>{order.delivery}</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-slate-400 font-semibold">Transport</span>
                <span>{order.transport || "—"}</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-slate-400 font-semibold">Carrier</span>
                <span>{order.carrierCompany || "—"}</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-slate-400 font-semibold">Driver</span>
                <span>{order.driverName || "—"}</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-slate-400 font-semibold">Driver phone</span>
                <span>
                  {order.driverPhone ? (
                    <a href={`tel:${order.driverPhone}`} className="text-blue-300 hover:text-white">
                      {order.driverPhone}
                    </a>
                  ) : (
                    "—"
                  )}
                </span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-slate-400 font-semibold">Estimated delivery</span>
                <span>{order.eta || "To be confirmed"}</span>
              </div>
            </div>

            {order.note && (
              <div className="mt-6 rounded-xl border border-blue-400/30 bg-blue-500/10 p-4 text-sm text-blue-200">
                📝 {order.note}
              </div>
            )}

            {/* Carrier documents — locked until the customer verifies */}
            {order.hasDocuments && !order.verified && (
              <div className="mt-6 rounded-xl border border-white/15 bg-white/5 p-5">
                <p className="text-sm font-semibold text-white">
                  🔒 Carrier documents (driver license &amp; insurance)
                </p>
                <p className="mt-1 text-xs text-slate-400">
                  To protect your driver's privacy, please confirm your identity with the
                  email address or last name from your booking.
                </p>
                <form onSubmit={handleVerify} className="mt-3 flex flex-col sm:flex-row gap-3">
                  <div className="flex-1">
                    <label htmlFor="verify-identity" className="sr-only">
                      Your email or last name
                    </label>
                    <input
                      id="verify-identity"
                      name="verify-identity"
                      type="text"
                      value={verifyInput}
                      onChange={(e) => setVerifyInput(e.target.value)}
                      placeholder="Your email or last name"
                      className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={verifying}
                    className={`rounded-xl px-6 py-3 font-bold transition ${
                      verifying ? "bg-gray-500 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                    }`}
                  >
                    {verifying ? "Checking..." : "View documents"}
                  </button>
                </form>
                {verifyError && (
                  <p className="mt-3 text-sm text-red-400 font-medium">{verifyError}</p>
                )}
              </div>
            )}

            {(order.licenseUrl || order.insuranceUrl) && (
              <div className="mt-6 grid sm:grid-cols-2 gap-3">
                {order.licenseUrl && (
                  <a
                    href={order.licenseUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-xl border border-white/15 bg-white/5 p-4 text-center text-sm font-semibold text-blue-300 hover:text-white hover:bg-white/10 transition"
                  >
                    View Driver License
                  </a>
                )}
                {order.insuranceUrl && (
                  <a
                    href={order.insuranceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-xl border border-white/15 bg-white/5 p-4 text-center text-sm font-semibold text-blue-300 hover:text-white hover:bg-white/10 transition"
                  >
                    View Insurance Document
                  </a>
                )}
              </div>
            )}

            <p className="mt-8 text-center text-xs text-slate-400">
              Last updated: {new Date(order.updatedAt).toLocaleString()} · Questions? Call{" "}
              <a href="tel:+18657227114" className="text-blue-300 hover:text-white">
                (865) 722-7114
              </a>
            </p>
          </div>
        )}
      </main>
    </div>
  );
}