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
  { key: "driver_phone", label: "Driver / dispatcher phone" },
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
    driver_phone: "",
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
  const [deletingOrder, setDeletingOrder] = useState(null);

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
    if (!file) return { ok: true };
    if (file.size > 3 * 1024 * 1024) {
      return {
        ok: false,
        detail: `"${file.name}" is ${(file.size / (1024 * 1024)).toFixed(1)}MB. Max is 3MB — please use a smaller photo or a compressed scan.`,
      };
    }
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
      const data = await r.json().catch(() => ({}));
      return { ok: r.ok, detail: data.detail || (r.ok ? "" : "Upload failed.") };
    } catch {
      return { ok: false, detail: "Upload failed — network error." };
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

      const docErrors = [];
      if (licenseFile) {
        const res1 = await uploadDocument(orderNumber, "license", licenseFile);
        if (!res1.ok) docErrors.push(`License: ${res1.detail}`);
      }
      if (insuranceFile) {
        const res2 = await uploadDocument(orderNumber, "insurance", insuranceFile);
        if (!res2.ok) docErrors.push(`Insurance: ${res2.detail}`);
      }

      setCreateMsg(
        docErrors.length === 0
          ? `✅ Order created: ${orderNumber}`
          : `✅ Order created: ${orderNumber} — but: ${docErrors.join(" | ")} You can re-upload it below.`
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
        driver_phone: "",
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
    const result = await uploadDocument(order_number, doc_type, file);
    if (!result.ok) setListError(result.detail || "Document upload failed. Please try again.");
    loadOrders();
  };

  const handleDelete = async (order_number) => {
    try {
      const r = await fetch("/api/admin-orders", {
        method: "DELETE",
        headers,
        body: JSON.stringify({ order_number }),
      });
      if (!r.ok) {
        setListError("Failed to delete order.");
        return;
      }
      setDeletingOrder(null);
      loadOrders();
    } catch {
      setListError("Failed to delete order.");
    }
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

  const activeOrders = orders.filter((o) => o.status !== "Delivered");
  const completedOrders = orders.filter((o) => o.status === "Delivered");

  const renderOrderCard = (o) => (
    <div key={o.order_number} className="rounded-2xl border border-white/10 bg-white/5 p-5">
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
          {deletingOrder === o.order_number ? (
            <span className="flex items-center gap-2">
              <span className="text-xs text-red-400">Delete permanently?</span>
              <button
                onClick={() => handleDelete(o.order_number)}
                className="text-xs font-semibold text-red-400 hover:text-red-300 transition"
              >
                Yes, delete
              </button>
              <button
                onClick={() => setDeletingOrder(null)}
                className="text-xs text-slate-400 hover:text-white transition"
              >
                Cancel
              </button>
            </span>
          ) : (
            <button
              onClick={() => setDeletingOrder(o.order_number)}
              className="text-xs text-red-400/70 hover:text-red-400 transition"
            >
              Delete
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
          {o.driver_phone && <p>Driver phone: {o.driver_phone}</p>}
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
              accept="image/*,.pdf,.doc,.docx"
              className="hidden"
              onChange={(e) => handleReplaceDoc(o.order_number, "license", e.target.files[0])}
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
              accept="image/*,.pdf,.doc,.docx"
              className="hidden"
              onChange={(e) => handleReplaceDoc(o.order_number, "insurance", e.target.files[0])}
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
  );

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
                Driver name, phone & carrier are shown to the customer on /track. Uploaded
                license & insurance files are also viewable by the customer there, via a
                temporary secure link.
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
              placeholder="Driver / dispatcher phone (shown to customer)"
              value={form.driver_phone}
              onChange={(e) => setForm({ ...form, driver_phone: e.target.value })}
              className="rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <label className="rounded-xl border border-dashed border-yellow-500/40 bg-white/5 px-4 py-3 text-sm text-slate-300 cursor-pointer hover:bg-white/10 transition">
              <span className="block text-xs text-yellow-400/80 mb-1">
                Driver license (file)
              </span>
              {licenseFile ? licenseFile.name : "Choose file..."}
              <input
                type="file"
                accept="image/*,.pdf,.doc,.docx"
                className="hidden"
                onChange={(e) => setLicenseFile(e.target.files[0] || null)}
              />
            </label>

            <label className="rounded-xl border border-dashed border-yellow-500/40 bg-white/5 px-4 py-3 text-sm text-slate-300 cursor-pointer hover:bg-white/10 transition">
              <span className="block text-xs text-yellow-400/80 mb-1">
                Insurance document (file)
              </span>
              {insuranceFile ? insuranceFile.name : "Choose file..."}
              <input
                type="file"
                accept="image/*,.pdf,.doc,.docx"
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
            <h2 className="text-xl font-bold">Active Orders</h2>
            <button
              onClick={loadOrders}
              className="text-sm text-blue-300 hover:text-white transition"
            >
              Refresh
            </button>
          </div>

          {loading && <p className="text-slate-400">Loading...</p>}
          {listError && <p className="text-red-400">{listError}</p>}
          {!loading && activeOrders.length === 0 && (
            <p className="text-slate-400">No active orders.</p>
          )}

          <div className="space-y-4">{activeOrders.map((o) => renderOrderCard(o))}</div>
        </section>

        {/* Completed orders */}
        <section className="rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur p-6 sm:p-8">
          <h2 className="text-xl font-bold mb-6 text-slate-400">Completed Orders</h2>
          {!loading && completedOrders.length === 0 && (
            <p className="text-slate-500">No completed orders yet.</p>
          )}
          <div className="space-y-4 opacity-75">
            {completedOrders.map((o) => renderOrderCard(o))}
          </div>
        </section>
      </main>
    </div>
  );
}