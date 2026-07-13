import { useState, useEffect, useRef } from "react";
import { submitQuote, getCityState } from "../googleDistance";

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

// Two-sided confetti burst — no external library.
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
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={label}
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

export default function QuoteForm() {
  const initialForm = {
    pickup: "", delivery: "", year: "", make: "", model: "",
    vehicle: "", condition: "", transport: "", name: "", phone: "", email: "",
    website: "", // honeypot — must stay empty
  };

  const [formData, setFormData] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [quote, setQuote] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const [pickupCity, setPickupCity] = useState("");
  const [deliveryCity, setDeliveryCity] = useState("");
  const [zipLoadingPickup, setZipLoadingPickup] = useState(false);
  const [zipLoadingDelivery, setZipLoadingDelivery] = useState(false);

  const [makeSuggestions, setMakeSuggestions] = useState([]);
  const [allModels, setAllModels] = useState([]);
  const [modelSuggestions, setModelSuggestions] = useState([]);
  const [modelsLoading, setModelsLoading] = useState(false);

  const [vehicleImage, setVehicleImage] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);

  const quoteRef = useRef(null);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleMakeChange = (val) => {
    setFormData((p) => ({ ...p, make: val, model: "", vehicle: "" }));
    setAllModels([]);
    setModelSuggestions([]);
    setVehicleImage(null);
    const filtered = VEHICLE_MAKES.filter((m) => m.toLowerCase().startsWith(val.toLowerCase())).slice(0, 8);
    setMakeSuggestions(filtered);
  };

  const handleMakeSelect = async (make) => {
    setFormData((p) => ({ ...p, make, model: "", vehicle: "" }));
    setMakeSuggestions([]);
    setVehicleImage(null);
    setModelsLoading(true);
    try {
      const models = await fetchModels(make);
      setAllModels(models);
    } catch (e) {
      console.error(e);
    } finally {
      setModelsLoading(false);
    }
  };

  const handleModelChange = (val) => {
    setFormData((p) => ({ ...p, model: val, vehicle: "" }));
    setVehicleImage(null);
    const filtered = allModels.filter((m) => m.toLowerCase().startsWith(val.toLowerCase())).slice(0, 8);
    setModelSuggestions(filtered);
  };

  const handleModelSelect = async (model) => {
    const detectedType = detectVehicleType(formData.make, model);
    setFormData((p) => ({ ...p, model, vehicle: detectedType }));
    setModelSuggestions([]);
    if (formData.make && model) {
      setImageLoading(true);
      try {
        const img = await fetchVehicleImage(formData.make, model, formData.year);
        setVehicleImage(img);
      } catch (e) {
        console.error(e);
      } finally {
        setImageLoading(false);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });
    setQuote(null);

    try {
      const data = await submitQuote(formData); // server: geocode + route + price + email
      setQuote(data.quote);
      setSubmitted(true);
      fireConfetti();
      setTimeout(() => quoteRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 100);
    } catch (err) {
      console.error(err);
      const code = err.code || "SERVER_ERROR";
      if (code === "INVALID_ZIP") {
        setMessage({ type: "error", text: "❌ One of the ZIP codes is incorrect. Please check and try again." });
      } else if (code === "NO_ROUTE") {
        setMessage({ type: "error", text: "❌ We couldn't calculate a route for those ZIP codes. Please check them." });
      } else if (code === "RATE_LIMITED") {
        setMessage({ type: "error", text: "❌ Too many requests. Please wait a minute and try again." });
      } else {
        setMessage({ type: "error", text: "❌ Something went wrong. Please try again." });
      }
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData(initialForm);
    setQuote(null);
    setSubmitted(false);
    setMessage({ type: "", text: "" });
    setPickupCity("");
    setDeliveryCity("");
    setVehicleImage(null);
    setAllModels([]);
  };

  return (
    <section id="quote-form" className="max-w-6xl mx-auto px-4 sm:px-6 -mt-10 relative z-10">
      <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8">
        {submitted ? (
          <div ref={quoteRef} className="max-w-2xl mx-auto text-center py-6">
            {/* Checkmark */}
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

            {/* Estimated price recap */}
            {quote && (
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-6 inline-block min-w-[260px]">
                <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Your Estimated Quote</div>
                <div className="text-4xl font-bold text-blue-700">${quote.price}</div>
                <div className="text-sm text-gray-500 mt-1">{quote.distance} · {quote.duration}</div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              <a
                href="tel:+18657227114"
                className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-3 rounded-lg transition-colors"
              >
                📞 Call us now: (865) 722-7114
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
              A confirmation has been sent to our team. We can't wait to help you ship your vehicle safely.
            </p>
          </div>
        ) : (
        <>
        <h2 className="text-3xl font-bold text-center mb-2">
          Get Your Free Car Shipping Quote
        </h2>
        <p className="text-center text-gray-500 mb-8">
          Fast · Safe · Door-to-Door Auto Transport
        </p>

        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
          {/* Honeypot — hidden from humans, bots fill it and get silently rejected */}
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

          <input
            type="text"
            name="year"
            value={formData.year}
            onChange={handleChange}
            placeholder="Vehicle Year"
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <Autocomplete
            placeholder="Vehicle Make (e.g. Toyota)"
            value={formData.make}
            onChange={handleMakeChange}
            suggestions={makeSuggestions}
            onSelect={handleMakeSelect}
            loading={false}
          />

          <Autocomplete
            placeholder="Vehicle Model (e.g. Camry)"
            value={formData.model}
            onChange={handleModelChange}
            suggestions={modelSuggestions}
            onSelect={handleModelSelect}
            loading={modelsLoading}
          />

          <select
            name="vehicle"
            value={formData.vehicle}
            onChange={handleChange}
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
            name="condition"
            value={formData.condition}
            onChange={handleChange}
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Vehicle Condition</option>
            <option value="Running">Running</option>
            <option value="Non-Running">Non-Running</option>
          </select>

          <select
            name="transport"
            value={formData.transport}
            onChange={handleChange}
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Transport Type</option>
            <option value="Open">Open Transport</option>
            <option value="Enclosed">Enclosed Transport</option>
          </select>

          {(imageLoading || vehicleImage) && (
            <div className="md:col-span-2 rounded-xl overflow-hidden h-72 sm:h-96 bg-gray-100 flex items-center justify-center">
              {imageLoading ? (
                <div className="flex flex-col items-center gap-2 text-gray-400">
                  <Spinner />
                  <span className="text-sm">Loading vehicle image…</span>
                </div>
              ) : (
                <img
                  src={vehicleImage}
                  alt={`${formData.make} ${formData.model}`}
                  className="w-full h-full object-contain"
                />
              )}
            </div>
          )}

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address"
            className="border border-gray-300 p-3 rounded-lg md:col-span-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className={`md:col-span-2 py-3 rounded-lg font-bold text-white transition-colors ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Calculating…" : "Get My Free Quote"}
          </button>

          {message.text && (
            <div
              className={`md:col-span-2 text-center font-medium ${
                message.type === "success" ? "text-green-600" : "text-red-600"
              }`}
            >
              {message.text}
            </div>
          )}
        </form>
        </>
        )}
      </div>
    </section>
  );
}