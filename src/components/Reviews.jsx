function Reviews() {
  const reviews = [
    {
      name: "Michael R.",
      location: "Florida",
      text: "Excellent communication from pickup to delivery. My car arrived on time and in perfect condition. Leo is really helpful",
    },
    {
      name: "Sarah T.",
      location: "Texas",
      text: "The quote was competitive and the driver was very professional. I would definitely use them again. Thanks Leo Carter",
    },
    {
      name: "David L.",
      location: "California",
      text: "Fast, reliable service. The entire process was smooth and stress-free. I will recommend this company to my friends",
    },
  ];

  return (
    <section className="bg-slate-50 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-4">
          What Our Customers Say
        </h2>

        <p className="text-center text-gray-600 mb-12">
          Customer satisfaction is our top priority.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div
              key={review.name}
              className="bg-white rounded-2xl shadow-lg p-8"
            >
              <div className="text-yellow-500 text-xl mb-4">
                ⭐⭐⭐⭐⭐
              </div>

              <p className="text-gray-600 mb-6">
                "{review.text}"
              </p>

              <h3 className="font-bold">
                {review.name}
              </h3>

              <p className="text-gray-500 text-sm">
                {review.location}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Reviews;