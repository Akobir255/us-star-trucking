import openTransport from "../assets/opentrailer.webp";
import enclosedTransport from "../assets/enclosed.webp";
import expeditedShipping from "../assets/expedited.webp";
import doorToDoor from "../assets/doortodoor.webp";

// Sets document title + meta description + canonical for SEO,
// and injects FAQ structured data for the service.
function useSeo(service) {
  useEffect(() => {
    if (!service) return;

    document.title = `${service.name} | US Star Trucking LLC`;

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
      `${service.name} from US Star Trucking LLC — ${service.tagline.toLowerCase()}. Licensed & insured, door-to-door, free instant quotes. Call (865) 722-7114.`
    );

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", `https://carshippingservice.org/${service.slug}`);

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "service-faq-schema";
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: service.faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    });
    document.getElementById("service-faq-schema")?.remove();
    document.head.appendChild(script);

    return () => document.getElementById("service-faq-schema")?.remove();
  }, [service]);
}

export default function ServicePage({ service }) {
  useSeo(service);
  const [openFaq, setOpenFaq] = useState(null);

  if (!service) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white">
      {/* Header */}
      <header className="border-b border-white/10">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="/" className="font-bold text-lg">US Star Trucking LLC</a>
          <div className="flex items-center gap-5 text-sm">
            <a href="/track" className="text-blue-300 hover:text-white transition hidden sm:block">Track Shipment</a>
            <a href="/#quote-form" className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-bold transition whitespace-nowrap">
              Get Free Quote
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-14">
        {/* Hero */}
        <div className="text-center mb-12">
          <p className="text-blue-300 font-semibold tracking-wide uppercase text-sm mb-3">
            {service.tagline}
          </p>
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">
            {service.emoji} {service.name}
          </h1>
          <p className="mt-5 text-lg text-blue-200 max-w-3xl mx-auto leading-relaxed">
            {service.intro}
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="/#quote-form"
              className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-xl font-bold text-lg transition"
            >
              🚗 Get My Free Quote
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

        {/* Benefits */}
        <section className="mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">Why choose our {service.short.toLowerCase()} service</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {service.benefits.map(([title, text]) => (
              <div key={title} className="rounded-2xl border border-white/15 bg-white/5 p-6">
                <h3 className="font-bold mb-2 text-blue-300">✓ {title}</h3>
                <p className="text-sm text-blue-100 leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing note */}
        <section className="mb-14">
          <div className="rounded-2xl border border-green-400/30 bg-green-500/10 p-6 sm:p-8">
            <h2 className="text-xl font-bold text-green-300 mb-2">💲 What it costs</h2>
            <p className="text-blue-100 leading-relaxed">{service.priceNote}</p>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">
            {service.name} FAQ
          </h2>
          <div className="flex flex-col gap-3">
            {service.faqs.map((f, i) => (
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

        {/* Other services + states */}
        <section className="mb-14">
          <h2 className="text-xl font-bold mb-4 text-blue-200">Our other services:</h2>
          <div className="flex flex-wrap gap-2 mb-8">
            {SERVICES.filter((s) => s.slug !== service.slug).map((s) => (
              <a
                key={s.slug}
                href={`/${s.slug}`}
                className="rounded-full border border-white/15 bg-white/5 hover:bg-white/15 px-4 py-2 text-sm font-semibold text-blue-200 transition"
              >
                {s.emoji} {s.short}
              </a>
            ))}
          </div>
          <h2 className="text-xl font-bold mb-4 text-blue-200">Popular destinations:</h2>
          <div className="flex flex-wrap gap-2">
            {STATES.map((s) => (
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
            Ready to book {service.short.toLowerCase()} shipping?
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