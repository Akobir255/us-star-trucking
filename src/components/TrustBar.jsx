function TrustBar() {
  const items = [
    "Licensed & Insured",
    "Door-to-Door Delivery",
    "Nationwide Coverage",
    "USDOT #3205543 • MC #206532",
  ];

  return (
    <section className="bg-blue-700 text-white">
      <div className="max-w-7xl mx-auto px-6 py-5">
        <div className="grid md:grid-cols-4 gap-6 text-center">
          {items.map((item) => (
            <div key={item} className="font-semibold">
              ✓ {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TrustBar;