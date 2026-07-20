import { useState } from "react";

const VEHICLE_TYPES = ["Sedan", "SUV", "Pickup Truck", "Van", "Motorcycle"];

const TRUST_ITEMS = [
  "Licensed & Bonded",
  "Fully Insured",
  "Nationwide Service",
  "Free Quotes",
  "Door-to-Door Delivery",
];

function HeroQuoteForm() {
  const [pickup, setPickup] = useState("");
  const [delivery, setDelivery] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (pickup) params.set("pickup", pickup);
    if (delivery) params.set("delivery", delivery);
    if (vehicle) params.set("vehicle", vehicle);
    if (phone) params.set("phone", phone);
    window.location.href = `/?${params.toString()}#quote-form`;
  };

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 text-slate-900">
      <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-1">
        Instant Estimate
      </p>
      <h2 className="text-2xl font-extrabold mb-6">
        Get Your Free Shipping Quote
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="hero-pickup" className="text-sm font-semibold text-gray-700">
              Pickup ZIP
            </label>
            <input
              id="hero-pickup"
              type="text"
              inputMode="numeric"
              maxLength={5}
              placeholder="90001"
              value={pickup}
              onChange={(e) => setPickup(e.target.value.replace(/\D/g, "").slice(0, 5))}
              required
              className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="hero-delivery" className="text-sm font-semibold text-gray-700">
              Delivery ZIP
            </label>
            <input
              id="hero-delivery"
              type="text"
              inputMode="numeric"
              maxLength={5}
              placeholder="33101"
              value={delivery}
              onChange={(e) => setDelivery(e.target.value.replace(/\D/g, "").slice(0, 5))}
              required
              className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="hero-vehicle" className="text-sm font-semibold text-gray-700">
            Vehicle Type
          </label>
          <select
            id="hero-vehicle"
            value={vehicle}
            onChange={(e) => setVehicle(e.target.value)}
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select vehicle type</option>
            {VEHICLE_TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="hero-phone" className="text-sm font-semibold text-gray-700">
            Phone Number
          </label>
          <input
            id="hero-phone"
            type="tel"
            placeholder="(865) 722-7114"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="bg-orange-500 hover:bg-orange-600 transition text-white font-bold py-4 rounded-xl shadow-lg shadow-orange-500/30 mt-2"
        >
          Get My Free Quote →
        </button>
      </form>

      <p className="text-xs text-gray-400 mt-4 text-center">
        No obligation. Takes less than 30 seconds.
      </p>
    </div>
  );
}

function Hero() {
  return (
    <section
      id="home"
      className="bg-gradient-to-br from-[#000919] via-[#001D3F] to-[#04356A] text-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 py-24 lg:py-32 grid lg:grid-cols-2 gap-16 items-center">

        {/* LEFT SIDE */}
        <div>

          <div className="inline-block bg-blue-600/20 text-blue-300 px-4 py-2 rounded-full text-sm font-semibold mb-5">
            🚛 Licensed • Bonded • Insured
          </div>

          {/* Rating row */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-5">
            <span className="text-yellow-400 text-lg tracking-tight">★★★★★</span>
            <span className="font-bold">4.9/5 Average Rating</span>
            <span className="text-slate-400 text-sm">
              Google Reviews · Facebook · BBB
            </span>
          </div>

          <h2 className="text-blue-400 uppercase tracking-[4px] font-bold">
            US Star Trucking LLC
          </h2>

          <h1 className="text-5xl lg:text-7xl font-extrabold leading-tight mt-4">
            Reliable
            <span className="text-blue-500"> Nationwide </span>
            Auto Transport
          </h1>

          <p className="mt-8 text-xl text-slate-300 leading-8">
            Fast, safe, and affordable vehicle shipping anywhere in the United
            States. We're an FMCSA-authorized auto transport broker — we
            arrange your door-to-door shipment with licensed, insured motor
            carriers and manage the process from dispatch through delivery.
          </p>

          {/* Trust checklist */}
          <ul className="flex flex-wrap gap-x-6 gap-y-2 mt-6 text-sm">
            {TRUST_ITEMS.map((item) => (
              <li key={item} className="flex items-center gap-2 text-slate-200 font-semibold">
                <span className="text-green-400" aria-hidden="true">✓</span>
                {item}
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap items-center gap-5 mt-10">

            <a
              href="tel:+18657227114"
              className="flex items-center gap-3 bg-white/10 hover:bg-white/15 border border-white/20 transition px-6 py-4 rounded-xl"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-blue-400 shrink-0" aria-hidden="true"><path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.5 19.5 0 01-6-6A19.8 19.8 0 012.1 4.2 2 2 0 014.1 2h3a2 2 0 012 1.7c.1.9.3 1.8.6 2.7a2 2 0 01-.5 2.1L8 9.7a16 16 0 006.3 6.3l1.2-1.2a2 2 0 012.1-.5c.9.3 1.8.5 2.7.6a2 2 0 011.7 2z"/></svg>
              <div className="leading-tight text-left">
                <p className="text-xl font-extrabold">(865) 722-7114</p>
                <p className="text-xs text-slate-300 font-semibold">Available 7 Days a Week</p>
              </div>
            </a>

          </div>

          <div className="grid grid-cols-2 gap-6 mt-12 text-sm">

            <div className="bg-white/10 rounded-xl p-4">
              <p className="font-bold text-blue-400">USDOT</p>
              <p>3205543</p>
            </div>

            <div className="bg-white/10 rounded-xl p-4">
              <p className="font-bold text-blue-400">MC</p>
              <p>206532</p>
            </div>

            <div className="bg-white/10 rounded-xl p-4">
              <p className="font-bold text-blue-400">Coverage</p>
              <p>Nationwide</p>
            </div>

            <div className="bg-white/10 rounded-xl p-4">
              <p className="font-bold text-blue-400">Service</p>
              <p>Door-to-Door</p>
            </div>

          </div>

        </div>

        {/* RIGHT SIDE — instant quote form */}
        <div>
          <HeroQuoteForm />
        </div>

      </div>
    </section>
  );
}

export default Hero;
