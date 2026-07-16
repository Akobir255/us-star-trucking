import { useState, useEffect } from "react";

const STATUSES = ["Booked", "Driver Assigned", "Picked Up", "In Transit", "Delivered"];

export default function AdminOrders() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [authError, setAuthError] = useState("");

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [listError, setListError] = useState("");

  const [form, setForm] = useState({
    customer_name: "",
    customer_phone: "",
    customer_email: "",
    pickup: "",
    delivery: "",
    vehicle: "",
    transport: "",
    eta: "",
    note: "",
    carrier_company: "",
    driver_name: "",
    driver_license: "",
    insurance_provider: "",
    insurance_policy: "",
  });
  const [creating, setCreating] = useState(false);
  const [createMsg, setCreateMsg] = useState("");

  const headers = {
    "Content-Type": "application/json",
    "x-admin-password": password,
  };

  const loadOrders = async () => {
    setLoading(true);
    setListError("");
    try {
      const r = await fetch("/api/admin-orders", { headers });
      const data = await r.json();
      if (!r.ok) {
        if (r.status === 401) {
          setAuthed(false);
          setAuthError("Session expired. Please log in again.");
        } else {
          setListError("Could not load orders.");
        }
        return;
      }
      setOrders(data.orders || []);
    } catch {
      setListError("Could not load orders.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthError("");
    try {
      const r = await fetch("/api/admin-orders", {
        headers: { "x-admin-password": password },
      });
      if (r.status === 401) {
        setAuthError("Wrong password.");
        return;
      }
      if (!r.ok) {
        setAuthError("Something went wrong. Please try again.");
        return;
      }
      const data = await r.json();
      setOrders(data.orders || []);
      setAuthed(true);
    } catch {
      setAuthError("Something went wrong. Please try again.");
    }
  };

  useEffect(() => {
    if (authed) loadOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authed]);

  const handleCreate = async (e) => {
    e.preventDefault();
    setCreateMsg("");
    if (!form.customer_name || !form.pickup || !form.delivery) {
      setCreateMsg("Customer name, pickup, and delivery are required.");
      return;
    }
    setCreating(true);
    try {
      const r = await fetch("/api/admin-orders", {
        method: "POST",
        headers,
        body: JSON.stringify(form),
      });
      const data = await r.json();
      if (!r.ok) {
        setCreateMsg("Failed to create order.");
        return;
      }
      setCreateMsg(`✅ Order created: ${data.order.order_number}`);
      setForm({
        customer_name: "",
        customer_phone: "",
        customer_email: "",
        pickup: "",
        delivery: "",
        vehicle: "",
        transport: "",
        eta: "",
        note: "",
        carrier_company: "",
        driver_name: "",
        driver_license: "",
        insurance_provider: "",
        insurance_policy: "",
      });
      loadOrders();
    } catch {
      setCreateMsg("Failed to create order.");
    } finally {
      setCreating(false);
    }
  };

  const updateStatus = async (order_number, status) => {
    try {
      const r = await fetch("/api/admin-orders", {
        method: "PATCH",
        headers,
        body: JSON.stringify({ order_number, status }),
      });
      if (!r.ok) {
        setListError("Failed to update status.");
        return;
      }
      loadOrders();
    } catch {
      setListError("Failed to update status.");
    }
  };

  if (!authed) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white flex items-center justify-center px-6">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-sm rounded-3xl border border-white/15 bg-white/5 backdrop-blur p-8"
        >
          <h1 className="text-2xl font-extrabold text-center mb-6">Admin Login</h1>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Admin password"
            className="w-full rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {authError && <p className="mt-4 text-red-400 text-sm text-center">{authError}</p>}
          <button
            type="submit"
            className="mt-6 w-full rounded-xl px-6 py-3 font-bold bg-blue-600 hover:bg-blue-700 transition"
          >
            Log In
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white">
      <header className="border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="/" className="font-bold text-lg">
            US Star Trucking LLC — Admin
          </a>
          <a href="/" className="text-sm text-blue-300 hover:text-white transition">
            ← Back to Home
          </a>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12 space-y-12">
        {/* Create order */}
        <section className="rounded-3xl border border-white/15 bg-white/5 backdrop-blur p-6 sm:p-8">
          <h2 className="text-xl font-bold mb-6">Create New Order</h2>
          <form onSubmit={handleCreate} className="grid sm:grid-cols-2 gap-4">
            <input
              placeholder="Customer name *"
              value={form.customer_name}
              onChange={(e) => setForm({ ...form, customer_name: e.target.value })}
              className="rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              placeholder="Phone"
              value={form.customer_phone}
              onChange={(e) => setForm({ ...form, customer_phone: e.target.value })}
              className="rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              placeholder="Email"
              value={form.customer_email}
              onChange={(e) => setForm({ ...form, customer_email: e.target.value })}
              className="rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              placeholder="Vehicle (e.g. 2021 Toyota Camry)"
              value={form.vehicle}
              onChange={(e) => setForm({ ...form, vehicle: e.target.value })}
              className="rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              placeholder="Pickup (city, state) *"
              value={form.pickup}
              onChange={(e) => setForm({ ...form, pickup: e.target.value })}
              className="rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              placeholder="Delivery (city, state) *"
              value={form.delivery}
              onChange={(e) => setForm({ ...form, delivery: e.target.value })}
              className="rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              placeholder="Transport (Open/Enclosed)"
              value={form.transport}
              onChange={(e) => setForm({ ...form, transport: e.target.value })}
              className="rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              placeholder="ETA"
              value={form.eta}
              onChange={(e) => setForm({ ...form, eta: e.target.value })}
              className="rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              placeholder="Note (optional)"
              value={form.note}
              onChange={(e) => setForm({ ...form, note: e.target.value })}
              className="sm:col-span-2 rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={2}
            />

            <div className="sm:col-span-2 pt-4 mt-2 border-t border-white/10">
              <p className="text-sm font-semibold text-blue-300 mb-1">Carrier & Driver</p>
              <p className="text-xs text-slate-400 mb-4">
                Driver name & carrier company are shown to the customer on /track. License and
                insurance details are internal only and never shown publicly.
              </p>
            </div>
            <input
              placeholder="Carrier company (shown to customer)"
              value={form.carrier_company}
              onChange={(e) => setForm({ ...form, carrier_company: e.target.value })}
              className="rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              placeholder="Driver name (shown to customer)"
              value={form.driver_name}
              onChange={(e) => setForm({ ...form, driver_name: e.target.value })}
              className="rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              placeholder="Driver license # (internal only)"
              value={form.driver_license}
              onChange={(e) => setForm({ ...form, driver_license: e.target.value })}
              className="rounded-xl border border-yellow-500/30 bg-white/10 px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <input
              placeholder="Insurance provider (internal only)"
              value={form.insurance_provider}
              onChange={(e) => setForm({ ...form, insurance_provider: e.target.value })}
              className="rounded-xl border border-yellow-500/30 bg-white/10 px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <input
              placeholder="Insurance policy # (internal only)"
              value={form.insurance_policy}
              onChange={(e) => setForm({ ...form, insurance_policy: e.target.value })}
              className="rounded-xl border border-yellow-500/30 bg-white/10 px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />

            <button
              type="submit"
              disabled={creating}
              className={`sm:col-span-2 rounded-xl px-6 py-3 font-bold transition ${
                creating ? "bg-gray-500 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {creating ? "Creating..." : "Create Order"}
            </button>
          </form>
          {createMsg && <p className="mt-4 text-sm text-center">{createMsg}</p>}
        </section>

        {/* Orders list */}
        <section className="rounded-3xl border border-white/15 bg-white/5 backdrop-blur p-6 sm:p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Orders</h2>
            <button
              onClick={loadOrders}
              className="text-sm text-blue-300 hover:text-white transition"
            >
              Refresh
            </button>
          </div>

          {loading && <p className="text-slate-400">Loading...</p>}
          {listError && <p className="text-red-400">{listError}</p>}
          {!loading && orders.length === 0 && (
            <p className="text-slate-400">No orders yet.</p>
          )}

          <div className="space-y-4">
            {orders.map((o) => (
              <div
                key={o.order_number}
                className="rounded-2xl border border-white/10 bg-white/5 p-5"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                  <div>
                    <p className="font-mono font-bold text-lg">{o.order_number}</p>
                    <p className="text-sm text-slate-400">{o.customer_name}</p>
                  </div>
                  <span className="text-sm font-semibold text-green-400">{o.status}</span>
                </div>
                <div className="grid sm:grid-cols-2 gap-x-8 gap-y-1 text-sm text-slate-300 mb-4">
                  <p>From: {o.pickup}</p>
                  <p>To: {o.delivery}</p>
                  {o.vehicle && <p>Vehicle: {o.vehicle}</p>}
                  {o.transport && <p>Transport: {o.transport}</p>}
                  {o.carrier_company && <p>Carrier: {o.carrier_company}</p>}
                  {o.driver_name && <p>Driver: {o.driver_name}</p>}
                  {o.driver_license && (
                    <p className="text-yellow-400/80">License: {o.driver_license}</p>
                  )}
                  {o.insurance_provider && (
                    <p className="text-yellow-400/80">Insurance: {o.insurance_provider}</p>
                  )}
                  {o.insurance_policy && (
                    <p className="text-yellow-400/80">Policy #: {o.insurance_policy}</p>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {STATUSES.map((s) => (
                    <button
                      key={s}
                      onClick={() => updateStatus(o.order_number, s)}
                      className={`text-xs font-semibold rounded-lg px-3 py-2 transition ${
                        o.status === s
                          ? "bg-blue-600 text-white"
                          : "bg-white/10 text-slate-300 hover:bg-white/20"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}