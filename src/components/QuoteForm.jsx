import { useState, useEffect, useRef } from "react";
import { submitQuote, getCityState } from "../googleDistance";
import PriceRangeGauge from "./PriceRangeGauge"; 

const PROMO_CODES = {
  USSTAR50: { discount: 50, label: "$50 off your first shipment" },
  USSTAR100: { discount: 100, label: "$100 off your second shipment" },
  REFER50: { discount: 50, label: "$50 off for referring a friend" },
};

const MOTORCYCLE_MAKES = [
  "harley-davidson", "ducati", "kawasaki", "yamaha", "suzuki", "triumph",
  "ktm", "indian", "royal enfield", "aprilia",
];

const VEHICLE_MAKES = [
  "Acura", "Alfa Romeo", "Aston Martin", "Audi", "Bentley", "BMW", "Buick",
  "Cadillac", "Chevrolet", "Chrysler", "Dodge", "Ferrari", "Fiat", "Ford",
  "Genesis", "GMC", "Honda", "Hyundai", "Infiniti", "Jaguar", "Jeep", "Kia",
  "Lamborghini", "Land Rover", "Lexus", "Lincoln", "Lucid", "Maserati",
  "Mazda", "McLaren", "Mercedes-Benz", "Mini", "Mitsubishi", "Nissan",
  "Polestar", "Porsche", "Ram", "Rivian", "Rolls-Royce", "Subaru", "Tesla",
  "Toyota", "Volkswagen", "Volvo",
  "Harley-Davidson", "Ducati", "Kawasaki", "Yamaha", "Suzuki", "Triumph",
  "KTM", "Indian", "Royal Enfield", "Aprilia",
].sort();

const MODEL_TO_TYPE = {
  Camry: "Sedan", Corolla: "Sedan", Civic: "Sedan", Accord: "Sedan",
  Altima: "Sedan", Malibu: "Sedan", Fusion: "Sedan", Sonata: "Sedan",
  Elantra: "Sedan", Jetta: "Sedan",
  RAV4: "SUV", "CR-V": "SUV", Equinox: "SUV", Explorer: "SUV",
  Rogue: "SUV", Escape: "SUV", Tucson: "SUV", Pilot: "SUV",
  Highlander: "SUV", Tahoe: "SUV",
  "F-150": "Pickup Truck", Silverado: "Pickup Truck", "Ram 1500": "Pickup Truck",
  Tundra: "Pickup Truck", Tacoma: "Pickup Truck", Colorado: "Pickup Truck",
  Ranger: "Pickup Truck", Sierra: "Pickup Truck", Frontier: "Pickup Truck", Ridgeline: "Pickup Truck",
  Odyssey: "Van", Sienna: "Van", Pacifica: "Van", Caravan: "Van",
  Transit: "Van", Sprinter: "Van", Metris: "Van",
  Sportster: "Motorcycle", "Street Glide": "Motorcycle", "Ninja 650": "Motorcycle",
  "CBR500R": "Motorcycle", "R1250GS": "Motorcycle",
};

function detectVehicleType(make, model) {
  const mk = (make || "").toLowerCase();
  const md = (model || "").toLowerCase();
  if (MOTORCYCLE_MAKES.includes(mk)) return "Motorcycle";
  if (/\b(truck|pickup|silverado|sierra|f-?150|f-?250|f-?350|ram|tundra|tacoma|frontier|ranger|colorado|ridgeline|titan|gladiator|canyon)\b/.test(md))
    return "Pickup Truck";
  if (/\b(van|transit|sprinter|express|savana|promaster|metris|nv200|caravan|odyssey|sienna|pacifica)\b/.test(md))
    return "Van";
  if (/\b(suv|explorer|tahoe|suburban|expedition|highlander|pilot|rav4|cr-?v|equinox|rogue|escape|tucson|santa fe|4runner|wrangler|cherokee|bronco|blazer|traverse|telluride|palisade|pathfinder|durango|edge|xterra|armada|sequoia|land cruiser|q5|q7|x3|x5|x7|glc|gle|gls)\b/.test(md))
    return "SUV";
  if (/\b(sedan|camry|corolla|civic|accord|altima|malibu|fusion|sonata|elantra|jetta|passat|maxima|impala|charger|300|a4|a6|3-?series|5-?series|c-?class|e-?class|model 3|model s)\b/.test(md))
    return "Sedan";
  return MODEL_TO_TYPE[model] || "";
}

async function fetchModels(make) {
  const res = await fetch(
    `https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformake/${encodeURIComponent(make)}?format=json`
  );
  const data = await res.json();
  const names = data.Results.map((r) => r.Model_Name);
  return [...new Set(names)].sort();
}

async function fetchVehicleImage(make, model, year) {
  const queries = [
    `${year} ${make} ${model}`.trim(),
    `${make} ${model} car`.trim(),
    `${make} ${model}`.trim(),
  ];
  const badWords = [
    "badge", "logo", "emblem", "interior", "dashboard", "dash", "engine",
    "wheel", "steering", "seat", "gauge", "detail", "closeup", "close-up",
    "trunk", "headlight", "taillight", "rim", "tire", "grille", "mirror",
    "document", "supreme", "court", "map", "diagram", "chart", "patent",
    "manual", "brochure", "advertisement", "poster", "stamp", "coin",
    "flag", "seal", "sign", "plate", "text", "page", "book", "letter",
    "reports", "united states",
  ];
  for (const q of queries) {
    try {
      const url =
        "https://commons.wikimedia.org/w/api.php" +
        "?action=query&generator=search&gsrnamespace=6" +
        `&gsrsearch=${encodeURIComponent(q)}` +
        "&gsrlimit=20&prop=imageinfo&iiprop=url|mime&iiurlwidth=900" +
        "&format=json&origin=*";
      const res = await fetch(url);
      const data = await res.json();
      const pages = data.query?.pages;
      if (!pages) continue;
      const items = Object.values(pages)
        .map((p) => {
          const info = p?.imageinfo?.[0];
          return info ? { title: (p.title || "").toLowerCase(), url: info.thumburl || info.url } : null;
        })
        .filter((x) => x && x.url && /\.(jpe?g)$/i.test(x.url));
      if (items.length === 0) continue;
      const makeWord = make.toLowerCase().split(" ")[0];
      const relevant = items.filter((it) => it.title.includes(makeWord));
      if (relevant.length === 0) continue;
      const clean = relevant.find((it) => !badWords.some((w) => it.title.includes(w)));
      if (clean) return clean.url;
      return relevant[0].url;
    } catch (e) {
      console.error(e);
    }
  }
  return null;
}

function fireConfetti() {
  const perSide = 80;
  const colors = [
    "#ff0a54", "#ff477e", "#ff7096", "#ffd000", "#ffea00",
    "#00e0ff", "#00ff8f", "#7b2ff7", "#ff8c00", "#3a86ff",
  ];
  const container = document.createElement("div");
  container.style.cssText =
    "position:fixed;inset:0;pointer-events:none;z-index:9999;overflow:hidden";
  document.body.appendChild(container);

  if (!document.getElementById("confetti-style")) {
    const style = document.createElement("style");
    style.id = "confetti-style";
    style.textContent = `
      @keyframes confetti-left {
        0%{transform:translate(0,0) rotate(0deg);opacity:1}
        100%{transform:translate(70vw,-60vh) rotate(720deg);opacity:0}
      }
      @keyframes confetti-right {
        0%{transform:translate(0,0) rotate(0deg);opacity:1}
        100%{transform:translate(-70vw,-60vh) rotate(-720deg);opacity:0}
      }`;
    document.head.appendChild(style);
  }

  const launch = (side) => {
    for (let i = 0; i < perSide; i++) {
      const piece = document.createElement("div");
      const size = 8 + Math.random() * 8;
      const bg = colors[Math.floor(Math.random() * colors.length)];
      const duration = 1400 + Math.random() * 1200;
      const delay = Math.random() * 250;
      const spread = (Math.random() - 0.5) * 40;
      const base =
        `position:absolute;bottom:${10 + spread}vh;width:${size}px;height:${size * 0.5}px;` +
        `background:${bg};border-radius:2px;box-shadow:0 0 6px ${bg};` +
        `transform:rotate(${Math.random() * 360}deg);`;
      piece.style.cssText =
        base +
        (side === "left"
          ? `left:-20px;animation:confetti-left ${duration}ms ${delay}ms cubic-bezier(.2,.6,.4,1) forwards`
          : `right:-20px;animation:confetti-right ${duration}ms ${delay}ms cubic-bezier(.2,.6,.4,1) forwards`);
      container.appendChild(piece);
    }
  };
  launch("left");
  launch("right");
  setTimeout(() => container.remove(), 3200);
}

function Spinner() {
  return (
    <svg className="animate-spin h-4 w-4 text-blue-500" viewBox="0 0 24 24" fill="none">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
    </svg>
  );
}

function ZipInput({ label, name, value, onChange, cityState, loading }) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={`zip-${name}`} className="text-sm font-semibold text-gray-700">
        {label}
      </label>
      <input
        id={`zip-${name}`}
        type="text"
        inputMode="numeric"
        autoComplete="postal-code"
        name={name}
        value={value}
        onChange={onChange}
        placeholder="e.g. 90210"
        maxLength={5}
        required
        className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
      />
      <div className="h-5 flex items-center gap-2 pl-1">
        {loading && <Spinner />}
        {!loading && cityState && (
          <span className="text-xs text-blue-600 font-medium">{cityState}</span>
        )}
      </div>
    </div>
  );
}

function Autocomplete({ placeholder, value, onChange, suggestions, onSelect, loading }) {
  const [open, setOpen] = useState(false);
  const ref = useRef();
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);
  return (
    <div className="relative" ref={ref}>
      <div className="flex items-center border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-blue-500">
        <input
          type="text"
          value={value}
          onChange={(e) => { onChange(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          placeholder={placeholder}
          required
          className="p-3 rounded-lg flex-1 outline-none bg-transparent"
        />
        {loading && <span className="pr-3"><Spinner /></span>}
      </div>
      {open && suggestions.length > 0 && (
        <ul className="absolute z-50 bg-white border border-gray-200 rounded-lg shadow-lg mt-1 max-h-48 overflow-y-auto w-full">
          {suggestions.map((s) => (
            <li
              key={s}
              onMouseDown={() => { onSelect(s); setOpen(false); }}
              className="px-4 py-2 hover:bg-blue-50 cursor-pointer text-sm"
            >
              {s}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

let vehicleIdCounter = 0;
function makeEmptyVehicle() {
  vehicleIdCounter += 1;
  return {
    id: `v${vehicleIdCounter}-${Date.now()}`,
    year: "", make: "", model: "", vehicle: "", condition: "",
    image: null, imageLoading: false,
    makeSuggestions: [], modelSuggestions: [], allModels: [], modelsLoading: false,
  };
}

function VehicleCard({ vehicle, index, canRemove, onRemove, onFieldChange, onMakeChange, onMakeSelect, onModelChange, onModelSelect }) {
  return (
    <div className="border border-gray-200 rounded-2xl p-4 sm:p-5 relative">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-bold text-gray-700">Vehicle {index + 1}</h3>
        {canRemove && (
          <button type="button" onClick={onRemove} className="text-sm text-red-500 hover:text-red-700 font-medium">
            Remove
          </button>
        )}
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <input
          type="text"
          inputMode="numeric"
          pattern="(19|20)\d{2}"
          title="Enter a 4-digit year, e.g. 2019"
          maxLength={4}
          value={vehicle.year}
          onChange={(e) => onFieldChange("year", e.target.value.replace(/\D/g, "").slice(0, 4))}
          placeholder="Vehicle Year (e.g. 2019)"
          className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <Autocomplete
          placeholder="Vehicle Make (e.g. Toyota)"
          value={vehicle.make}
          onChange={onMakeChange}
          suggestions={vehicle.makeSuggestions}
          onSelect={onMakeSelect}
          loading={false}
        />
        <Autocomplete
          placeholder="Vehicle Model (e.g. Camry)"
          value={vehicle.model}
          onChange={onModelChange}
          suggestions={vehicle.modelSuggestions}
          onSelect={onModelSelect}
          loading={vehicle.modelsLoading}
        />
        <select
          value={vehicle.vehicle}
          onChange={(e) => onFieldChange("vehicle", e.target.value)}
          className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="">Vehicle Type</option>
          <option value="Sedan">Sedan</option>
          <option value="SUV">SUV</option>
          <option value="Pickup Truck">Pickup Truck</option>
          <option value="Van">Van</option>
          <option value="Motorcycle">Motorcycle</option>
        </select>
        <select
          value={vehicle.condition}
          onChange={(e) => onFieldChange("condition", e.target.value)}
          className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 md:col-span-2"
          required
        >
          <option value="">Vehicle Condition</option>
          <option value="Running">Running</option>
          <option value="Non-Running">Non-Running</option>
        </select>
        {(vehicle.imageLoading || vehicle.image) && (
          <div className="md:col-span-2 rounded-xl overflow-hidden h-60 sm:h-72 bg-gray-100 flex items-center justify-center">
            {vehicle.imageLoading ? (
              <div className="flex flex-col items-center gap-2 text-gray-400">
                <Spinner />
                <span className="text-sm">Loading vehicle image...</span>
              </div>
            ) : (
              <img src={vehicle.image} alt={`${vehicle.make} ${vehicle.model}`} loading="lazy" decoding="async" className="w-full h-full object-contain" />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function QuoteForm() {
  const initialForm = {
    pickup: "", delivery: "", transport: "", pickupDate: "",
    name: "", phone: "", email: "",
    promoCode: "",
    website: "",
  };

  const [formData, setFormData] = useState(initialForm);
  const [vehicles, setVehicles] = useState([makeEmptyVehicle()]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [promoMessage, setPromoMessage] = useState({ type: "", text: "" });
  const [quote, setQuote] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [appliedPromo, setAppliedPromo] = useState(null);

  // Two-step flow: 1 = shipment details → estimate, 2 = contact details → book
  const [step, setStep] = useState(1);
  const [estimate, setEstimate] = useState(null);
  const [estimating, setEstimating] = useState(false);

  const [pickupCity, setPickupCity] = useState("");
  const [deliveryCity, setDeliveryCity] = useState("");
  const [zipLoadingPickup, setZipLoadingPickup] = useState(false);
  const [zipLoadingDelivery, setZipLoadingDelivery] = useState(false);

  const quoteRef = useRef(null);
  const stepTopRef = useRef(null);

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    // Prefill promo code from banner links like /?promo=USSTAR50#quote-form
    const promoParam = (params.get("promo") || "").toUpperCase().trim();
    if (promoParam && PROMO_CODES[promoParam]) {
      setFormData((p) => ({ ...p, promoCode: promoParam }));
    }

    // Prefill ZIPs from route links like /?pickup=90001&delivery=33101#quote-form
    const pickupParam = (params.get("pickup") || "").replace(/\D/g, "").slice(0, 5);
    const deliveryParam = (params.get("delivery") || "").replace(/\D/g, "").slice(0, 5);
    if (pickupParam || deliveryParam) {
      setFormData((p) => ({
        ...p,
        ...(pickupParam ? { pickup: pickupParam } : {}),
        ...(deliveryParam ? { delivery: deliveryParam } : {}),
      }));
    }

    const hasHash = window.location.hash === "#quote-form";
    const hasParam = params.has("quote") || !!promoParam;
    const hasPath = window.location.pathname.replace(/\/$/, "") === "/quote-form";
    if (hasHash || hasParam || hasPath) {
      const t = setTimeout(() => {
        document.getElementById("quote-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 300);
      return () => clearTimeout(t);
    }
  }, []);

  useEffect(() => {
    if (formData.pickup.length === 5) {
      setZipLoadingPickup(true);
      getCityState(formData.pickup)
        .then((r) => setPickupCity(r || ""))
        .catch(() => setPickupCity(""))
        .finally(() => setZipLoadingPickup(false));
    } else {
      setPickupCity("");
    }
  }, [formData.pickup]);

  useEffect(() => {
    if (formData.delivery.length === 5) {
      setZipLoadingDelivery(true);
      getCityState(formData.delivery)
        .then((r) => setDeliveryCity(r || ""))
        .catch(() => setDeliveryCity(""))
        .finally(() => setZipLoadingDelivery(false));
    } else {
      setDeliveryCity("");
    }
  }, [formData.delivery]);

  // Check promo code as user types
  useEffect(() => {
    const code = formData.promoCode.toUpperCase().trim();
    if (!code) {
      setPromoMessage({ type: "", text: "" });
      setAppliedPromo(null);
      return;
    }
    if (PROMO_CODES[code]) {
      setPromoMessage({ type: "success", text: `Promo applied! ${PROMO_CODES[code].label}` });
      setAppliedPromo(PROMO_CODES[code]);
    } else {
      setPromoMessage({ type: "error", text: "Invalid promo code." });
      setAppliedPromo(null);
    }
  }, [formData.promoCode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const patchVehicle = (id, patch) => {
    setVehicles((prev) => prev.map((v) => (v.id === id ? { ...v, ...patch } : v)));
  };

  const addVehicle = () => setVehicles((prev) => [...prev, makeEmptyVehicle()]);

  const removeVehicle = (id) => {
    setVehicles((prev) => (prev.length > 1 ? prev.filter((v) => v.id !== id) : prev));
  };

  const handleVehicleField = (id, field, value) => patchVehicle(id, { [field]: value });

  const handleVehicleMakeChange = (id, val) => {
    const filtered = VEHICLE_MAKES.filter((m) => m.toLowerCase().startsWith(val.toLowerCase())).slice(0, 8);
    patchVehicle(id, { make: val, model: "", vehicle: "", image: null, allModels: [], modelSuggestions: [], makeSuggestions: filtered });
  };

  const handleVehicleMakeSelect = async (id, make) => {
    patchVehicle(id, { make, model: "", vehicle: "", image: null, makeSuggestions: [], modelsLoading: true });
    try {
      const models = await fetchModels(make);
      patchVehicle(id, { allModels: models, modelsLoading: false });
    } catch (e) {
      console.error(e);
      patchVehicle(id, { modelsLoading: false });
    }
  };

  const handleVehicleModelChange = (id, val, allModels) => {
    const filtered = allModels.filter((m) => m.toLowerCase().startsWith(val.toLowerCase())).slice(0, 8);
    patchVehicle(id, { model: val, vehicle: "", image: null, modelSuggestions: filtered });
  };

  const handleVehicleModelSelect = async (id, make, model) => {
    const detectedType = detectVehicleType(make, model);
    patchVehicle(id, { model, vehicle: detectedType, modelSuggestions: [] });
    if (make && model) {
      patchVehicle(id, { imageLoading: true });
      try {
        const img = await fetchVehicleImage(make, model, "");
        patchVehicle(id, { image: img, imageLoading: false });
      } catch (e) {
        console.error(e);
        patchVehicle(id, { imageLoading: false });
      }
    }
  };

  const shipmentPayload = () => ({
    pickup: formData.pickup,
    delivery: formData.delivery,
    transport: formData.transport,
    pickupDate: formData.pickupDate,
    website: formData.website,
    vehicles: vehicles.map(({ year, make, model, vehicle, condition }) => ({
      year, make, model, vehicle, condition,
    })),
    year: vehicles[0]?.year,
    make: vehicles[0]?.make,
    model: vehicles[0]?.model,
    vehicle: vehicles[0]?.vehicle,
    condition: vehicles[0]?.condition,
  });

  // STEP 1 — get the estimate (no contact details required)
  const handleGetEstimate = async (e) => {
    e.preventDefault();
    setEstimating(true);
    setMessage({ type: "", text: "" });

    try {
      const data = await submitQuote({ ...shipmentPayload(), mode: "estimate" });
      setEstimate(data.quote);
      setStep(2);
      setTimeout(() => stepTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
    } catch (err) {
      console.error(err);
      const code = err.code || "SERVER_ERROR";
      if (code === "INVALID_ZIP") {
        setMessage({ type: "error", text: "One of the ZIP codes is incorrect. Please check and try again." });
      } else if (code === "NO_ROUTE") {
        setMessage({ type: "error", text: "We couldn't calculate a route for those ZIP codes. Please check them." });
      } else if (code === "RATE_LIMITED") {
        setMessage({ type: "error", text: "Too many requests. Please wait a minute and try again." });
      } else {
        setMessage({ type: "error", text: "Something went wrong. Please try again." });
      }
    } finally {
      setEstimating(false);
    }
  };

  // STEP 2 — save the quote with contact details
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });
    setQuote(null);

    const payload = {
      ...shipmentPayload(),
      mode: "book",
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      promoCode: formData.promoCode.toUpperCase(),
    };

    try {
      const data = await submitQuote(payload);
      // Server already applied the promo discount — use its prices directly
      setQuote(data.quote);
      setSubmitted(true);
      fireConfetti();
      setTimeout(() => quoteRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 100);
    } catch (err) {
      console.error(err);
      const code = err.code || "SERVER_ERROR";
      if (code === "INVALID_ZIP") {
        setMessage({ type: "error", text: "One of the ZIP codes is incorrect. Please check and try again." });
      } else if (code === "NO_ROUTE") {
        setMessage({ type: "error", text: "We couldn't calculate a route for those ZIP codes. Please check them." });
      } else if (code === "RATE_LIMITED") {
        setMessage({ type: "error", text: "Too many requests. Please wait a minute and try again." });
      } else {
        setMessage({ type: "error", text: "Something went wrong. Please try again." });
      }
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData(initialForm);
    setVehicles([makeEmptyVehicle()]);
    setQuote(null);
    setSubmitted(false);
    setMessage({ type: "", text: "" });
    setPromoMessage({ type: "", text: "" });
    setAppliedPromo(null);
    setPickupCity("");
    setDeliveryCity("");
    setStep(1);
    setEstimate(null);
  };

  return (
    <section id="quote-form" className="max-w-5xl mx-auto px-4 sm:px-6 -mt-14 relative z-10">
      <div className="rounded-3xl bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-600 p-[3px] shadow-2xl">
        <div className="bg-white rounded-[21px] p-5 sm:p-7">
        {submitted ? (
          <div ref={quoteRef} className="max-w-2xl mx-auto text-center py-6">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <svg className="h-8 w-8 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <h2 className="text-3xl font-bold mb-2">Request received!</h2>
            <p className="text-gray-600 mb-6">
              Thanks{formData.name ? `, ${formData.name.split(" ")[0]}` : ""}! One of our agents will
              contact you <span className="font-semibold text-gray-800">within 1 hour</span> by
              phone or email to finalize your booking.
            </p>

            {quote && (
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-4 inline-block min-w-[260px]">
                <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Your Estimated Quote</div>
                {appliedPromo && (
                  <div className="text-sm text-gray-400 line-through mb-1">${quote.originalPrice}</div>
                )}
                <div className="text-4xl font-bold text-blue-700">${quote.price}</div>
                <div className="text-sm text-gray-500 mt-1">{quote.distance} · {quote.duration}</div>
                {appliedPromo && (
                  <div className="mt-2 text-green-600 font-semibold text-sm">
                    You saved ${appliedPromo.discount} with code {formData.promoCode.toUpperCase()}!
                  </div>
                )}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mt-4">
              <a
                href="tel:+18657227114"
                className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-3 rounded-lg transition-colors"
              >
                Call us now: (865) 722-7114
              </a>
              <button
                type="button"
                onClick={resetForm}
                className="w-full sm:w-auto text-blue-600 hover:text-blue-800 font-medium px-6 py-3"
              >
                Submit another quote
              </button>
            </div>

            <p className="text-xs text-gray-400 mt-6">
              A confirmation has been sent to our team. We look forward to helping you ship your vehicle safely.
            </p>
          </div>
        ) : (
          <>
            <div ref={stepTopRef} />
            <h2 className="text-2xl sm:text-3xl font-extrabold text-center mb-2 bg-gradient-to-r from-blue-700 via-cyan-500 to-blue-700 bg-clip-text text-transparent">🚗 Get Your Free Car Shipping Quote</h2>
            <p className="text-center text-gray-500 mb-5 text-sm sm:text-base">⚡ Instant estimate · 🛡️ Licensed & bonded broker · 🚪 Door-to-door</p>

            {/* Step indicator */}
            <div className="flex items-center justify-center gap-3 mb-6 text-sm">
              <div className={`flex items-center gap-2 ${step === 1 ? "text-blue-700 font-bold" : "text-gray-400"}`}>
                <span className={`flex h-6 w-6 items-center justify-center rounded-full text-xs ${step === 1 ? "bg-blue-600 text-white" : "bg-green-500 text-white"}`}>
                  {step === 1 ? "1" : "✓"}
                </span>
                Shipment details
              </div>
              <div className="h-px w-8 bg-gray-300" />
              <div className={`flex items-center gap-2 ${step === 2 ? "text-blue-700 font-bold" : "text-gray-400"}`}>
                <span className={`flex h-6 w-6 items-center justify-center rounded-full text-xs ${step === 2 ? "bg-blue-600 text-white" : "bg-gray-300 text-white"}`}>2</span>
                Your estimate
              </div>
            </div>

            {step === 1 ? (
              /* ============ STEP 1 — SHIPMENT DETAILS ============ */
              <form onSubmit={handleGetEstimate} className="flex flex-col gap-4">
                <input
                  type="text"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px", opacity: 0 }}
                />

                <div className="grid md:grid-cols-2 gap-4">
                  <ZipInput
                    label="Pickup ZIP Code"
                    name="pickup"
                    value={formData.pickup}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "").slice(0, 5);
                      setFormData((p) => ({ ...p, pickup: value }));
                    }}
                    cityState={pickupCity}
                    loading={zipLoadingPickup}
                  />
                  <ZipInput
                    label="Delivery ZIP Code"
                    name="delivery"
                    value={formData.delivery}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "").slice(0, 5);
                      setFormData((p) => ({ ...p, delivery: value }));
                    }}
                    cityState={deliveryCity}
                    loading={zipLoadingDelivery}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label htmlFor="pickup-date" className="text-sm font-semibold text-gray-700">
                      First Available Pickup Date
                    </label>
                    <input
                      id="pickup-date"
                      type="date"
                      name="pickupDate"
                      value={formData.pickupDate}
                      min={today}
                      onChange={handleChange}
                      required
                      className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                    />
                    <p className="text-xs text-gray-400 pl-1">Flexible dates often mean better carrier availability.</p>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label htmlFor="transport-type" className="text-sm font-semibold text-gray-700">
                      Transport Type
                    </label>
                    <select
                      id="transport-type"
                      name="transport"
                      value={formData.transport}
                      onChange={handleChange}
                      className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                      required
                    >
                      <option value="">Select transport type</option>
                      <option value="Open">Open Transport (most affordable)</option>
                      <option value="Enclosed">Enclosed Transport (extra protection)</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  {vehicles.map((v, i) => (
                    <VehicleCard
                      key={v.id}
                      vehicle={v}
                      index={i}
                      canRemove={vehicles.length > 1}
                      onRemove={() => removeVehicle(v.id)}
                      onFieldChange={(field, value) => handleVehicleField(v.id, field, value)}
                      onMakeChange={(val) => handleVehicleMakeChange(v.id, val)}
                      onMakeSelect={(make) => handleVehicleMakeSelect(v.id, make)}
                      onModelChange={(val) => handleVehicleModelChange(v.id, val, v.allModels)}
                      onModelSelect={(model) => handleVehicleModelSelect(v.id, v.make, model)}
                    />
                  ))}
                </div>

                <button
                  type="button"
                  onClick={addVehicle}
                  className="self-start flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold px-2 py-1"
                >
                  <span className="text-xl leading-none">+</span> Add another vehicle
                </button>

                <button
                  type="submit"
                  disabled={estimating}
                  className={`py-3 rounded-lg font-bold text-white transition-colors ${
                    estimating ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  {estimating ? "Calculating your estimate..." : "See My Instant Estimate →"}
                </button>

                <p className="text-center text-xs text-gray-400">
                  No contact details needed to see your estimate.
                </p>

                {message.text && (
                  <div className={`text-center font-medium ${message.type === "success" ? "text-green-600" : "text-red-600"}`}>
                    {message.text}
                  </div>
                )}
              </form>
            ) : (
              /* ============ STEP 2 — ESTIMATE + CONTACT ============ */
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                  type="text"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px", opacity: 0 }}
                />

                {estimate && (
                  <PriceRangeGauge
                    estimate={estimate}
                    rangePercent={0.2}
                    onEditDetails={() => setStep(1)}
                  />
                )}

                <p className="text-center text-gray-600 text-sm font-medium">
                  Enter your contact details to save this quote — an agent will confirm
                  availability for your dates.
                </p>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label htmlFor="contact-name" className="text-sm font-semibold text-gray-700">Full Name</label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      autoComplete="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. John Smith"
                      className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label htmlFor="contact-phone" className="text-sm font-semibold text-gray-700">Phone Number</label>
                    <input
                      id="contact-phone"
                      type="tel"
                      name="phone"
                      autoComplete="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="e.g. (865) 555-0123"
                      className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div className="flex flex-col gap-1 md:col-span-2">
                    <label htmlFor="contact-email" className="text-sm font-semibold text-gray-700">Email Address</label>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      autoComplete="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. john@example.com"
                      className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="promo-code" className="text-sm font-semibold text-gray-700 block mb-1">
                      Promo Code <span className="font-normal text-gray-400">(optional)</span>
                    </label>
                    <input
                      id="promo-code"
                      type="text"
                      name="promoCode"
                      value={formData.promoCode}
                      onChange={handleChange}
                      placeholder="e.g. USSTAR50"
                      className={`border p-3 rounded-lg w-full focus:outline-none focus:ring-2 uppercase tracking-widest ${
                        promoMessage.type === "success"
                          ? "border-green-400 focus:ring-green-500 bg-green-50"
                          : promoMessage.type === "error"
                          ? "border-red-400 focus:ring-red-500"
                          : "border-gray-300 focus:ring-green-500"
                      }`}
                    />
                    {promoMessage.text && (
                      <p className={`mt-1 text-sm font-medium ${promoMessage.type === "success" ? "text-green-600" : "text-red-500"}`}>
                        {promoMessage.type === "success" ? "✅" : "❌"} {promoMessage.text}
                      </p>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={`py-3 rounded-lg font-bold text-white transition-colors ${
                    loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  {loading ? "Saving your quote..." : `Save My Quote${appliedPromo ? ` (-$${appliedPromo.discount})` : ""}`}
                </button>

                <p className="text-center text-xs text-gray-400 leading-5">
                  By submitting, you agree to our{" "}
                  <a href="/terms" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Terms</a>
                  {" "}and{" "}
                  <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Privacy Policy</a>,
                  and consent to be contacted by US Star Trucking LLC by phone,
                  SMS, or email about your quote. Message rates may apply; reply STOP to opt
                  out. An agent typically responds within 1 hour (8 AM – 8 PM ET).
                </p>

                {message.text && (
                  <div className={`text-center font-medium ${message.type === "success" ? "text-green-600" : "text-red-600"}`}>
                    {message.text}
                  </div>
                )}
              </form>
            )}
          </>
        )}
        </div>
      </div>
    </section>
  );
}