function FAQ() {
  const faqs = [
    {
      question: "How much does car shipping cost?",
      answer:
        "The cost depends on the pickup and delivery locations, vehicle type, transport method, and time of year. Request a free quote for accurate pricing.",
    },
    {
      question: "How long does vehicle transport take?",
      answer:
        "Most shipments are delivered within 2–7 days depending on the distance and route.",
    },
    {
      question: "Is my vehicle insured during transport?",
      answer:
        "Yes. All carriers are fully licensed and insured for your peace of mind.",
    },
    {
      question: "Do you offer door-to-door delivery?",
      answer:
        "Yes. We provide convenient door-to-door vehicle transport whenever accessible.",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12">
          Frequently Asked Questions
        </h2>

        <div className="space-y-6">
          {faqs.map((faq) => (
            <div
              key={faq.question}
              className="border rounded-xl p-6 shadow-sm"
            >
              <h3 className="text-xl font-semibold mb-2">
                {faq.question}
              </h3>

              <p className="text-gray-600">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FAQ;