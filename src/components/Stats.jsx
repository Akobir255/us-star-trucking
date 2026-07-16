import { useEffect, useRef, useState } from "react";

function useCountUp(target, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start || isNaN(target)) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

function StatCard({ number, suffix, title, description, isText, started }) {
  const numericTarget = isText ? 0 : parseInt(number.replace(/\D/g, "")) || 0;
  const count = useCountUp(numericTarget, 2000, started);

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 text-center border border-white/20 hover:bg-white/20 transition duration-300 hover:-translate-y-2">
      <h3 className="text-5xl font-extrabold mb-4">
        {isText ? number : `${count.toLocaleString()}${suffix}`}
      </h3>
      <h4 className="text-xl font-bold mb-3">{title}</h4>
      <p className="text-blue-100">{description}</p>
    </div>
  );
}

function Stats() {
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const stats = [
    { number: "20000", suffix: "+", title: "Vehicles Shipped", description: "Successfully transported across the United States.", isText: false },
    { number: "50", suffix: "", title: "States Served", description: "Nationwide vehicle shipping across all 50 states.", isText: false },
    { number: "6", suffix: "+", title: "Years of Experience", description: "Trusted auto transport expertise since day one.", isText: false },
    { number: "24/7", suffix: "", title: "Customer Support", description: "We're here to assist you throughout the process.", isText: true },
  ];

  return (
    <section ref={ref} className="bg-gradient-to-r from-[#04356A] to-[#001D3F] text-white py-20">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-14">
          <h2 className="text-5xl font-extrabold">
            Why Customers Choose US Star Trucking LLC
          </h2>
          <p className="mt-5 text-xl text-blue-100">
            Reliable nationwide vehicle transportation backed by professional
            service and transparent communication.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((item) => (
            <StatCard key={item.title} {...item} started={started} />
          ))}
        </div>

      </div>
    </section>
  );
}

export default Stats;