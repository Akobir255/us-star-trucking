import { useState, useEffect } from "react";
import logo from "../assets/usstar-logo.webp";
import { STATES } from "../data/states";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [offersOpen, setOffersOpen] = useState(false);
  const [statesOpen, setStatesOpen] = useState(false);
  const [bannerVisible, setBannerVisible] = useState(true);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { name: "Home", href: "#" },
    { name: "Services", href: "#services" },
    { name: "How It Works", href: "#how-it-works" },
    { name: "FAQ", href: "#faq" },
    { name: "Contact", href: "#contact" },
  ];

  const offers = [
    { code: "USSTAR50", label: "First Shipment", discount: "$50 off" },
    { code: "USSTAR100", label: "Second Shipment", discount: "$100 off" },
    { code: "REFER50", label: "Refer a Friend", discount: "$50 off" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-lg" : "bg-slate-900"
      }`}
    >
      {/* Announcement banner — stacked above the nav inside the same fixed header */}
      {bannerVisible && (
        <div className="bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 text-white text-sm py-2 px-4 flex items-center justify-center gap-3">
          <span className="animate-pulse">🎉</span>
          <span className="font-semibold">
            First shipment <strong>$50 off</strong> — use code{" "}
            <a href="/?promo=USSTAR50#quote-form" className="bg-white text-blue-600 font-bold px-2 py-0.5 rounded-full font-mono hover:bg-yellow-300 hover:scale-105 transition inline-block" title="Click to apply this code">USSTAR50</a>
            {" "}· Second shipment <strong>$100 off</strong> — use code{" "}
            <a href="/?promo=USSTAR100#quote-form" className="bg-white text-blue-600 font-bold px-2 py-0.5 rounded-full font-mono hover:bg-yellow-300 hover:scale-105 transition inline-block" title="Click to apply this code">USSTAR100</a>
          </span>
          <button
            onClick={() => setBannerVisible(false)}
            aria-label="Close announcement"
            className="ml-4 text-white/70 hover:text-white text-lg font-bold"
          >
            ✕
          </button>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-20">

          <a href="#" className="flex items-center gap-3">
            <img src={logo} alt="US Star Trucking" className="h-12 rounded-lg" />
            <div>
              <h1 className={`font-bold text-lg ${scrolled ? "text-blue-700" : "text-white"}`}>
                US Star Trucking LLC
              </h1>
              <p className={`text-xs ${scrolled ? "text-gray-500" : "text-blue-300"}`}>
                Nationwide Auto Transport
              </p>
            </div>
          </a>

          <nav className="hidden lg:flex items-center gap-2 flex-1 justify-start pl-6">
            {links.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`font-semibold px-3 py-2 rounded-lg transition text-sm whitespace-nowrap ${
                  scrolled
                    ? "text-gray-800 bg-gray-100 hover:bg-blue-600 hover:text-white"
                    : "text-white bg-white/15 hover:bg-white/30"
                }`}
              >
                {item.name}
              </a>
            ))}

            <div className="relative">
              <button
                onClick={() => { setStatesOpen(!statesOpen); setOffersOpen(false); }}
                className={`font-semibold px-3 py-2 rounded-lg transition text-sm flex items-center gap-1 whitespace-nowrap ${
                  scrolled
                    ? "text-gray-800 bg-gray-100 hover:bg-blue-600 hover:text-white"
                    : "text-white bg-white/15 hover:bg-white/30"
                }`}
              >
                📍 Ship To
                <span className="text-xs">{statesOpen ? "▲" : "▼"}</span>
              </button>

              {statesOpen && (
                <div className="absolute top-12 left-0 bg-white border border-gray-200 rounded-2xl shadow-xl p-4 w-64 z-50">
                  <p className="text-xs text-gray-500 mb-3 font-semibold uppercase tracking-wide">
                    Popular Destinations
                  </p>
                  <div className="grid grid-cols-2 gap-1">
                    {STATES.map((s) => (
                      <a
                        key={s.slug}
                        href={`/car-shipping-${s.slug}`}
                        className="px-3 py-2 rounded-lg text-sm font-semibold text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition"
                      >
                        {s.name}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="relative">
              <button
                onClick={() => { setOffersOpen(!offersOpen); setStatesOpen(false); }}
                className={`font-semibold px-3 py-2 rounded-lg transition text-sm flex items-center gap-1 whitespace-nowrap ${
                  scrolled
                    ? "text-green-700 bg-green-100 hover:bg-green-600 hover:text-white"
                    : "text-green-300 bg-green-500/20 hover:bg-green-500/40"
                }`}
              >
                🎁 Special Offers
                <span className="text-xs">{offersOpen ? "▲" : "▼"}</span>
              </button>

              {offersOpen && (
                <div className="absolute top-12 left-0 bg-white border border-gray-200 rounded-2xl shadow-xl p-4 w-72 z-50">
                  <p className="text-xs text-gray-500 mb-3 font-semibold uppercase tracking-wide">
                    Current Promotions
                  </p>
                  {offers.map((offer) => (
                    <a
                      key={offer.code}
                      href="#promotions"
                      onClick={() => setOffersOpen(false)}
                      className="flex items-center justify-between p-3 rounded-xl hover:bg-green-50 transition mb-1"
                    >
                      <div>
                        <p className="font-semibold text-gray-800 text-sm">{offer.label}</p>
                        <p className="text-xs text-gray-500 font-mono">{offer.code}</p>
                      </div>
                      <span className="text-green-600 font-bold text-sm">{offer.discount}</span>
                    </a>
                  ))}
                  <a
                    href="#quote-form"
                    onClick={() => setOffersOpen(false)}
                    className="block mt-3 bg-green-600 hover:bg-green-700 text-white text-center py-2 rounded-xl font-bold text-sm transition"
                  >
                    Get My Discount Now
                  </a>
                </div>
              )}
            </div>
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <a
              href="/track"
              className={`font-bold px-3 py-2 rounded-lg text-sm transition flex items-center gap-1.5 whitespace-nowrap ${
                scrolled
                  ? "text-blue-700 bg-blue-50 hover:bg-blue-100"
                  : "text-white bg-white/15 hover:bg-white/30"
              }`}
            >
              📦 Track Shipment
            </a>
            <a
              href="#quote-form"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl font-bold text-sm transition whitespace-nowrap"
            >
              Get Free Quote
            </a>
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`lg:hidden text-3xl ${scrolled ? "text-slate-900" : "text-white"}`}
          >
            ☰
          </button>

        </div>

        {menuOpen && (
          <div className={`lg:hidden border-t py-5 space-y-3 ${scrolled ? "border-gray-200" : "border-white/20"}`}>
            {links.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className={`block font-semibold px-4 py-2 rounded-lg transition ${
                  scrolled ? "text-gray-800 bg-gray-100" : "text-white bg-white/15"
                }`}
              >
                {item.name}
              </a>
            ))}

            <div className="border border-blue-200 rounded-xl p-4 bg-blue-50">
              <p className="font-bold text-blue-700 mb-3">📍 Ship To</p>
              <div className="grid grid-cols-2 gap-1">
                {STATES.map((s) => (
                  <a
                    key={s.slug}
                    href={`/car-shipping-${s.slug}`}
                    onClick={() => setMenuOpen(false)}
                    className="px-2 py-1.5 rounded-lg text-sm font-semibold text-gray-700 hover:bg-blue-100"
                  >
                    {s.name}
                  </a>
                ))}
              </div>
            </div>

            <div className="border border-green-200 rounded-xl p-4 bg-green-50">
              <p className="font-bold text-green-700 mb-3">🎁 Special Offers</p>
              {offers.map((offer) => (
                <div key={offer.code} className="flex justify-between items-center mb-2">
                  <div>
                    <p className="text-sm font-semibold text-gray-700">{offer.label}</p>
                    <p className="text-xs font-mono text-gray-500">{offer.code}</p>
                  </div>
                  <span className="text-green-600 font-bold text-sm">{offer.discount}</span>
                </div>
              ))}
            </div>

            <a href="tel:+18657227114" className="block text-blue-700 font-bold px-4 py-2">
              📞 (865) 722-7114
            </a>
            <a
              href="/track"
              onClick={() => setMenuOpen(false)}
              className="block text-blue-700 font-bold px-4 py-2"
            >
              📦 Track Shipment
            </a>
            <a
              href="#quote-form"
              onClick={() => setMenuOpen(false)}
              className="block bg-blue-600 text-white text-center rounded-xl py-3 font-bold"
            >
              Get Free Quote
            </a>
          </div>
        )}

      </div>
    </header>
  );
}

export default Navbar;