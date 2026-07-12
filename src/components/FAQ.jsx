import { useState } from "react";

function FAQ() {
  const faqs = [
    {
      question: "How much does car shipping cost?",
      answer:
        "Your shipping price depends on the pickup and delivery locations, vehicle type, transport option, and current market conditions. Use our instant quote calculator for a fast estimate.",
    },
    {
      question: "How long does vehicle transport take?",
      answer:
        "Transit time depends on the distance. Most shipments are completed within 2–7 days, while cross-country deliveries typically take 7–10 days.",
    },
    {
      question: "Is my vehicle insured during transport?",
      answer:
        "Yes. Every carrier we work with is fully licensed and insured, providing coverage while your vehicle is in transit.",
    },
    {
      question: "Do you offer door-to-door delivery?",
      answer:
        "Absolutely. We provide door-to-door pickup and delivery whenever the pickup and delivery locations are safely accessible by the carrier.",
    },
    {
      question: "Can I ship a non-running vehicle?",
      answer:
        "Yes. We can transport non-running vehicles using specialized loading equipment. Simply select 'Non-Running' when requesting your quote.",
    },
    {
      question: "What transport options do you offer?",
      answer:
        "We offer both Open Transport and Enclosed Transport. Open transport is the most affordable option, while enclosed transport provides extra protection for luxury, exotic, and classic vehicles.",
    },
  ];

  const [open, setOpen] = useState(null);

  return (
    <section
      id="faq"
      className="bg-slate-50 py-24"
    >
      <div className="max-w-5xl mx-auto px-6">

        <div className="text-center mb-16">

          <h2 className="text-5xl font-extrabold text-slate-900">
            Frequently Asked Questions
          </h2>

          <p className="mt-5 text-xl text-gray-600">
            Everything you need to know about shipping your vehicle.
          </p>

        </div>

        <div className="space-y-5">

          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md overflow-hidden"
            >

              <button
                onClick={() =>
                  setOpen(open === index ? null : index)
                }
                className="w-full flex justify-between items-center text-left p-6 hover:bg-gray-50 transition"
              >
                <span className="text-xl font-semibold text-slate-900">
                  {faq.question}
                </span>

                <span className="text-3xl text-blue-600 font-bold">
                  {open === index ? "−" : "+"}
                </span>
              </button>

              {open === index && (
                <div className="px-6 pb-6 text-gray-600 leading-7">
                  {faq.answer}
                </div>
              )}

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default FAQ;