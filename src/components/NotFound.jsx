import { useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { SERVICES } from "../data/services";
import { STATES } from "../data/states";

// Real 404 page for unmatched routes. Sets a noindex robots meta so
// search engines drop bad URLs instead of indexing a soft-404 homepage.
function NotFound() {
  useEffect(() => {
    document.title = "Page Not Found | US Star Trucking LLC";

    let robots = document.querySelector('meta[name="robots"]');
    if (!robots) {
      robots = document.createElement("meta");
      robots.setAttribute("name", "robots");
      document.head.appendChild(robots);
    }
    const previous = robots.getAttribute("content");
    robots.setAttribute("content", "noindex,nofollow");

    // Restore the default robots value if the user navigates away
    // client-side (defensive — most navigation is full page loads).
    return () => {
      if (previous) robots.setAttribute("content", previous);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#000919] pt-28 text-white">
      <Navbar />
      <main className="max-w-3xl mx-auto px-6 py-20 text-center">
        <p className="text-7xl font-extrabold text-blue-500">404</p>
        <h1 className="mt-4 text-3xl sm:text-4xl font-extrabold">
          Page not found
        </h1>
        <p className="mt-4 text-lg text-blue-200">
          The page you're looking for doesn't exist or may have moved.
          Here's where you probably want to go:
        </p>

        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="/"
            className="bg-blue-600 hover:bg-blue-700 rounded-xl px-8 py-4 font-bold transition"
          >
            Go to Homepage
          </a>
          <a
            href="/#quote-form"
            className="border border-white/30 hover:bg-white/10 rounded-xl px-8 py-4 font-bold transition"
          >
            Get a Free Quote
          </a>
          <a
            href="/track"
            className="border border-white/30 hover:bg-white/10 rounded-xl px-8 py-4 font-bold transition"
          >
            Track a Shipment
          </a>
        </div>

        <div className="mt-16 text-left bg-white/5 border border-white/10 rounded-2xl p-6">
          <p className="font-bold text-blue-300 mb-3">Popular services</p>
          <div className="flex flex-wrap gap-2">
            {SERVICES.slice(0, 6).map((s) => (
              <a
                key={s.slug}
                href={`/${s.slug}`}
                className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-sm font-semibold transition"
              >
                {s.short}
              </a>
            ))}
          </div>
          <p className="font-bold text-blue-300 mt-6 mb-3">Popular destinations</p>
          <div className="flex flex-wrap gap-2">
            {STATES.map((s) => (
              <a
                key={s.slug}
                href={`/car-shipping-${s.slug}`}
                className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-sm font-semibold transition"
              >
                {s.name}
              </a>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default NotFound;
