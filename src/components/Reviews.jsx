function Reviews() {
  const reviews = [
    {
      name: "Michael R.",
      location: "Orlando, FL",
      title: "Excellent Experience",
      text: "From the first phone call to final delivery, everything was handled professionally. My vehicle arrived on time and in perfect condition. I highly recommend US Star Trucking LLC.",
    },
    {
      name: "Sarah T.",
      location: "Dallas, TX",
      title: "Great Customer Service",
      text: "The quote was fair, communication was excellent, and the driver kept me informed throughout the shipment. I will definitely use this company again.",
    },
    {
      name: "David L.",
      location: "Los Angeles, CA",
      title: "Reliable & Safe",
      text: "Shipping my vehicle across the country was completely stress-free. Pickup and delivery were exactly as promised, and my car arrived without a scratch.",
    },
    {
      name: "Jennifer M.",
      location: "Atlanta, GA",
      title: "Highly Recommended",
      text: "Professional staff, fast scheduling, and excellent communication. The entire process was simple from start to finish.",
    },
    {
      name: "Robert C.",
      location: "Phoenix, AZ",
      title: "Outstanding Service",
      text: "Very impressed with the professionalism and honesty. They answered all my questions and delivered my truck safely.",
    },
    {
      name: "Amanda W.",
      location: "Nashville, TN",
      title: "Five-Star Company",
      text: "Everything went exactly as explained. Fair pricing, quick pickup, and outstanding customer support throughout the shipment.",
    },
  ];

  return (
    <section
      id="reviews"
      className="bg-gradient-to-b from-slate-100 to-white py-24"
    >
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">

          <h2 className="text-5xl font-extrabold text-slate-900">
            Trusted by Customers Nationwide
          </h2>

          <p className="mt-5 text-xl text-gray-600">
            Customer satisfaction is at the heart of everything we do.
          </p>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {reviews.map((review) => (
            <div
              key={review.name}
              className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition duration-300 p-8 border border-gray-100 hover:-translate-y-2"
            >

              <div className="text-2xl text-yellow-500 mb-4">
                ⭐⭐⭐⭐⭐
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-3">
                {review.title}
              </h3>

              <p className="text-gray-600 leading-7 mb-6">
                "{review.text}"
              </p>

              <hr className="mb-5" />

              <h4 className="font-bold text-slate-900">
                {review.name}
              </h4>

              <p className="text-gray-500">
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