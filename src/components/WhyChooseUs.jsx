function WhyChooseUs() {
  const reasons = [
    {
      icon: "🛡️",
      title: "Licensed, Bonded & Insured",
      link: "https://safer.fmcsa.dot.gov/query.asp?searchtype=ANY&query_type=queryCarrierSnapshot&query_param=USDOT&query_string=3205543",
      description:
        "Every shipment is handled by fully licensed FMCSA-compliant carriers with cargo insurance for complete peace of mind.",
      gradient: "from-[#0A6ED3] to-[#054E98]",
    },
    {
      icon: "🚚",
      title: "Door-to-Door Delivery",
      link: "/door-to-door-auto-transport",
      description:
        "We pick up and deliver your vehicle as close to your preferred locations as safely possible.",
      gradient: "from-[#054E98] to-[#04356A]",
    },
    {
      icon: "💰",
      title: "Transparent Pricing",
      link: "/#quote-form",
      description:
        "Clear upfront estimates with every fee explained before you book. Your final price is confirmed when a carrier is assigned.",
      gradient: "from-[#04356A] to-[#054E98]",
    },
    {
      icon: "📍",
      title: "Nationwide Coverage",
      link: "/car-shipping-california",
      description:
        "We transport cars, SUVs, trucks, motorcycles, and luxury vehicles anywhere in the continental United States.",
      gradient: "from-[#04356A] to-[#001D3F]",
    },
    {
      icon: "⭐",
      title: "Top-Rated Customer Service",
      link: "/#reviews",
      description:
        "Our experienced shipping coordinators keep you informed from pickup to delivery.",
      gradient: "from-[#054E98] to-[#001D3F]",
    },
    {
      icon: "⏰",
      title: "Fast Pickup",
      link: "/expedited-auto-transport",
      description:
        "Most vehicles are picked up within 1–3 business days depending on carrier availability.",
      gradient: "from-[#0A6ED3] to-[#04356A]",
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white">
            Why Choose US Star Trucking LLC?
          </h2>
          <p className="text-xl text-slate-300 mt-5 max-w-3xl mx-auto">
            Thousands of customers trust us for reliable, affordable,
            and secure vehicle transportation across the United States.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
          {reasons.map((item) => (
            <a
              href={item.link}
              key={item.title}
              target={item.link.startsWith("http") ? "_blank" : undefined}
              rel={item.link.startsWith("http") ? "noopener noreferrer" : undefined}
              className={`block bg-gradient-to-br ${item.gradient} rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 p-8 text-white hover:-translate-y-2 cursor-pointer`}
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
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}

export default WhyChooseUs;