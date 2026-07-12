export default function FloatingButtons() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4">

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
        className="bg-orange-500 hover:bg-orange-600 text-white rounded-full shadow-2xl px-6 py-4 font-bold flex items-center justify-center gap-3 transition duration-300 hover:scale-105 whitespace-nowrap"
      >
        🚗 Get Quote
      </a>

    </div>
  );
}