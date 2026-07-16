function TrustBar() {
  const items = [
    {
      icon: "🛡️",
      title: "Licensed & Insured",
      text: "Professional, fully compliant auto transport.",
    },
    {
      icon: "🚪",
      title: "Door-to-Door Service",
      text: "Convenient pickup and delivery nationwide.",
    },
    {
      icon: "🇺🇸",
      title: "Nationwide Coverage",
      text: "Shipping vehicles across all 50 states.",
    },
    {
      icon: "📋",
      title: "USDOT 3205543 • MC 206532",
      text: "Operating under federal authority.",
    },
  ];

  return (
    <section className="bg-gradient-to-r from-[#054E98] to-[#001D3F] text-white pt-8 pb-24">
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {items.map((item) => (
            <div
              key={item.title}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20 hover:bg-white/20 transition duration-300"
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-blue-100 text-sm">{item.text}</p>
            </div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="border-t border-white/20 pt-6">
          <p className="text-center text-blue-200 text-sm font-semibold uppercase tracking-widest mb-4">
            Verified & Trusted
          </p>
          <div className="flex flex-wrap justify-center items-center gap-6">

            {/* FMCSA */}
            <a
              href="https://safer.fmcsa.dot.gov/query.asp?searchtype=ANY&query_type=queryCarrierSnapshot&query_param=USDOT&query_string=3205543"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl px-5 py-3 flex items-center gap-2 transition"
            >
              <span className="text-2xl">🏛️</span>
              <div>
                <p className="font-bold text-sm">FMCSA</p>
                <p className="text-blue-200 text-xs">Verified Carrier</p>
              </div>
            </a>

            {/* DOT */}
            <a
              href="https://safer.fmcsa.dot.gov/query.asp?searchtype=ANY&query_type=queryCarrierSnapshot&query_param=USDOT&query_string=3205543"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl px-5 py-3 flex items-center gap-2 transition"
            >
              <span className="text-2xl">🚛</span>
              <div>
                <p className="font-bold text-sm">USDOT</p>
                <p className="text-blue-200 text-xs"># 3205543</p>
              </div>
            </a>

            {/* MC Number */}
            <div className="bg-white/10 border border-white/20 rounded-xl px-5 py-3 flex items-center gap-2">
              <span className="text-2xl">📜</span>
              <div>
                <p className="font-bold text-sm">MC Number</p>
                <p className="text-blue-200 text-xs"># 206532</p>
              </div>
            </div>

            {/* BBB */}
            <a
              href="https://www.bbb.org"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl px-5 py-3 flex items-center gap-2 transition"
            >
              <span className="text-2xl">⭐</span>
              <div>
                <p className="font-bold text-sm">BBB</p>
                <p className="text-blue-200 text-xs">Accredited</p>
              </div>
            </a>

            {/* Google Reviews */}
            <div className="bg-white/10 border border-white/20 rounded-xl px-5 py-3 flex items-center gap-2">
              <span className="text-2xl">🌟</span>
              <div>
                <p className="font-bold text-sm">Google</p>
                <p className="text-blue-200 text-xs">5★ Rated</p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

export default TrustBar;