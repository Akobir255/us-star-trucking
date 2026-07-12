function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300">

      <div className="max-w-7xl mx-auto px-6 py-20">

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Company */}

          <div>
            <h2 className="text-3xl font-bold text-white mb-5">
              US Star Trucking LLC
            </h2>

            <p className="leading-7 text-slate-400">
              Reliable nationwide vehicle shipping with licensed and insured
              carriers. We provide safe, affordable door-to-door auto transport
              across all 50 states.
            </p>

            <div className="flex gap-3 mt-6">
              <span className="bg-blue-600 px-3 py-1 rounded-full text-sm text-white">
                Licensed
              </span>

              <span className="bg-green-600 px-3 py-1 rounded-full text-sm text-white">
                Insured
              </span>
            </div>
          </div>

          {/* Quick Links */}

          <div>

            <h3 className="text-xl font-bold text-white mb-5">
              Quick Links
            </h3>

            <ul className="space-y-3">

              <li>
                <a href="#" className="hover:text-blue-400">
                  Home
                </a>
              </li>

              <li>
                <a href="#quote-form" className="hover:text-blue-400">
                  Free Quote
                </a>
              </li>

              <li>
                <a href="#reviews" className="hover:text-blue-400">
                  Reviews
                </a>
              </li>

              <li>
                <a href="#faq" className="hover:text-blue-400">
                  FAQ
                </a>
              </li>

              <li>
                <a href="#contact" className="hover:text-blue-400">
                  Contact
                </a>
              </li>

            </ul>

          </div>

          {/* Contact */}

          <div>

            <h3 className="text-xl font-bold text-white mb-5">
              Contact
            </h3>

            <p className="mb-3">
              📞 (865) 722-7114
            </p>

            <p className="mb-3">
              📧
              <a
                href="mailto:leo@usstrucking.org"
                className="ml-2 hover:text-blue-400"
              >
                leo@usstrucking.org
              </a>
            </p>

            <p>
              📍 9111 Cross Park Dr
              <br />
              Suite D200 #1013
              <br />
              Knoxville, TN 37923
            </p>

          </div>

          {/* Business */}

          <div>

            <h3 className="text-xl font-bold text-white mb-5">
              Business Information
            </h3>

            <p className="mb-2">
              <strong>USDOT:</strong> 3205543
            </p>

            <p className="mb-2">
              <strong>MC:</strong> 206532
            </p>

            <p className="mb-2">
              Nationwide Auto Transport
            </p>

            <p className="text-green-400 font-semibold mt-5">
              ✓ Fully Licensed & Insured
            </p>

          </div>

        </div>

      </div>

      <div className="border-t border-slate-800">

        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4">

          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} US Star Trucking LLC. All Rights Reserved.
          </p>

          <div className="flex gap-6 text-sm">

            <a href="#" className="hover:text-blue-400">
              Privacy Policy
            </a>

            <a href="#" className="hover:text-blue-400">
              Terms of Service
            </a>

            <a href="#quote-form" className="hover:text-blue-400">
              Get Quote
            </a>

          </div>

        </div>

      </div>

    </footer>
  );
}

export default Footer;