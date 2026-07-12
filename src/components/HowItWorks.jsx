function HowItWorks() {
  const steps = [
    {
      number: "01",
      icon: "📝",
      title: "Request Your Free Quote",
      description:
        "Complete our simple online form or give us a call. We'll provide a fast, accurate, no-obligation quote.",
    },
    {
      number: "02",
      icon: "📅",
      title: "Schedule Your Shipment",
      description:
        "Choose your preferred pickup date and transport option. We'll match you with a licensed and insured carrier.",
    },
    {
      number: "03",
      icon: "🚛",
      title: "Vehicle Pickup",
      description:
        "Your vehicle is carefully inspected and picked up by a professional carrier at your chosen location.",
    },
    {
      number: "04",
      icon: "✅",
      title: "Safe Delivery",
      description:
        "Your vehicle is delivered safely to its destination. A final inspection ensures everything arrives in excellent condition.",
    },
  ];

  return (
    <section
      id="how-it-works"
      className="py-24 bg-gradient-to-b from-slate-100 to-white"
    >
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">

          <h2 className="text-5xl font-extrabold text-slate-900">
            How Our Shipping Process Works
          </h2>

          <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
            Shipping your vehicle has never been easier. We handle every step
            from pickup to delivery so you can enjoy a simple, stress-free
            experience.
          </p>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {steps.map((step) => (
            <div
              key={step.number}
              className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition duration-300 p-8 text-center border border-gray-100 hover:-translate-y-2"
            >

              <div className="text-blue-600 font-extrabold text-5xl mb-4">
                {step.number}
              </div>

              <div className="text-5xl mb-5">
                {step.icon}
              </div>

              <h3 className="text-2xl font-bold text-slate-900 mb-4">
                {step.title}
              </h3>

              <p className="text-gray-600 leading-7">
                {step.description}
              </p>

            </div>
          ))}

        </div>

        <div className="mt-16 bg-blue-700 rounded-3xl p-10 text-center text-white shadow-xl">

          <h3 className="text-3xl font-bold mb-4">
            Ready to Ship Your Vehicle?
          </h3>

          <p className="text-lg text-blue-100 mb-8">
            Join thousands of satisfied customers who trust US Star Trucking LLC
            for safe, reliable, and affordable nationwide vehicle transport.
          </p>

          <a
            href="#quote-form"
            className="inline-block bg-white text-blue-700 font-bold px-8 py-4 rounded-xl hover:bg-gray-100 transition"
          >
            Get Your Free Quote
          </a>

        </div>

      </div>
    </section>
  );
}

export default HowItWorks;