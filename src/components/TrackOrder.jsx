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
  const [orderNumber, setOrderNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [order, setOrder] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setOrder(null);

    const cleaned = orderNumber.trim().toUpperCase();
    if (!/^US-\d{6}$/.test(cleaned)) {
      setError("Please enter a valid order number, e.g. US-123456");
      return;
    }

    setLoading(true);
    try {
      const r = await fetch(`/api/track?order=${encodeURIComponent(cleaned)}`);
      const data = await r.json();
      if (!r.ok) {
        setError(
          data.error === "NOT_FOUND"
            ? "We couldn't find that order. Please check the number or call us at (865) 722-7114."
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
            Enter your order number to see the current status of your vehicle.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
          <input
            type="text"
            value={orderNumber}
            onChange={(e) => setOrderNumber(e.target.value)}
            placeholder="Order number, e.g. US-123456"
            className="flex-1 rounded-xl border border-white/20 bg-white/10 px-5 py-4 text-white placeholder-slate-400 uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
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
                <span className="text-slate-400 font-semibold">Estimated delivery</span>
                <span>{order.eta || "To be confirmed"}</span>
              </div>
            </div>

            {order.note && (
              <div className="mt-6 rounded-xl border border-blue-400/30 bg-blue-500/10 p-4 text-sm text-blue-200">
                📝 {order.note}
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