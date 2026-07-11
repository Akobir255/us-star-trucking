function Stats() {
  const stats = [
    {
      number: "10,000+",
      title: "Vehicles Shipped",
    },
    {
      number: "4.9★",
      title: "Customer Rating",
    },
    {
      number: "50",
      title: "States Served",
    },
    {
      number: "24/7",
      title: "Customer Support",
    },
  ];

  return (
    <section className="bg-blue-600 text-white py-16">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">

        {stats.map((item, index) => (
          <div key={index}>
            <h2 className="text-4xl font-extrabold">
              {item.number}
            </h2>

            <p className="mt-2 text-blue-100">
              {item.title}
            </p>
          </div>
        ))}

      </div>
    </section>
  );
}

export default Stats;