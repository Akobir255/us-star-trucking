import heroImage from "../assets/hero.jpg";

function Hero() {
  const scrollToQuote = () => {
    const section = document.getElementById("quote-form");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="bg-gradient-to-br from-[#000919] via-[#001D3F] to-[#04356A] text-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 py-24 lg:py-32 grid lg:grid-cols-2 gap-16 items-center">

        {/* LEFT SIDE */}
        <div>

          <div className="inline-block bg-blue-600/20 text-blue-300 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            🚛 Licensed • Bonded • Insured
          </div>

          <h2 className="text-blue-400 uppercase tracking-[4px] font-bold">
            US Star Trucking LLC
          </h2>

          <h1 className="text-5xl lg:text-7xl font-extrabold leading-tight mt-4">
            Reliable
            <span className="text-blue-500"> Nationwide </span>
            Auto Transport
          </h1>

          <p className="mt-8 text-xl text-slate-300 leading-8">
            Fast, safe, and affordable vehicle shipping anywhere in the United
            States. We provide door-to-door transport backed by licensed,
            insured, and experienced carriers you can trust.
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
              📞 Call (865) 722-7114
            </a>

          </div>

          <div className="grid grid-cols-2 gap-6 mt-12 text-sm">

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

          </div>

        </div>

        {/* RIGHT SIDE */}

        <div className="relative">

          <img
            src={heroImage}
            alt="US Star Trucking Auto Transport"
            className="rounded-3xl shadow-2xl"
          />

          <div className="absolute -bottom-6 left-6 bg-white text-slate-900 rounded-2xl p-6 shadow-2xl">

            <p className="text-3xl font-extrabold text-blue-600">
              ⭐⭐⭐⭐⭐
            </p>

            <p className="font-bold mt-2">
              Trusted Nationwide Vehicle Transport
            </p>

            <p className="text-sm text-slate-600">
              Safe • Secure • Fast Delivery
            </p>

          </div>

        </div>

      </div>
    </section>
  );
}

export default Hero;