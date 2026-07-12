import { useState, useEffect } from "react";
import logo from "../assets/usstar-logo.jpg";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);
    };

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

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur shadow-lg"
          : "bg-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">

        <div className="flex justify-between items-center h-20">

          {/* Logo */}

          <a href="#" className="flex items-center gap-4">

            <img
              src={logo}
              alt="US Star Trucking"
              className="h-14"
            />

            <div>

              <h1 className="font-bold text-xl text-blue-700">
                US Star Trucking LLC
              </h1>

              <p className="text-sm text-gray-500">
                Nationwide Auto Transport
              </p>

            </div>

          </a>

          {/* Desktop */}

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

          </nav>

          {/* Right */}

          <div className="hidden lg:flex items-center gap-5">

            <a
              href="tel:+18657227114"
              className="font-bold text-blue-700"
            >
              (865) 722-7114
            </a>

            <a
              href="#quote-form"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold transition"
            >
              Get Free Quote
            </a>

          </div>

          {/* Mobile */}

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

            <a
              href="tel:+18657227114"
              className="block text-blue-700 font-bold"
            >
              📞 (865) 722-7114
            </a>

            <a
              href="#quote-form"
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