import { useState } from "react";

export default function FloatingButtons() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">

      {/* Collapsible buttons */}
      <div className={`flex flex-col gap-3 transition-all duration-300 ${open ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-4 pointer-events-none"}`}>

        {/* Call */}
        <a
          href="tel:+18657227114"
          className="bg-green-600 hover:bg-green-700 text-white rounded-full shadow-2xl px-6 py-4 font-bold flex items-center justify-center gap-3 transition duration-300 hover:scale-105 whitespace-nowrap"
        >
          📞 Call Now
        </a>

        {/* Email */}
        <a
          href="mailto:leo@usstrucking.org"
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-2xl px-6 py-4 font-bold flex items-center justify-center gap-3 transition duration-300 hover:scale-105 whitespace-nowrap"
        >
          ✉️ Email
        </a>

        {/* Quote */}
        <a
          href="#quote-form"
          onClick={() => setOpen(false)}
          className="bg-orange-500 hover:bg-orange-600 text-white rounded-full shadow-2xl px-6 py-4 font-bold flex items-center justify-center gap-3 transition duration-300 hover:scale-105 whitespace-nowrap"
        >
          🚗 Get Quote
        </a>

      </div>

      {/* Toggle button */}
      <button
        onClick={() => setOpen(!open)}
        className="bg-slate-900 hover:bg-slate-700 text-white rounded-full shadow-2xl w-14 h-14 flex items-center justify-center text-2xl transition duration-300 hover:scale-105"
      >
        {open ? "✕" : "💬"}
      </button>

    </div>
  );
}
