function WhyChooseUs() {
  const reasons = [
    {
      title: "Licensed & Insured",
      description: "Your vehicle is protected by fully licensed and insured carriers.",
    },
    {
      title: "Nationwide Coverage",
      description: "We ship cars safely across all 50 states.",
    },
    {
      title: "Competitive Pricing",
      description: "Transparent pricing with no hidden fees.",
    },
    {
      title: "24/7 Customer Support",
      description: "Our team is available to answer your questions anytime.",
    },
  ];

  return (
    <section className="bg-slate-100 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-4">
          Why Choose Us
        </h2>

        <p className="text-center text-gray-600 mb-12">
          Trusted by customers nationwide for safe, reliable, and affordable vehicle transport.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((item) => (
            <div
              key={item.title}
              className="bg-white p-6 rounded-2xl shadow-md"
            >
              <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;