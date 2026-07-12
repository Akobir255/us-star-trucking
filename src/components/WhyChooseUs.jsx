function WhyChooseUs() {
  const reasons = [
    {
      icon: "🛡️",
      title: "Licensed, Bonded & Insured",
      description:
        "Every shipment is handled by fully licensed FMCSA-compliant carriers with cargo insurance for complete peace of mind.",
    },
    {
      icon: "🚚",
      title: "Door-to-Door Delivery",
      description:
        "We pick up and deliver your vehicle as close to your preferred locations as safely possible.",
    },
    {
      icon: "💰",
      title: "Transparent Pricing",
      description:
        "No hidden fees. No surprise charges. Get competitive pricing with an instant online estimate.",
    },
    {
      icon: "📍",
      title: "Nationwide Coverage",
      description:
        "We transport cars, SUVs, trucks, motorcycles, and luxury vehicles anywhere in the continental United States.",
    },
    {
      icon: "⭐",
      title: "Top-Rated Customer Service",
      description:
        "Our experienced shipping coordinators keep you informed from pickup to delivery.",
    },
    {
      icon: "⏰",
      title: "Fast Pickup",
      description:
        "Most vehicles are picked up within 1–3 business days depending on carrier availability.",
    },
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold">
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
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition p-8"
            >
              <div className="text-5xl mb-5">
                {item.icon}
              </div>

              <h3 className="text-2xl font-bold mb-3">
                {item.title}
              </h3>

              <p className="text-gray-600 leading-7">
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