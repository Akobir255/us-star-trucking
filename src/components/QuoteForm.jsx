import { useState, useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";
import { getDistance } from "../googleDistance";
import { calculateQuote } from "../pricing";

const UNSPLASH_KEY = "5TVaxXdJqOFIlK8vkA10aeg_cN6spqAWH1zntE8gX6c";
const GOOGLE_KEY = "AIzaSyD4c8Gs15mvWYKOWFXB8viJggDLRn-OtQY";

const MODEL_TO_TYPE = {
  // Sedans
  Camry: "Sedan", Corolla: "Sedan", Civic: "Sedan", Accord: "Sedan",
  Altima: "Sedan", Malibu: "Sedan", Fusion: "Sedan", Sonata: "Sedan",
  Elantra: "Sedan", Jetta: "Sedan",
  // SUVs
  RAV4: "SUV", "CR-V": "SUV", Equinox: "SUV", Explorer: "SUV",
  Rogue: "SUV", Escape: "SUV", Tucson: "SUV", Pilot: "SUV",
  Highlander: "SUV", Tahoe: "SUV",
  // Pickup Trucks
  "F-150": "Pickup Truck", Silverado: "Pickup Truck", "Ram 1500": "Pickup Truck",
  Tundra: "Pickup Truck", Tacoma: "Pickup Truck", Colorado: "Pickup Truck",
  Ranger: "Pickup Truck", Sierra: "Pickup Truck", Frontier: "Pickup Truck", Ridgeline: "Pickup Truck",
  // Vans
  Odyssey: "Van", Sienna: "Van", Pacifica: "Van", Caravan: "Van",
  Transit: "Van", Sprinter: "Van", Metris: "Van",
  // Motorcycles
  Sportster: "Motorcycle", "Street Glide": "Motorcycle", "Ninja 650": "Motorcycle",
  "CBR500R": "Motorcycle", "R1250GS": "Motorcycle",
};

async function getCityState(zip) {
  const res = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${zip}&components=country:US&key=${GOOGLE_KEY}`
  );
  const data = await res.json();
  if (!data.results || data.results.length === 0) return null;
  const components = data.results[0].address_components;
  const city = components.find((c) => c.types.includes("locality"))?.long_name || "";
  const state = components.find((c) => c.types.includes("administrative_area_level_1"))?.short_name || "";
  return city && state ? `${city}, ${state}` : null;
}

async function fetchMakes() {
  const res = await fetch("https://vpic.nhtsa.dot.gov/api/vehicles/getallmakes?format=json");
  const data = await res.json();
  return data.Results.map((r) => r.Make_Name).sort();
}

async function fetchModels(make) {
  const res = await fetch(
    `https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformake/${encodeURIComponent(make)}?format=json`
  );
  const data = await res.json();
  return data.Results.map((r) => r.Model_Name).sort();
}

async function fetchVehicleImage(make, model) {
  const query = `${make} ${model} car`;
  const res = await fetch(
    `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=1&orientation=landscape`,
    { headers: { Authorization: `Client-ID ${UNSPLASH_KEY}` } }
  );
  const data = await res.json();
  return data.results?.[0]?.urls?.regular || null;
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
  };

  const [formData, setFormData] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [quote, setQuote] = useState(null);

  const [pickupCity, setPickupCity] = useState("");
  const [deliveryCity, setDeliveryCity] = useState("");
  const [zipLoadingPickup, setZipLoadingPickup] = useState(false);
  const [zipLoadingDelivery, setZipLoadingDelivery] = useState(false);

  const [allMakes, setAllMakes] = useState([]);
  const [makeSuggestions, setMakeSuggestions] = useState([]);
  const [makesLoading, setMakesLoading] = useState(false);

  const [allModels, setAllModels] = useState([]);
  const [modelSuggestions, setModelSuggestions] = useState([]);
  const [modelsLoading, setModelsLoading] = useState(false);

  const [vehicleImage, setVehicleImage] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);

  const quoteRef = useRef(null);

  // Load makes on mount
  useEffect(() => {
    setMakesLoading(true);
    fetchMakes().then(setAllMakes).catch(console.error).finally(() => setMakesLoading(false));
  }, []);

  // ZIP → city/state
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

  // Auto quote whenever required fields are ready
  useEffect(() => {
    if (
      formData.pickup.length === 5 &&
      formData.delivery.length === 5 &&
      formData.vehicle &&
      formData.condition &&
      formData.transport
    ) {
      getDistance(formData.pickup, formData.delivery)
        .then((result) => {
          const price = calculateQuote(result.miles, formData.vehicle, formData.condition, formData.transport);
          setQuote({ miles: result.miles, distance: result.distance, duration: result.duration, price });
          setTimeout(() => quoteRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 100);
        })
        .catch(console.error);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.pickup, formData.delivery, formData.vehicle, formData.condition, formData.transport]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleMakeChange = (val) => {
    setFormData((p) => ({ ...p, make: val, model: "", vehicle: "" }));
    setAllModels([]);
    setModelSuggestions([]);
    setVehicleImage(null);
    const filtered = allMakes.filter((m) => m.toLowerCase().startsWith(val.toLowerCase())).slice(0, 8);
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
    const detectedType = MODEL_TO_TYPE[model] || "";
    setFormData((p) => ({ ...p, model, vehicle: detectedType }));
    setModelSuggestions([]);
    if (formData.make && model) {
      setImageLoading(true);
      try {
        const img = await fetchVehicleImage(formData.make, model);
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

    try {
      let quoteData = quote;
      if (!quoteData) {
        const result = await getDistance(formData.pickup, formData.delivery);
        const price = calculateQuote(result.miles, formData.vehicle, formData.condition, formData.transport);
        quoteData = { miles: result.miles, distance: result.distance, duration: result.duration, price };
      }

      await emailjs.send(
        "service_7iyk46o",
        "template_hip0ibn",
        {
          ...formData,
          distance: quoteData.distance,
          miles: quoteData.miles,
          estimated_price: `$${quoteData.price}`,
        },
        "VmOz4fwe7AtHA_Xjf"
      );

      setMessage({ type: "success", text: "✅ Your quote request has been sent successfully!" });
      setFormData(initialForm);
      setQuote(null);
      setPickupCity("");
      setDeliveryCity("");
      setVehicleImage(null);
      setAllModels([]);
    } catch (error) {
      console.error(error);
      setMessage({ type: "error", text: "❌ Something went wrong. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="quote-form" className="max-w-6xl mx-auto px-4 sm:px-6 -mt-10 relative z-10">
      <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8">
        <h2 className="text-3xl font-bold text-center mb-2">
          Get Your Free Car Shipping Quote
        </h2>
        <p className="text-center text-gray-500 mb-8">
          Fast · Safe · Door-to-Door Auto Transport
        </p>

        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">

          {/* ZIP Codes */}
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

          {/* Year */}
          <input
            type="text"
            name="year"
            value={formData.year}
            onChange={handleChange}
            placeholder="Vehicle Year"
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          {/* Make autocomplete */}
          <Autocomplete
            placeholder="Vehicle Make (e.g. Toyota)"
            value={formData.make}
            onChange={handleMakeChange}
            suggestions={makeSuggestions}
            onSelect={handleMakeSelect}
            loading={makesLoading}
          />

          {/* Model autocomplete */}
          <Autocomplete
            placeholder="Vehicle Model (e.g. Camry)"
            value={formData.model}
            onChange={handleModelChange}
            suggestions={modelSuggestions}
            onSelect={handleModelSelect}
            loading={modelsLoading}
          />

          {/* Vehicle Type — auto-detected or manual override */}
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

          {/* Condition */}
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

          {/* Transport */}
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

          {/* Vehicle image preview */}
          {(imageLoading || vehicleImage) && (
            <div className="md:col-span-2 rounded-xl overflow-hidden h-52 bg-gray-100 flex items-center justify-center">
              {imageLoading ? (
                <div className="flex flex-col items-center gap-2 text-gray-400">
                  <Spinner />
                  <span className="text-sm">Loading vehicle image…</span>
                </div>
              ) : (
                <img
                  src={vehicleImage}
                  alt={`${formData.make} ${formData.model}`}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          )}

          {/* Contact */}
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

          {/* Quote card */}
          {quote && (
            <div
              ref={quoteRef}
              className="md:col-span-2 bg-blue-50 border border-blue-200 rounded-xl p-5"
            >
              <h3 className="text-xl font-bold mb-3">Estimated Quote</h3>
              <div className="grid grid-cols-3 gap-3 text-sm text-gray-700 mb-4">
                <div className="bg-white rounded-lg p-3 text-center shadow-sm">
                  <div className="text-xs text-gray-400 uppercase tracking-wide mb-1">Distance</div>
                  <div className="font-semibold">{quote.distance}</div>
                </div>
                <div className="bg-white rounded-lg p-3 text-center shadow-sm">
                  <div className="text-xs text-gray-400 uppercase tracking-wide mb-1">Miles</div>
                  <div className="font-semibold">{quote.miles}</div>
                </div>
                <div className="bg-white rounded-lg p-3 text-center shadow-sm">
                  <div className="text-xs text-gray-400 uppercase tracking-wide mb-1">Transit</div>
                  <div className="font-semibold">{quote.duration}</div>
                </div>
              </div>
              <p className="text-3xl font-bold text-blue-700">${quote.price}</p>
              <p className="text-sm text-gray-500 mt-1">
                Final price may vary slightly depending on carrier availability.
              </p>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`md:col-span-2 py-3 rounded-lg font-bold text-white transition-colors ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Sending…" : "Get My Free Quote"}
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
      </div>
    </section>
  );
}