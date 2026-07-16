function Promotions() {
  return (
    <section id="promotions" className="bg-[#000919] text-white py-24">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">
          <h2 className="text-5xl font-extrabold">Special Offers</h2>
          <p className="mt-5 text-xl text-slate-300 max-w-2xl mx-auto">
            Save on every shipment — the more you ship, the more you save.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">

          <div className="bg-[#001D3F] rounded-3xl p-8 shadow-xl text-center">
            <div className="inline-block bg-green-900 text-green-300 text-sm font-bold px-4 py-1 rounded-full mb-5">
              First Shipment
            </div>
            <div className="text-5xl font-extrabold text-white mb-2">$50 off</div>
            <p className="text-slate-400 mb-4">Book your first shipment and save $50 instantly on any route nationwide.</p>
            <div className="bg-[#000919] rounded-xl px-4 py-2 text-blue-400 font-mono text-sm mb-5">
              Code: USSTAR50
            </div>
            <a
              href="/?promo=USSTAR50#quote-form"
              className="block bg-[#0A6ED3] hover:bg-blue-500 text-white font-bold py-3 rounded-xl transition"
            >
              Use This Code →
            </a>
          </div>

          <div className="bg-[#001D3F] rounded-3xl p-8 shadow-xl text-center">
            <div className="inline-block bg-blue-900 text-blue-300 text-sm font-bold px-4 py-1 rounded-full mb-5">
              Second Shipment
            </div>
            <div className="text-5xl font-extrabold text-white mb-2">$100 off</div>
            <p className="text-slate-400 mb-4">Come back for your second shipment and we'll take $100 off your order.</p>
            <div className="bg-[#000919] rounded-xl px-4 py-2 text-blue-400 font-mono text-sm mb-5">
              Code: USSTAR100
            </div>
            <a
              href="/?promo=USSTAR100#quote-form"
              className="block bg-[#0A6ED3] hover:bg-blue-500 text-white font-bold py-3 rounded-xl transition"
            >
              Use This Code →
            </a>
          </div>

          <div className="bg-[#001D3F] rounded-3xl p-8 shadow-xl text-center">
            <div className="inline-block bg-amber-900 text-amber-300 text-sm font-bold px-4 py-1 rounded-full mb-5">
              Refer a Friend
            </div>
            <div className="text-5xl font-extrabold text-white mb-2">$50 off</div>
            <p className="text-slate-400 mb-4">Send a friend our way and earn $50 off your next shipment when they book.</p>
            <div className="bg-[#000919] rounded-xl px-4 py-2 text-blue-400 font-mono text-sm mb-5">
              Code: REFER50
            </div>
            <a
              href="/?promo=REFER50#quote-form"
              className="block bg-[#0A6ED3] hover:bg-blue-500 text-white font-bold py-3 rounded-xl transition"
            >
              Use This Code →
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Promotions;