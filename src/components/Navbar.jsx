import { useState, useEffect } from "react";
import logo from "../assets/usstar-logo.jpg";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [offersOpen, setOffersOpen] = useState(false);

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
        scrolled ? "bg-white/95 backdrop-blur shadow-lg" : "bg-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-20">

          <a href="#" className="flex items-center gap-4">
            <img src={logo} alt="US Star Trucking" className="h-14" />
            <div>
              <h1 className="font-bold text-xl text-blue-700">US Star Trucking LLC</h1>
              <p className="text-sm text-gray-500">Nationwide Auto Transport</p>
            </div>
          </a>

          <nav className="hidden lg:flex items-center gap-8">
            {links.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="font-medium text-gray-700 hover:text-blue-700 transition"
              >
                {item.name}
              </a>
            ))}

            <div className="relative">
              <button
                onClick={() => setOffersOpen(!offersOpen)}
                className="font-medium text-green-600 hover:text-green-700 transition flex items-center gap-1"
              >
                🎁 Special Offers
                <span className="text-xs">{offersOpen ? "▲" : "▼"}</span>
              </button>

              {offersOpen && (
                <div className="absolute top-10 left-0 bg-white border border-gray-200 rounded-2xl shadow-xl p-4 w-72 z-50">
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

          <div className="hidden lg:flex items-center gap-5">
            <a href="tel:+18657227114" className="font-bold text-blue-700">
              (865) 722-7114
            </a>
            <a
              href="#quote-form"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold transition"
            >
              Get Free Quote
            </a>
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden text-3xl"
          >
            ☰
          </button>

        </div>

        {menuOpen && (
          <div className="lg:hidden border-t py-5 space-y-4">
            {links.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="block font-medium"
              >
                {item.name}
              </a>
            ))}

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

            <a href="tel:+18657227114" className="block text-blue-700 font-bold">
              📞 (865) 722-7114
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
