const SHIPMENTS = [
  { emoji: "🚗", vehicle: "Tesla Model Y", from: "Miami, FL", to: "Dallas, TX" },
  { emoji: "🛻", vehicle: "Ford F-150", from: "Phoenix, AZ", to: "Chicago, IL" },
  { emoji: "🚙", vehicle: "BMW X5", from: "Seattle, WA", to: "Denver, CO" },
  { emoji: "🚗", vehicle: "Honda Accord", from: "Atlanta, GA", to: "Boston, MA" },
  { emoji: "🚙", vehicle: "Jeep Grand Cherokee", from: "Los Angeles, CA", to: "Houston, TX" },
  { emoji: "🏍️", vehicle: "Harley-Davidson Street Glide", from: "Nashville, TN", to: "Orlando, FL" },
];

function RecentShipments() {
  return (
    <section className="bg-gradient-to-r from-[#04356A] to-[#001D3F] text-white py-16">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-green-500/20 text-green-300 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400"></span>
            </span>
            Shipping Nationwide Right Now
          </div>
          <h2 className="text-4xl font-extrabold">Recent Shipments</h2>
          <p className="mt-3 text-blue-100">
            A few of the vehicles we've moved across the country recently.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SHIPMENTS.map((s, i) => (
            <div
              key={i}
              className="flex items-center gap-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-5 hover:bg-white/20 transition duration-300"
            >
              <span className="text-3xl shrink-0" aria-hidden="true">{s.emoji}</span>
              <div className="leading-tight">
                <p className="font-bold">{s.vehicle}</p>
                <p className="text-blue-200 text-sm">{s.from} → {s.to}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default RecentShipments;
