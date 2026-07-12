function TrustBar() {
  const items = [
    {
      icon: "🛡️",
      title: "Licensed & Insured",
      text: "Professional, fully compliant auto transport.",
    },
    {
      icon: "🚪",
      title: "Door-to-Door Service",
      text: "Convenient pickup and delivery nationwide.",
    },
    {
      icon: "🇺🇸",
      title: "Nationwide Coverage",
      text: "Shipping vehicles across all 50 states.",
    },
    {
      icon: "📋",
      title: "USDOT 3205543 • MC 206532",
      text: "Operating under federal authority.",
    },
  ];

  return (
    <section className="bg-gradient-to-r from-blue-700 to-blue-900 text-white py-8">
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          {items.map((item) => (
            <div
              key={item.title}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20 hover:bg-white/20 transition duration-300"
            >
              <div className="text-4xl mb-4">
                {item.icon}
              </div>

              <h3 className="text-xl font-bold mb-2">
                {item.title}
              </h3>

              <p className="text-blue-100 text-sm">
                {item.text}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default TrustBar;