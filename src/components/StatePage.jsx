import { useEffect, useState } from "react";
import { STATES } from "../data/states";

// Sets document title + meta description + canonical for SEO,
// and injects FAQ structured data for the state.
function useSeo(state) {
  useEffect(() => {
    if (!state) return;

    document.title = `Car Shipping to ${state.name} | Auto Transport ${state.abbr} | US Star Trucking LLC`;

    const setMeta = (name, content) => {
      let el = document.querySelector(`meta[name="${name}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute("name", name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };
    setMeta(
      "description",
      `Ship your car to ${state.name} with US Star Trucking LLC. Door-to-door auto transport to ${state.cities.slice(0, 3).join(", ")} and all of ${state.abbr}. Licensed & insured. Free instant quote.`
    );

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", `https://carshippingservice.org/car-shipping-${state.slug}`);

    // FAQ structured data
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "state-faq-schema";
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: state.faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    });
    document.getElementById("state-faq-schema")?.remove();
    document.head.appendChild(script);

    return () => document.getElementById("state-faq-schema")?.remove();
  }, [state]);
}

export default function StatePage({ state }) {
  useSeo(state);
  const [openFaq, setOpenFaq] = useState(null);

  if (!state) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white">
      {/* Header */}
      <header className="border-b border-white/10">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="/" className="font-bold text-lg">US Star Trucking LLC</a>
          <div className="flex items-center gap-5 text-sm">
            <a href="/track" className="text-blue-300 hover:text-white transition hidden sm:block">Track Shipment</a>
            <a href="/#quote-form" className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-bold transition">
              Get Free Quote
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-14">
        {/* Hero */}
        <div className="text-center mb-12">
          <p className="text-blue-300 font-semibold tracking-wide uppercase text-sm mb-3">
            Nationwide Auto Transport
          </p>
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">
            Car Shipping to {state.name}
          </h1>
          <p className="mt-5 text-lg text-blue-200 max-w-3xl mx-auto leading-relaxed">
            {state.intro}
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="/#quote-form"
              className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-xl font-bold text-lg transition"
            >
              🚗 Get My Free {state.abbr} Quote
            </a>
            <a
              href="tel:+18657227114"
              className="bg-white/10 hover:bg-white/20 border border-white/20 px-8 py-4 rounded-xl font-bold text-lg transition"
            >
              📞 (865) 722-7114
            </a>
          </div>
        </div>

        {/* Trust strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-14 text-center text-sm">
          {["Licensed & Insured", "Door-to-Door Service", "USDOT 3205543", "Free Instant Quotes"].map((t) => (
            <div key={t} className="rounded-xl border border-white/10 bg-white/5 py-3 px-2 font-semibold text-blue-200">
              ✓ {t}
            </div>
          ))}
        </div>

        {/* Popular routes */}
        <section className="mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">
            Popular {state.name} Shipping Routes
          </h2>
          <div className="overflow-x-auto rounded-2xl border border-white/15">
            <table className="w-full text-sm">
              <thead className="bg-white/10 text-left">
                <tr>
                  <th className="p-4 font-bold">Route</th>
                  <th className="p-4 font-bold">Distance</th>
                  <th className="p-4 font-bold">Transit Time</th>
                  <th className="p-4"></th>
                </tr>
              </thead>
              <tbody>
                {state.routes.map((r) => (
                  <tr key={`${r.from}-${r.to}`} className="border-t border-white/10">
                    <td className="p-4 font-semibold">{r.from} → {r.to}</td>
                    <td className="p-4 text-blue-200">{r.miles} miles</td>
                    <td className="p-4 text-blue-200">{r.days} days</td>
                    <td className="p-4 text-right">
                      <a href="/#quote-form" className="text-blue-400 hover:text-white font-bold whitespace-nowrap">
                        Get price →
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-slate-400">
            Distances and transit times are typical estimates — exact pricing depends on dates, vehicle, and transport type.
          </p>
        </section>

        {/* Cities */}
        <section className="mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">
            {state.name} Cities We Serve
          </h2>
          <div className="flex flex-wrap gap-2">
            {state.cities.map((c) => (
              <span key={c} className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-blue-200">
                📍 {c}
              </span>
            ))}
            <span className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-blue-200">
              + every town in {state.abbr}
            </span>
          </div>
        </section>

        {/* How it works mini */}
        <section className="mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">How It Works</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              ["1", "Get your quote", "Enter pickup and delivery ZIPs in our calculator for an instant estimate."],
              ["2", "We schedule pickup", "A licensed, insured carrier picks up your vehicle door-to-door."],
              ["3", "Track & receive", `Follow your shipment on our tracking page until it arrives in ${state.name}.`],
            ].map(([n, title, text]) => (
              <div key={n} className="rounded-2xl border border-white/15 bg-white/5 p-6">
                <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center font-bold mb-4">{n}</div>
                <h3 className="font-bold mb-2">{title}</h3>
                <p className="text-sm text-blue-200 leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">
            {state.name} Car Shipping FAQ
          </h2>
          <div className="flex flex-col gap-3">
            {state.faqs.map((f, i) => (
              <div key={f.q} className="rounded-2xl border border-white/15 bg-white/5 overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left font-bold hover:bg-white/5 transition"
                >
                  {f.q}
                  <span className="text-blue-400 ml-4">{openFaq === i ? "−" : "+"}</span>
                </button>
                {openFaq === i && (
                  <p className="px-5 pb-5 text-sm text-blue-200 leading-relaxed">{f.a}</p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Other states */}
        <section className="mb-14">
          <h2 className="text-xl font-bold mb-4 text-blue-200">We also ship to:</h2>
          <div className="flex flex-wrap gap-2">
            {STATES.filter((s) => s.slug !== state.slug).map((s) => (
              <a
                key={s.slug}
                href={`/car-shipping-${s.slug}`}
                className="rounded-full border border-white/15 bg-white/5 hover:bg-white/15 px-4 py-2 text-sm font-semibold text-blue-200 transition"
              >
                {s.name}
              </a>
            ))}
          </div>
        </section>

        {/* Bottom CTA */}
        <div className="rounded-3xl border-2 border-blue-500 bg-blue-500/10 p-8 sm:p-10 text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold">
            Ready to ship your car to {state.name}?
          </h2>
          <p className="mt-3 text-blue-200">
            Get an instant quote in under a minute — and save $50 on your first shipment with code{" "}
            <span className="font-mono font-bold text-white">USSTAR50</span>.
          </p>
          <a
            href="/#quote-form"
            className="inline-block mt-6 bg-blue-600 hover:bg-blue-700 px-10 py-4 rounded-xl font-bold text-lg transition"
          >
            Get My Free Quote
          </a>
        </div>
      </main>

      {/* Footer strip */}
      <footer className="border-t border-white/10 py-8 text-center text-sm text-slate-400">
        <p>
          <strong className="text-white">US Star Trucking LLC</strong> · USDOT 3205543 · MC 206532 ·{" "}
          <a href="tel:+18657227114" className="text-blue-300 hover:text-white">(865) 722-7114</a> ·{" "}
          <a href="/" className="text-blue-300 hover:text-white">carshippingservice.org</a>
        </p>
      </footer>
    </div>
  );
}