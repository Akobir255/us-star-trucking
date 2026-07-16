function WhyChooseUs() {
  const reasons = [
    {
      icon: "🛡️",
      title: "Licensed, Bonded & Insured",
      description:
        "Every shipment is handled by fully licensed FMCSA-compliant carriers with cargo insurance for complete peace of mind.",
      gradient: "from-blue-500 to-blue-700",
    },
    {
      icon: "🚚",
      title: "Door-to-Door Delivery",
      description:
        "We pick up and deliver your vehicle as close to your preferred locations as safely possible.",
      gradient: "from-purple-500 to-purple-700",
    },
    {
      icon: "💰",
      title: "Transparent Pricing",
      description:
        "No hidden fees. No surprise charges. Get competitive pricing with an instant online estimate.",
      gradient: "from-green-500 to-green-700",
    },
    {
      icon: "📍",
      title: "Nationwide Coverage",
      description:
        "We transport cars, SUVs, trucks, motorcycles, and luxury vehicles anywhere in the continental United States.",
      gradient: "from-orange-500 to-orange-700",
    },
    {
      icon: "⭐",
      title: "Top-Rated Customer Service",
      description:
        "Our experienced shipping coordinators keep you informed from pickup to delivery.",
      gradient: "from-yellow-500 to-yellow-600",
    },
    {
      icon: "⏰",
      title: "Fast Pickup",
      description:
        "Most vehicles are picked up within 1–3 business days depending on carrier availability.",
      gradient: "from-red-500 to-red-700",
    },
  ];

  return (
    <section className="py-24 bg-slate-100">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-slate-900">
            Why Choose US Star Trucking LLC?
          </h2>
          <p className="text-xl text-gray-600 mt-5 max-w-3xl mx-auto">
            Thousands of customers trust us for reliable, affordable,
            and secure vehicle transportation across the United States.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
          {reasons.map((item) => (
            <div
              key={item.title}
              className={`bg-gradient-to-br ${item.gradient} rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 p-8 text-white hover:-translate-y-2`}
            >
              <div className="text-6xl mb-5">
                {item.icon}
              </div>
              <h3 className="text-2xl font-bold mb-3">
                {item.title}
              </h3>
              <p className="leading-7 opacity-90">
                {item.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default WhyChooseUs;
