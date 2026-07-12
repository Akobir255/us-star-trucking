function Stats() {
  const stats = [
    {
      number: "50",
      title: "States Served",
      description: "Nationwide vehicle shipping across the U.S.",
    },
    {
      number: "100%",
      title: "Licensed & Insured",
      description: "Professional carriers for every shipment.",
    },
    {
      number: "24/7",
      title: "Customer Support",
      description: "We're here to assist you throughout the process.",
    },
    {
      number: "Door-to-Door",
      title: "Service Available",
      description: "Convenient pickup and delivery whenever accessible.",
    },
  ];

  return (
    <section className="bg-gradient-to-r from-blue-700 to-blue-900 text-white py-20">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-14">
          <h2 className="text-5xl font-extrabold">
            Why Customers Choose US Star Trucking LLC
          </h2>

          <p className="mt-5 text-xl text-blue-100">
            Reliable nationwide vehicle transportation backed by professional
            service and transparent communication.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {stats.map((item) => (
            <div
              key={item.title}
              className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 text-center border border-white/20 hover:bg-white/20 transition duration-300"
            >
              <h3 className="text-4xl font-extrabold mb-4">
                {item.number}
              </h3>

              <h4 className="text-xl font-bold mb-3">
                {item.title}
              </h4>

              <p className="text-blue-100">
                {item.description}
              </p>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}

export default Stats;