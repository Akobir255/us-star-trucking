function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Request a Quote",
      description: "Fill out our quick online quote form with your shipment details.",
    },
    {
      number: "02",
      title: "Book Your Shipment",
      description: "Choose the best option and schedule your pickup.",
    },
    {
      number: "03",
      title: "Vehicle Pickup",
      description: "A licensed carrier picks up your vehicle safely.",
    },
    {
      number: "04",
      title: "Safe Delivery",
      description: "Your vehicle arrives at its destination on time.",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-4">
          How It Works
        </h2>

        <p className="text-center text-gray-600 mb-12">
          Shipping your vehicle is simple and stress-free.
        </p>

        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div
              key={step.number}
              className="bg-slate-50 rounded-2xl p-6 shadow-md text-center"
            >
              <div className="text-4xl font-bold text-blue-600 mb-4">
                {step.number}
              </div>

              <h3 className="text-xl font-semibold mb-3">
                {step.title}
              </h3>

              <p className="text-gray-600">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;