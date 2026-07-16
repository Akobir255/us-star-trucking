import { STATES } from "../data/states";
import { SERVICES } from "../data/services";

function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300">

      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">

          <div>
            <h2 className="text-3xl font-bold text-white mb-5">US Star Trucking LLC</h2>
            <p className="leading-7 text-slate-400">
              Reliable nationwide vehicle shipping with licensed and insured
              carriers. Safe, affordable door-to-door auto transport across all 50 states.
            </p>
            <div className="flex gap-3 mt-6">
              <span className="bg-blue-600 px-3 py-1 rounded-full text-sm text-white">Licensed</span>
              <span className="bg-green-600 px-3 py-1 rounded-full text-sm text-white">Insured</span>
            </div>

            {/* Social Media */}
            <div className="flex gap-3 mt-6">
              <a
                href="https://www.facebook.com/groups/carshipment"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 hover:bg-blue-700 text-white w-10 h-10 rounded-full flex items-center justify-center text-lg transition"
                title="Facebook"
              >
                f
              </a>
              <a
                href="https://www.instagram.com/usstartrucking/?hl=en"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-br from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white w-10 h-10 rounded-full flex items-center justify-center text-lg transition"
                title="Instagram"
              >
                📷
              </a>
              <a
                href="https://www.linkedin.com/company/usstartruckingllc"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-700 hover:bg-blue-800 text-white w-10 h-10 rounded-full flex items-center justify-center text-lg transition"
                title="LinkedIn"
              >
                in
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-white mb-5">Quick Links</h3>
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-blue-400">Home</a></li>
              <li><a href="#quote-form" className="hover:text-blue-400">Free Quote</a></li>
              <li><a href="/track" className="hover:text-blue-400"> Track Shipment</a></li>
              <li><a href="/blog" className="hover:text-blue-400">📰 Blog & Guides</a></li>
              <li><a href="#services" className="hover:text-blue-400">Services</a></li>
              <li><a href="#reviews" className="hover:text-blue-400">Reviews</a></li>
              <li><a href="#faq" className="hover:text-blue-400">FAQ</a></li>
              <li><a href="#contact" className="hover:text-blue-400">Contact</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold text-white mb-5">Contact</h3>
            <p className="mb-3">
              📞{" "}
              <a href="tel:+18657227114" className="hover:text-blue-400 font-semibold">
                (865) 722-7114
              </a>
            </p>
            <p className="mb-3">
              📧{" "}
              <a href="mailto:leo@usstrucking.org" className="hover:text-blue-400">
                leo@usstrucking.org
              </a>
            </p>
            <p>
              📍 9111 Cross Park Dr<br />
              Suite D200 #1013<br />
              Knoxville, TN 37923
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold text-white mb-5">Business Information</h3>
            <p className="mb-2"><strong>USDOT:</strong> 3205543</p>
            <p className="mb-2"><strong>MC:</strong> 206532</p>
            <p className="mb-2">Nationwide Auto Transport</p>
            <p className="text-green-400 font-semibold mt-3">✓ Licensed & Bonded Property Broker</p>
            <p className="text-slate-400 text-sm mt-2">We arrange your shipment with independent, insured motor carriers.</p>
            <div className="mt-5 space-y-2">
              <a
                href="https://safer.fmcsa.dot.gov/query.asp?searchtype=ANY&query_type=queryCarrierSnapshot&query_param=USDOT&query_string=3205543"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-blue-400 hover:text-blue-300 text-sm"
              >
                🏛️ Verify FMCSA License →
              </a>
              <a
                href="https://www.facebook.com/groups/carshipment"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-blue-400 hover:text-blue-300 text-sm"
              >
                👥 Join our Facebook Group →
              </a>
            </div>
          </div>

        </div>

        {/* Popular shipping destinations — state SEO pages */}
        <div className="mt-14 pt-10 border-t border-slate-800">
          <h3 className="text-xl font-bold text-white mb-5">Our Services</h3>
          <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm mb-10">
            {SERVICES.map((s) => (
              <a
                key={s.slug}
                href={`/${s.slug}`}
                className="hover:text-blue-400 transition"
              >
                {s.emoji} {s.name}
              </a>
            ))}
          </div>

          <h3 className="text-xl font-bold text-white mb-5">Popular Shipping Destinations</h3>
          <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm">
            {STATES.map((s) => (
              <a
                key={s.slug}
                href={`/car-shipping-${s.slug}`}
                className="hover:text-blue-400 transition"
              >
                Car Shipping to {s.name}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} US Star Trucking LLC. All Rights Reserved.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <a href="/privacy-policy" className="hover:text-blue-400 transition">
              Privacy Policy
            </a>
            <a href="/terms" className="hover:text-blue-400 transition">
              Terms & Conditions
            </a>
            <button
              onClick={() => {
                localStorage.removeItem("cookieConsent");
                window.location.reload();
              }}
              className="hover:text-blue-400 transition"
            >
              Cookie Preferences
            </button>
            <a href="/#quote-form" className="hover:text-blue-400">Get Quote</a>
          </div>
        </div>
      </div>

    </footer>
  );
}

export default Footer;