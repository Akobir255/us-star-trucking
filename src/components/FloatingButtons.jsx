export default function FloatingButtons() {
  return (
    <>
      <style>{`
        @keyframes pulse-green {
          0%, 100% { background-color: #16a34a; box-shadow: 0 0 0 0 rgba(22, 163, 74, 0.7); }
          50% { background-color: #15803d; box-shadow: 0 0 0 10px rgba(22, 163, 74, 0); }
        }
        @keyframes pulse-blue {
          0%, 100% { background-color: #2563eb; box-shadow: 0 0 0 0 rgba(37, 99, 235, 0.7); }
          50% { background-color: #1d4ed8; box-shadow: 0 0 0 10px rgba(37, 99, 235, 0); }
        }
        @keyframes pulse-orange {
          0%, 100% { background-color: #f97316; box-shadow: 0 0 0 0 rgba(249, 115, 22, 0.7); }
          50% { background-color: #ea580c; box-shadow: 0 0 0 10px rgba(249, 115, 22, 0); }
        }
        .btn-green { animation: pulse-green 2s infinite; }
        .btn-blue { animation: pulse-blue 2s infinite; animation-delay: 0.4s; }
        .btn-orange { animation: pulse-orange 2s infinite; animation-delay: 0.8s; }
      `}</style>

      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4">

        {/* Call */}
        <a
          href="tel:+18657227114"
          className="btn-green text-white rounded-full shadow-2xl px-6 py-4 font-bold flex items-center justify-center gap-3 transition duration-300 hover:scale-105 whitespace-nowrap"
        >
          📞 Call Now
        </a>

        {/* Email */}
        <a
          href="mailto:leo@usstrucking.org"
          className="btn-blue text-white rounded-full shadow-2xl px-6 py-4 font-bold flex items-center justify-center gap-3 transition duration-300 hover:scale-105 whitespace-nowrap"
        >
          ✉️ Email
        </a>

        {/* Quote */}
        <a
          href="#quote-form"
          className="btn-orange text-white rounded-full shadow-2xl px-6 py-4 font-bold flex items-center justify-center gap-3 transition duration-300 hover:scale-105 whitespace-nowrap"
        >
          🚗 Get Quote
        </a>

      </div>
    </>
  );
}
