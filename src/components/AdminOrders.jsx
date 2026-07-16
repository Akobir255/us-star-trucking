import { useState, useEffect } from "react";

const STATUSES = ["Booked", "Driver Assigned", "Picked Up", "In Transit", "Delivered"];

const EDIT_FIELDS = [
  { key: "customer_name", label: "Customer name" },
  { key: "customer_phone", label: "Phone" },
  { key: "customer_email", label: "Email" },
  { key: "pickup", label: "Pickup" },
  { key: "delivery", label: "Delivery" },
  { key: "vehicle", label: "Vehicle" },
  { key: "transport", label: "Transport" },
  { key: "eta", label: "ETA" },
  { key: "carrier_company", label: "Carrier company" },
  { key: "driver_name", label: "Driver name" },
  { key: "note", label: "Note", full: true },
];

const fileToBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result.split(",")[1]);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

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
  });
  const [licenseFile, setLicenseFile] = useState(null);
  const [insuranceFile, setInsuranceFile] = useState(null);
  const [creating, setCreating] = useState(false);
  const [createMsg, setCreateMsg] = useState("");

  // Which order's document is currently uploading, e.g. "US-123456:license"
  const [uploadingKey, setUploadingKey] = useState("");

  // Editing an existing order
  const [editingOrder, setEditingOrder] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [savingEdit, setSavingEdit] = useState(false);
  const [editMsg, setEditMsg] = useState("");

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

  const uploadDocument = async (order_number, doc_type, file) => {
    if (!file) return true;
    setUploadingKey(`${order_number}:${doc_type}`);
    try {
      const file_base64 = await fileToBase64(file);
      const r = await fetch("/api/upload-document", {
        method: "POST",
        headers,
        body: JSON.stringify({
          order_number,
          doc_type,
          filename: file.name,
          content_type: file.type,
          file_base64,
        }),
      });
      return r.ok;
    } catch {
      return false;
    } finally {
      setUploadingKey("");
    }
  };

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
      const orderNumber = data.order.order_number;

      let docsOk = true;
      if (licenseFile) docsOk = (await uploadDocument(orderNumber, "license", licenseFile)) && docsOk;
      if (insuranceFile) docsOk = (await uploadDocument(orderNumber, "insurance", insuranceFile)) && docsOk;

      setCreateMsg(
        docsOk
          ? `✅ Order created: ${orderNumber}`
          : `✅ Order created: ${orderNumber} — but a document failed to upload. Try re-uploading it below.`
      );
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
      });
      setLicenseFile(null);
      setInsuranceFile(null);
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

  const handleReplaceDoc = async (order_number, doc_type, file) => {
    if (!file) return;
    const ok = await uploadDocument(order_number, doc_type, file);
    if (!ok) setListError("Document upload failed. Please try again.");
    loadOrders();
  };

  const startEdit = (o) => {
    setEditingOrder(o.order_number);
    setEditMsg("");
    const initial = {};
    EDIT_FIELDS.forEach(({ key }) => {
      initial[key] = o[key] || "";
    });
    setEditForm(initial);
  };

  const cancelEdit = () => {
    setEditingOrder(null);
    setEditForm({});
    setEditMsg("");
  };

  const saveEdit = async (order_number) => {
    setSavingEdit(true);
    setEditMsg("");
    try {
      const r = await fetch("/api/admin-orders", {
        method: "PATCH",
        headers,
        body: JSON.stringify({ order_number, ...editForm }),
      });
      if (!r.ok) {
        setEditMsg("Failed to save changes.");
        return;
      }
      setEditingOrder(null);
      setEditForm({});
      loadOrders();
    } catch {
      setEditMsg("Failed to save changes.");
    } finally {
      setSavingEdit(false);
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
                Driver name & carrier company are shown to the customer on /track. Uploaded
                documents are private — only visible here in admin, via a temporary link.
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

            <label className="rounded-xl border border-dashed border-yellow-500/40 bg-white/5 px-4 py-3 text-sm text-slate-300 cursor-pointer hover:bg-white/10 transition">
              <span className="block text-xs text-yellow-400/80 mb-1">
                Driver license (file, internal only)
              </span>
              {licenseFile ? licenseFile.name : "Choose file..."}
              <input
                type="file"
                accept="image/*,.pdf"
                className="hidden"
                onChange={(e) => setLicenseFile(e.target.files[0] || null)}
              />
            </label>

            <label className="rounded-xl border border-dashed border-yellow-500/40 bg-white/5 px-4 py-3 text-sm text-slate-300 cursor-pointer hover:bg-white/10 transition">
              <span className="block text-xs text-yellow-400/80 mb-1">
                Insurance document (file, internal only)
              </span>
              {insuranceFile ? insuranceFile.name : "Choose file..."}
              <input
                type="file"
                accept="image/*,.pdf"
                className="hidden"
                onChange={(e) => setInsuranceFile(e.target.files[0] || null)}
              />
            </label>

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
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold text-green-400">{o.status}</span>
                    {editingOrder !== o.order_number && (
                      <button
                        onClick={() => startEdit(o)}
                        className="text-xs text-blue-300 hover:text-white transition"
                      >
                        Edit
                      </button>
                    )}
                  </div>
                </div>

                {editingOrder === o.order_number ? (
                  <div className="mb-4">
                    <div className="grid sm:grid-cols-2 gap-3">
                      {EDIT_FIELDS.map(({ key, label, full }) =>
                        full ? (
                          <textarea
                            key={key}
                            placeholder={label}
                            value={editForm[key] || ""}
                            onChange={(e) => setEditForm({ ...editForm, [key]: e.target.value })}
                            className="sm:col-span-2 rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows={2}
                          />
                        ) : (
                          <input
                            key={key}
                            placeholder={label}
                            value={editForm[key] || ""}
                            onChange={(e) => setEditForm({ ...editForm, [key]: e.target.value })}
                            className="rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        )
                      )}
                    </div>
                    {editMsg && <p className="mt-2 text-sm text-red-400">{editMsg}</p>}
                    <div className="mt-3 flex gap-2">
                      <button
                        onClick={() => saveEdit(o.order_number)}
                        disabled={savingEdit}
                        className={`text-sm font-semibold rounded-lg px-4 py-2 transition ${
                          savingEdit ? "bg-gray-500 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                        }`}
                      >
                        {savingEdit ? "Saving..." : "Save Changes"}
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="text-sm rounded-lg px-4 py-2 bg-white/10 text-slate-300 hover:bg-white/20 transition"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="grid sm:grid-cols-2 gap-x-8 gap-y-1 text-sm text-slate-300 mb-4">
                    <p>From: {o.pickup}</p>
                    <p>To: {o.delivery}</p>
                    {o.vehicle && <p>Vehicle: {o.vehicle}</p>}
                    {o.transport && <p>Transport: {o.transport}</p>}
                    {o.carrier_company && <p>Carrier: {o.carrier_company}</p>}
                    {o.driver_name && <p>Driver: {o.driver_name}</p>}
                    {o.note && <p className="sm:col-span-2">Note: {o.note}</p>}
                  </div>
                )}

                {/* Documents */}
                <div className="grid sm:grid-cols-2 gap-3 mb-4">
                  <div className="rounded-xl border border-yellow-500/20 bg-white/5 p-3 flex items-center justify-between gap-2">
                    <div>
                      <p className="text-xs text-yellow-400/80 mb-1">Driver license</p>
                      {o.driver_license_url ? (
                        <a
                          href={o.driver_license_url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-sm text-blue-300 hover:text-white transition"
                        >
                          View file
                        </a>
                      ) : (
                        <p className="text-sm text-slate-500">Not uploaded</p>
                      )}
                    </div>
                    <label className="text-xs text-slate-300 cursor-pointer hover:text-white transition">
                      {uploadingKey === `${o.order_number}:license` ? "Uploading..." : "Upload / Replace"}
                      <input
                        type="file"
                        accept="image/*,.pdf"
                        className="hidden"
                        onChange={(e) =>
                          handleReplaceDoc(o.order_number, "license", e.target.files[0])
                        }
                      />
                    </label>
                  </div>

                  <div className="rounded-xl border border-yellow-500/20 bg-white/5 p-3 flex items-center justify-between gap-2">
                    <div>
                      <p className="text-xs text-yellow-400/80 mb-1">Insurance document</p>
                      {o.insurance_url ? (
                        <a
                          href={o.insurance_url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-sm text-blue-300 hover:text-white transition"
                        >
                          View file
                        </a>
                      ) : (
                        <p className="text-sm text-slate-500">Not uploaded</p>
                      )}
                    </div>
                    <label className="text-xs text-slate-300 cursor-pointer hover:text-white transition">
                      {uploadingKey === `${o.order_number}:insurance` ? "Uploading..." : "Upload / Replace"}
                      <input
                        type="file"
                        accept="image/*,.pdf"
                        className="hidden"
                        onChange={(e) =>
                          handleReplaceDoc(o.order_number, "insurance", e.target.files[0])
                        }
                      />
                    </label>
                  </div>
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