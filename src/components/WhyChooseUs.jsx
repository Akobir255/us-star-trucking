const Icon = ({ path, extra = null }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-12 h-12 text-cyan-300"
    aria-hidden="true"
  >
    <path d={path} />
    {extra}
  </svg>
);

const ICONS = {
  shield: (
    <Icon path="M12 3l7 3v5c0 4.5-3 8.5-7 10-4-1.5-7-5.5-7-10V6l7-3z" extra={<path d="M9 12l2 2 4-4" />} />
  ),
  truck: (
    <Icon
      path="M1 7h12v9H1zM13 10h4l3 3v3h-7z"
      extra={
        <>
          <circle cx="5.5" cy="17.5" r="1.8" fill="currentColor" stroke="none" />
          <circle cx="16.5" cy="17.5" r="1.8" fill="currentColor" stroke="none" />
        </>
      }
    />
  ),
  dollar: (
    <Icon path="M12 2v20M16.5 6.5c-1-1.2-2.6-1.8-4.5-1.8-2.5 0-4.5 1.3-4.5 3.4 0 4.4 9 2.3 9 6.8 0 2.1-2 3.4-4.5 3.4-1.9 0-3.5-.6-4.5-1.8" />
  ),
  pin: (
    <Icon path="M12 21s-7-6.2-7-11a7 7 0 1114 0c0 4.8-7 11-7 11z" extra={<circle cx="12" cy="10" r="2.5" />} />
  ),
  star: (
    <Icon path="M12 3l2.7 5.6 6.1.8-4.5 4.3 1.1 6-5.4-2.9L6.6 19.7l1.1-6L3.2 9.4l6.1-.8L12 3z" />
  ),
  clock: (
    <Icon path="M12 8v4l3 2" extra={<circle cx="12" cy="12" r="9" />} />
  ),
};

function WhyChooseUs() {
  const reasons = [
    {
      icon: "shield",
      title: "Licensed, Bonded & Insured",
      link: "https://safer.fmcsa.dot.gov/query.asp?searchtype=ANY&query_type=queryCarrierSnapshot&query_param=USDOT&query_string=3205543",
      description:
        "Every shipment is handled by fully licensed FMCSA-compliant carriers with cargo insurance for complete peace of mind.",
      gradient: "from-[#0A6ED3] to-[#054E98]",
    },
    {
      icon: "truck",
      title: "Door-to-Door Delivery",
      link: "/door-to-door-auto-transport",
      description:
        "We pick up and deliver your vehicle as close to your preferred locations as safely possible.",
      gradient: "from-[#054E98] to-[#04356A]",
    },
    {
      icon: "dollar",
      title: "Transparent Pricing",
      link: "/#quote-form",
      description:
        "Clear upfront estimates with every fee explained before you book. Your final price is confirmed when a carrier is assigned.",
      gradient: "from-[#04356A] to-[#054E98]",
    },
    {
      icon: "pin",
      title: "Nationwide Coverage",
      link: "/car-shipping-california",
      description:
        "We transport cars, SUVs, trucks, motorcycles, and luxury vehicles anywhere in the continental United States.",
      gradient: "from-[#04356A] to-[#001D3F]",
    },
    {
      icon: "star",
      title: "Top-Rated Customer Service",
      link: "/#reviews",
      description:
        "Our experienced shipping coordinators keep you informed from pickup to delivery.",
      gradient: "from-[#054E98] to-[#001D3F]",
    },
    {
      icon: "clock",
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
              <div className="mb-5 inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10">
                {ICONS[item.icon]}
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
