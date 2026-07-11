import { useState } from "react";
import emailjs from "@emailjs/browser";

function QuoteForm() {
  const [formData, setFormData] = useState({
    pickupCity: "",
    pickupState: "",
    deliveryCity: "",
    deliveryState: "",
    vehicleYear: "",
    vehicleMake: "",
    vehicleModel: "",
    vehicleType: "",
    vehicleCondition: "Running",
    transportType: "Open",
    name: "",
    phone: "",
    email: "",
    notes: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Form Data:", formData);

    emailjs
      .send(
        "service_7iyk46o",
        "template_hip0ibn",
        formData,
        "VmOz4fwe7AtHA_Xjf"
      )
      .then(() => {
        alert("Thank you! Your quote request has been sent.");

        setFormData({
          pickupCity: "",
          pickupState: "",
          deliveryCity: "",
          deliveryState: "",
          vehicleYear: "",
          vehicleMake: "",
          vehicleModel: "",
          vehicleType: "",
          vehicleCondition: "Running",
          transportType: "Open",
          name: "",
          phone: "",
          email: "",
          notes: "",
        });
      })
      .catch((error) => {
        console.error("EmailJS Error:", error);
        alert("Something went wrong. Please try again.");
      });
  };

  return (
      <section
  id="quote-form"
  className="max-w-6xl mx-auto px-6 -mt-10 relative z-10">
      <div className="bg-white rounded-3xl shadow-2xl p-8">

        <h2 className="text-3xl font-bold text-center mb-8">
          Get Your Free Auto Transport Quote
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="grid md:grid-cols-2 gap-4">

            <input
              type="text"
              name="pickupCity"
              placeholder="Pickup City"
              value={formData.pickupCity}
              onChange={handleChange}
              className="border rounded-xl p-4"
              required
            />

            <input
              type="text"
              name="pickupState"
              placeholder="Pickup State"
              value={formData.pickupState}
              onChange={handleChange}
              className="border rounded-xl p-4"
              required
            />

            <input
              type="text"
              name="deliveryCity"
              placeholder="Delivery City"
              value={formData.deliveryCity}
              onChange={handleChange}
              className="border rounded-xl p-4"
              required
            />

            <input
              type="text"
              name="deliveryState"
              placeholder="Delivery State"
              value={formData.deliveryState}
              onChange={handleChange}
              className="border rounded-xl p-4"
              required
            />

            <input
              type="number"
              name="vehicleYear"
              placeholder="Vehicle Year (Example: 2022)"
              value={formData.vehicleYear}
              onChange={handleChange}
              min="1900"
              max="2099"
              className="border rounded-xl p-4"
              required
            />

            <input
              type="text"
              name="vehicleMake"
              placeholder="Vehicle Make"
              value={formData.vehicleMake}
              onChange={handleChange}
              className="border rounded-xl p-4"
              required
            />

            <input
              type="text"
              name="vehicleModel"
              placeholder="Vehicle Model"
              value={formData.vehicleModel}
              onChange={handleChange}
              className="border rounded-xl p-4"
              required
            />

            <select
              name="vehicleType"
              value={formData.vehicleType}
              onChange={handleChange}
              className="border rounded-xl p-4"
              required
            >
              <option value="">Vehicle Type</option>
              <option>Sedan</option>
              <option>SUV</option>
              <option>Pickup Truck</option>
              <option>Van</option>
              <option>Motorcycle</option>
            </select>

            <select
              name="vehicleCondition"
              value={formData.vehicleCondition}
              onChange={handleChange}
              className="border rounded-xl p-4"
            >
              <option>Running</option>
              <option>Non-Running</option>
            </select>

            <select
              name="transportType"
              value={formData.transportType}
              onChange={handleChange}
              className="border rounded-xl p-4"
            >
              <option>Open Transport</option>
              <option>Enclosed Transport</option>
            </select>

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="border rounded-xl p-4 md:col-span-2"
              required
            />

            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="border rounded-xl p-4"
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="border rounded-xl p-4"
              required
            />

            <textarea
              name="notes"
              placeholder="Additional Notes (Optional)"
              value={formData.notes}
              onChange={handleChange}
              rows="5"
              className="border rounded-xl p-4 md:col-span-2"
            />

          </div>

          <button
            type="submit"
            className="mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl text-lg font-bold transition"
          >
            Get My Free Quote
          </button>

        </form>

      </div>
    </section>
  );
}

export default QuoteForm;