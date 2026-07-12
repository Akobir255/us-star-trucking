import heroImage from "../assets/hero.jpg";

function Hero() {
  const scrollToQuote = () => {
    const section = document.getElementById("quote-form");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="bg-gradient-to-br from-slate-950 via-slate-900 to-blue-900 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 py-24 lg:py-32 grid lg:grid-cols-2 gap-16 items-center">

        {/* LEFT SIDE */}
        <div>

          <div className="inline-block bg-blue-600/20 text-blue-300 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            🚛 Licensed • Bonded • Insured
          </div>

          <h2 className="text-blue-400 uppercase tracking-[4px] font-bold">
            CarShippingService.org
          </h2>

          <p className="mt-2 text-slate-300 text-lg">
            Powered by US Star Trucking LLC
          </p>

          <h1 className="text-5xl lg:text-7xl font-extrabold leading-tight mt-6">
            Nationwide
            <span className="text-blue-500"> Car Shipping </span>
            You Can Trust
          </h1>

          <p className="mt-8 text-xl text-slate-300 leading-8">
            Ship your vehicle anywhere in the United States with licensed and
            insured carriers. We provide fast quotes, competitive pricing,
            door-to-door delivery, and dependable customer service from pickup
            to delivery.
          </p>

          <div className="flex flex-wrap gap-4 mt-10">

            <button
              onClick={scrollToQuote}
              className="bg-blue-600 hover:bg-blue-700 transition px-8 py-4 rounded-xl font-bold shadow-xl"
            >
              🚗 Get My Free Quote
            </button>

            <a
              href="tel:+18657227114"
              className="border border-white px-8 py-4 rounded-xl hover:bg-white hover:text-slate-900 transition font-semibold"
            >
              📞 (865) 722-7114
            </a>

          </div>

          {/* Trust Badges */}

          <div className="flex flex-wrap gap-3 mt-8">

            <span className="bg-green-600 px-4 py-2 rounded-full text-sm font-semibold">
              ✓ Licensed & Insured
            </span>

            <span className="bg-blue-600 px-4 py-2 rounded-full text-sm font-semibold">
              ✓ Door-to-Door
            </span>

            <span className="bg-indigo-600 px-4 py-2 rounded-full text-sm font-semibold">
              ✓ Open & Enclosed
            </span>

            <span className="bg-slate-700 px-4 py-2 rounded-full text-sm font-semibold">
              ✓ Nationwide
            </span>

            <span className="bg-orange-600 px-4 py-2 rounded-full text-sm font-semibold">
              ✓ Free Quotes
            </span>

          </div>

          {/* Stats */}

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 mt-12 text-sm">

            <div className="bg-white/10 rounded-xl p-4">
              <p className="font-bold text-blue-400">USDOT</p>
              <p>3205543</p>
            </div>

            <div className="bg-white/10 rounded-xl p-4">
              <p className="font-bold text-blue-400">MC</p>
              <p>206532</p>
            </div>

            <div className="bg-white/10 rounded-xl p-4">
              <p className="font-bold text-blue-400">Coverage</p>
              <p>Nationwide</p>
            </div>

            <div className="bg-white/10 rounded-xl p-4">
              <p className="font-bold text-blue-400">Service</p>
              <p>Door-to-Door</p>
            </div>

            <div className="bg-white/10 rounded-xl p-4">
              <p className="font-bold text-blue-400">Transport</p>
              <p>Open & Enclosed</p>
            </div>

            <div className="bg-white/10 rounded-xl p-4">
              <p className="font-bold text-blue-400">Quotes</p>
              <p>100% Free</p>
            </div>

          </div>

        </div>

        {/* RIGHT SIDE */}

        <div className="relative">

          <img
            src={heroImage}
            alt="Nationwide Car Shipping"
            className="rounded-3xl shadow-2xl"
          />

          <div className="absolute -bottom-6 left-6 bg-white text-slate-900 rounded-2xl p-6 shadow-2xl max-w-xs">

            <p className="text-3xl font-extrabold text-yellow-500">
              ★★★★★
            </p>

            <p className="font-bold mt-2 text-lg">
              Trusted Nationwide Auto Transport
            </p>

            <p className="text-sm text-slate-600 mt-2">
              Licensed • Insured • Door-to-Door Delivery
            </p>

          </div>

        </div>

      </div>
    </section>
  );
}

export default Hero;