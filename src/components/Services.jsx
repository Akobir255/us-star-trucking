function Services() {
  const services = [
    {
      icon: "🚗",
      title: "Open Auto Transport",
      description:
        "Our most popular and affordable shipping option for everyday vehicles. Safe, reliable, and available nationwide.",
    },
    {
      icon: "🏎️",
      title: "Enclosed Auto Transport",
      description:
        "Maximum protection for luxury, exotic, classic, and collector vehicles with fully enclosed trailers.",
    },
    {
      icon: "🏠",
      title: "Door-to-Door Delivery",
      description:
        "Convenient pickup and delivery directly to your home or business whenever road access allows.",
    },
    {
      icon: "⚡",
      title: "Expedited Shipping",
      description:
        "Need your vehicle moved quickly? Our expedited service prioritizes faster pickup and delivery.",
    },
    {
      icon: "🛻",
      title: "SUV & Truck Transport",
      description:
        "We safely transport SUVs, pickup trucks, vans, and oversized vehicles across the United States.",
    },
    {
      icon: "🏍️",
      title: "Motorcycle Transport",
      description:
        "Secure motorcycle shipping using professional equipment designed to keep your bike protected.",
    },
  ];

  return (
    <section
      id="services"
      className="bg-gradient-to-b from-white to-slate-100 py-24"
    >
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">

          <h2 className="text-5xl font-extrabold text-slate-900">
            Our Auto Transport Services
          </h2>

          <p className="mt-6 max-w-3xl mx-auto text-xl text-gray-600">
            Whether you're relocating, buying a vehicle online, or shipping a
            luxury car, US Star Trucking LLC provides dependable nationwide
            vehicle transportation with competitive pricing and outstanding
            customer service.
          </p>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {services.map((service) => (
            <div
              key={service.title}
              className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition duration-300 p-8 border border-gray-100 hover:-translate-y-2"
            >
              <div className="text-5xl mb-6">
                {service.icon}
              </div>

              <h3 className="text-2xl font-bold text-slate-900 mb-4">
                {service.title}
              </h3>

              <p className="text-gray-600 leading-7">
                {service.description}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default Services;