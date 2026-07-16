function ReviewTicker({ reviews }) {
  // Render the list twice; animating the track by -50% makes the loop seamless.
  const doubled = [...reviews, ...reviews];

  return (
    <div aria-label="Scrolling customer reviews" className="relative mb-16">
      {/* Scoped keyframes — no tailwind.config changes needed */}
      <style>{`
        @keyframes ticker-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .ticker-track {
          animation: ticker-scroll 40s linear infinite;
          will-change: transform;
        }
        .ticker-viewport:hover .ticker-track,
        .ticker-viewport:focus-within .ticker-track {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .ticker-track { animation: none; }
          .ticker-viewport { overflow-x: auto; }
        }
      `}</style>

      <div className="ticker-viewport relative overflow-hidden">
        {/* Edge fade masks — match the section background */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-slate-900 to-transparent sm:w-24" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-slate-900 to-transparent sm:w-24" />

        <div className="ticker-track flex w-max gap-5 pr-5">
          {doubled.map((review, i) => (
            <figure
              key={i}
              aria-hidden={i >= reviews.length ? "true" : undefined}
              className="flex w-[300px] shrink-0 flex-col rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur sm:w-[340px]"
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="text-yellow-400">⭐⭐⭐⭐⭐</span>
                <span className="rounded-full bg-blue-500/20 px-3 py-1 text-xs font-medium text-blue-300">
                  {review.location}
                </span>
              </div>

              <blockquote className="text-sm leading-6 text-blue-200">
                "{review.text}"
              </blockquote>

              <figcaption className="mt-auto flex items-center gap-3 pt-4">
                <span
                  aria-hidden="true"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 text-sm font-bold text-white"
                >
                  {review.name.charAt(0)}
                </span>
                <div className="leading-tight">
                  <p className="text-sm font-bold text-white">{review.name}</p>
                  <p className="text-xs text-emerald-400">✓ Verified shipment</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </div>
  );
}

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
      className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 py-24"
    >
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">
          <h2 className="text-5xl font-extrabold text-white">
            Trusted by Customers Nationwide
          </h2>
          <p className="mt-5 text-xl text-blue-300">
            Customer satisfaction is at the heart of everything we do.
          </p>
        </div>

        {/* Auto-scrolling review ticker */}
        <ReviewTicker reviews={reviews} />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div
              key={review.name}
              className="bg-white/10 backdrop-blur border border-white/20 rounded-3xl shadow-lg hover:shadow-2xl transition duration-300 p-8 hover:-translate-y-2"
            >
              <div className="text-2xl text-yellow-400 mb-4">
                ⭐⭐⭐⭐⭐
              </div>

              <h3 className="text-xl font-bold text-white mb-3">
                {review.title}
              </h3>

              <p className="text-blue-200 leading-7 mb-6">
                "{review.text}"
              </p>

              <hr className="mb-5 border-white/20" />

              <h4 className="font-bold text-white">
                {review.name}
              </h4>

              <p className="text-blue-300">
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