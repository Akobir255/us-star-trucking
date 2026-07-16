import { useState, useEffect, useRef } from "react";
import logo from "../assets/usstar-logo.webp";
import { STATES } from "../data/states";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [statesOpen, setStatesOpen] = useState(false);
  const [bannerVisible, setBannerVisible] = useState(true);

  const statesRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the Ship To dropdown on Escape or when clicking outside it
  useEffect(() => {
    if (!statesOpen) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") setStatesOpen(false);
    };
    const onClickOutside = (e) => {
      if (statesRef.current && !statesRef.current.contains(e.target)) {
        setStatesOpen(false);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onClickOutside);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onClickOutside);
    };
  }, [statesOpen]);

  const links = [
    { name: "Services", href: "#services" },
    { name: "How It Works", href: "#how-it-works" },
    { name: "Special Offers", href: "#promotions", accent: true },
    { name: "FAQ", href: "#faq" },
    { name: "Contact", href: "#contact" },
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

      <div className="w-full px-4 sm:px-6">
        <div className="flex items-center justify-between h-20 gap-6">

          {/* Left: brand (links home) */}
          <a href="/" className="flex items-center gap-3 shrink-0">
            <img src={logo} alt="US Star Trucking logo" width="64" height="48" className="h-12 w-auto rounded-lg" />
            <div>
              <span className={`block font-bold text-lg leading-tight ${scrolled ? "text-blue-700" : "text-white"}`}>
                US Star Trucking LLC
              </span>
              <p className={`text-xs ${scrolled ? "text-gray-500" : "text-blue-300"}`}>
                Nationwide Auto Transport
              </p>
            </div>
          </a>

          {/* Center: plain text links */}
          <nav aria-label="Main navigation" className="hidden lg:flex items-center gap-7">
            {links.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`font-semibold text-sm whitespace-nowrap transition ${
                  item.accent
                    ? scrolled
                      ? "text-green-600 hover:text-green-700"
                      : "text-green-300 hover:text-green-200"
                    : scrolled
                    ? "text-gray-700 hover:text-blue-700"
                    : "text-blue-100 hover:text-white"
                }`}
              >
                {item.name}
              </a>
            ))}

            <div className="relative" ref={statesRef}>
              <button
                onClick={() => setStatesOpen(!statesOpen)}
                aria-expanded={statesOpen}
                aria-haspopup="true"
                aria-controls="states-menu"
                className={`font-semibold text-sm flex items-center gap-1 whitespace-nowrap transition ${
                  scrolled
                    ? "text-gray-700 hover:text-blue-700"
                    : "text-blue-100 hover:text-white"
                }`}
              >
                Ship To
                <span className="text-[10px]" aria-hidden="true">{statesOpen ? "▲" : "▼"}</span>
              </button>

              {statesOpen && (
                <div id="states-menu" className="absolute top-10 left-1/2 -translate-x-1/2 bg-white border border-gray-200 rounded-2xl shadow-xl p-4 w-64 z-50">
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
          </nav>

          {/* Right: the only two buttons */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <a
              href="/track"
              className={`font-bold px-4 py-2 rounded-xl text-sm transition whitespace-nowrap border ${
                scrolled
                  ? "text-blue-700 border-blue-200 hover:bg-blue-50"
                  : "text-white border-white/30 hover:bg-white/10"
              }`}
            >
              Track Shipment
            </a>
            <a
              href="#quote-form"
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl font-bold text-sm transition whitespace-nowrap"
            >
              Get Free Quote
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`lg:hidden text-3xl ${scrolled ? "text-slate-900" : "text-white"}`}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <span aria-hidden="true">{menuOpen ? "✕" : "☰"}</span>
          </button>

        </div>

        {menuOpen && (
          <nav id="mobile-menu" aria-label="Mobile navigation" className={`lg:hidden border-t py-5 space-y-3 ${scrolled ? "border-gray-200" : "border-white/20"}`}>
            {links.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className={`block font-semibold px-4 py-2 rounded-lg transition ${
                  item.accent
                    ? "text-green-700 bg-green-50"
                    : scrolled
                    ? "text-gray-800 bg-gray-100"
                    : "text-white bg-white/15"
                }`}
              >
                {item.name}
              </a>
            ))}

            <div className="border border-blue-200 rounded-xl p-4 bg-blue-50">
              <p className="font-bold text-blue-700 mb-3">Ship To</p>
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

            <a href="tel:+18657227114" className="block text-blue-700 font-bold px-4 py-2">
              (865) 722-7114
            </a>
            <a
              href="/track"
              onClick={() => setMenuOpen(false)}
              className={`block font-bold text-center rounded-xl py-3 border ${
                scrolled ? "text-blue-700 border-blue-200" : "text-white border-white/30"
              }`}
            >
              Track Shipment
            </a>
            <a
              href="#quote-form"
              onClick={() => setMenuOpen(false)}
              className="block bg-blue-600 text-white text-center rounded-xl py-3 font-bold"
            >
              Get Free Quote
            </a>
          </nav>
        )}

      </div>
    </header>
  );
}

export default Navbar;