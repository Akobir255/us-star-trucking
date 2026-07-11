function Services() {
  const services = [
    {
      title: "Open Transport",
      description: "The most affordable and popular way to ship your vehicle.",
    },
    {
      title: "Enclosed Transport",
      description: "Maximum protection for luxury, classic, and exotic cars.",
    },
    {
      title: "Door-to-Door",
      description: "We pick up and deliver your vehicle as close as possible.",
    },
  ];

  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12">
          Our Auto Transport Services
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.title}
              className="rounded-2xl shadow-lg p-8 border hover:shadow-xl transition"
            >
              <h3 className="text-2xl font-semibold mb-4">
                {service.title}
              </h3>
              <p className="text-gray-600">
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