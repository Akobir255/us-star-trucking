import openTransport from "../assets/opentrailer.jpg";
import enclosedTransport from "../assets/enclosed.jpg";
import expeditedShipping from "../assets/expedited.jpg";
import doorToDoor from "../assets/doortodoor.jpg";

function Services() {
  const services = [
    {
      image: openTransport,
      title: "Open Auto Transport",
      description:
        "Our most popular and affordable shipping option for everyday vehicles. Safe, reliable, and available nationwide.",
    },
    {
      image: enclosedTransport,
      title: "Enclosed Auto Transport",
      description:
        "Maximum protection for luxury, exotic, classic, and collector vehicles with fully enclosed trailers.",
    },
    {
      image: doorToDoor,
      title: "Door-to-Door Delivery",
      description:
        "Convenient pickup and delivery directly to your home or business whenever road access allows.",
    },
    {
      image: expeditedShipping,
      title: "Expedited Shipping",
      description:
        "Need your vehicle moved quickly? Our expedited service prioritizes faster pickup and delivery.",
    },
    {
      image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=400&h=250&fit=crop",
      title: "SUV & Truck Transport",
      description:
        "We safely transport SUVs, pickup trucks, vans, and oversized vehicles across the United States.",
    },
    {
      image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=400&h=250&fit=crop",
      title: "Motorcycle Transport",
      description:
        "Secure motorcycle shipping using professional equipment designed to keep your bike protected.",
    },
  ];

  return (
    <section
      id="services"
      className="bg-gradient-to-b from-slate-800 to-slate-900 py-24"
    >
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">
          <h2 className="text-5xl font-extrabold text-white">
            Our Auto Transport Services
          </h2>
          <p className="mt-6 max-w-3xl mx-auto text-xl text-slate-300">
            Whether you're relocating, buying a vehicle online, or shipping a
            luxury car, US Star Trucking LLC provides dependable nationwide
            vehicle transportation with competitive pricing and outstanding
            customer service.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.title}
              className="bg-slate-700 rounded-3xl shadow-lg hover:shadow-2xl transition duration-300 border border-slate-600 hover:-translate-y-2 overflow-hidden"
            >
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-8">
                <h3 className="text-2xl font-bold text-white mb-4">
                  {service.title}
                </h3>
                <p className="text-slate-300 leading-7">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Services;
