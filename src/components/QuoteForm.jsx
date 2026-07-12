import { useState } from "react";
import emailjs from "@emailjs/browser";
import { getDistance } from "../googleDistance";
import { calculateQuote } from "../pricing";

export default function QuoteForm() {
  const initialForm = {
    pickup: "",
    delivery: "",
    year: "",
    make: "",
    model: "",
    vehicle: "",
    condition: "",
    transport: "",
    name: "",
    phone: "",
    email: "",
  };

  const [formData, setFormData] = useState(initialForm);
  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState({
    type: "",
    text: "",
  });

  const [quote, setQuote] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const calculateInstantQuote = async () => {
    if (
      formData.pickup.length !== 5 ||
      formData.delivery.length !== 5 ||
      !formData.vehicle ||
      !formData.condition ||
      !formData.transport
    ) {
      return;
    }

    try {
      const result = await getDistance(
        formData.pickup,
        formData.delivery
      );

      const price = calculateQuote(
        result.miles,
        formData.vehicle,
        formData.condition,
        formData.transport
      );

      setQuote({
        miles: result.miles,
        distance: result.distance,
        duration: result.duration,
        price,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    setMessage({
      type: "",
      text: "",
    });

    try {
      let quoteData = quote;

      if (!quoteData) {
        const result = await getDistance(
          formData.pickup,
          formData.delivery
        );

        const price = calculateQuote(
          result.miles,
          formData.vehicle,
          formData.condition,
          formData.transport
        );

        quoteData = {
          miles: result.miles,
          distance: result.distance,
          duration: result.duration,
          price,
        };
      }

      await emailjs.send(
        "service_7iyk46o",
        "template_hip0ibn",
        {
          ...formData,
          distance: quoteData.distance,
          miles: quoteData.miles,
          estimated_price: `$${quoteData.price}`,
        },
        "VmOz4fwe7AtHA_Xjf"
      );

      setMessage({
        type: "success",
        text: "✅ Your quote request has been sent successfully!",
      });

      setFormData(initialForm);
      setQuote(null);
    } catch (error) {
      console.error(error);

      setMessage({
        type: "error",
        text: "❌ Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="quote-form"
      className="max-w-6xl mx-auto px-6 -mt-10 relative z-10"
    >
      <div className="bg-white rounded-3xl shadow-2xl p-8">
        <h2 className="text-3xl font-bold text-center mb-2">
          Get Your Free Car Shipping Quote
        </h2>

        <p className="text-center text-gray-600 mb-8">
          Fast • Safe • Door-to-Door Auto Transport
        </p>

        <form
          onSubmit={handleSubmit}
          className="grid md:grid-cols-2 gap-4"
        >
          <input
            type="text"
            name="pickup"
            value={formData.pickup}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "").slice(0, 5);
              setFormData((prev) => ({
                ...prev,
                pickup: value,
              }));
            }}
            onBlur={calculateInstantQuote}
            placeholder="Pickup ZIP Code"
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            maxLength={5}
            required
          />

          <input
            type="text"
            name="delivery"
            value={formData.delivery}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "").slice(0, 5);
              setFormData((prev) => ({
                ...prev,
                delivery: value,
              }));
            }}
            onBlur={calculateInstantQuote}
            placeholder="Delivery ZIP Code"
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            maxLength={5}
            required
          />

          <input
            type="text"
            name="year"
            value={formData.year}
            onChange={handleChange}
            placeholder="Vehicle Year"
            className="border border-gray-300 p-3 rounded-lg"
            required
          />

          <input
            type="text"
            name="make"
            value={formData.make}
            onChange={handleChange}
            placeholder="Vehicle Make"
            className="border border-gray-300 p-3 rounded-lg"
            required
          />

          <input
            type="text"
            name="model"
            value={formData.model}
            onChange={handleChange}
            placeholder="Vehicle Model"
            className="border border-gray-300 p-3 rounded-lg"
            required
          />

          <select
            name="vehicle"
            value={formData.vehicle}
            onChange={handleChange}
            onBlur={calculateInstantQuote}
            className="border border-gray-300 p-3 rounded-lg"
            required
          >
            <option value="">Vehicle Type</option>
            <option value="Sedan">Sedan</option>
            <option value="SUV">SUV</option>
            <option value="Pickup Truck">Pickup Truck</option>
            <option value="Van">Van</option>
            <option value="Motorcycle">Motorcycle</option>
          </select>

          <select
            name="condition"
            value={formData.condition}
            onChange={handleChange}
            onBlur={calculateInstantQuote}
            className="border border-gray-300 p-3 rounded-lg"
            required
          >
            <option value="">Vehicle Condition</option>
            <option value="Running">Running</option>
            <option value="Non-Running">Non-Running</option>
          </select>

          <select
            name="transport"
            value={formData.transport}
            onChange={handleChange}
            onBlur={calculateInstantQuote}
            className="border border-gray-300 p-3 rounded-lg"
            required
          >
            <option value="">Transport Type</option>
            <option value="Open">Open Transport</option>
            <option value="Enclosed">Enclosed Transport</option>
          </select>

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="border border-gray-300 p-3 rounded-lg"
            required
          />

          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            className="border border-gray-300 p-3 rounded-lg"
            required
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address"
            className="border border-gray-300 p-3 rounded-lg"
            required
          />

          {quote && (
            <div className="md:col-span-2 bg-blue-50 border border-blue-200 rounded-xl p-5">
              <h3 className="text-xl font-bold mb-3">
                Estimated Quote
              </h3>

              <p><strong>Distance:</strong> {quote.distance}</p>
              <p><strong>Miles:</strong> {quote.miles}</p>
              <p><strong>Transit Time:</strong> {quote.duration}</p>

              <p className="text-3xl font-bold text-blue-700 mt-4">
                ${quote.price}
              </p>

              <p className="text-sm text-gray-600 mt-2">
                Final price may vary slightly depending on carrier availability.
              </p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`md:col-span-2 py-3 rounded-lg font-bold text-white ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Sending..." : "Get My Free Quote"}
          </button>

          {message.text && (
            <div
              className={`md:col-span-2 text-center font-medium ${
                message.type === "success"
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {message.text}
            </div>
          )}
        </form>
      </div>
    </section>
  );
}