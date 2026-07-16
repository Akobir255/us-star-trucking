import { useEffect } from "react";
import Navbar from "./components/Navbar";
import FAQ from "./components/FAQ";
import FloatingButtons from "./components/FloatingButtons";
import Hero from "./components/Hero";
import Services from "./components/Services";
import WhyChooseUs from "./components/WhyChooseUs";
import Footer from "./components/Footer";
import HowItWorks from "./components/HowItWorks";
import QuoteForm from "./components/QuoteForm";
import TrustBar from "./components/TrustBar";
import Contact from "./components/Contact";
import Stats from "./components/Stats";
import Reviews from "./components/Reviews";
import Promotions from "./components/Promotions";
import CookieConsent from "./components/CookieConsent";
import TrackOrder from "./components/TrackOrder";
import AdminOrders from "./components/AdminOrders";
import StatePage from "./components/StatePage";
import ServicePage from "./components/ServicePage";
import { BlogIndex, BlogPost } from "./components/Blog";
import { getPostBySlug } from "./data/posts";
import { getStateBySlug } from "./data/states";
import { getServiceBySlug } from "./data/services";

function App() {
  // Scroll to anchor sections, then remove the "#..." from the address bar
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (!hash) return;
      const el = document.getElementById(hash.slice(1));
      if (el) el.scrollIntoView({ behavior: "smooth" });
      window.history.replaceState(null, "", window.location.pathname + window.location.search);
    };
    handleHash(); // on first load (e.g. arriving at /#quote-form from a service page)
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  // Simple path-based routing (no router library needed)
  const path = window.location.pathname.replace(/\/$/, "");

  if (path === "/track") return <TrackOrder />;
  if (path === "/admin") return <AdminOrders />;

  // State SEO pages: /car-shipping-california, /car-shipping-texas, ...
  const stateMatch = path.match(/^\/car-shipping-([a-z-]+)$/);
  if (stateMatch) {
    const state = getStateBySlug(stateMatch[1]);
    if (state) return <StatePage state={state} />;
  }

  // Service SEO pages: /door-to-door-auto-transport, /motorcycle-shipping, ...
  const service = getServiceBySlug(path.slice(1));
  if (service) return <ServicePage service={service} />;

  // Blog: /blog and /blog/<slug>
  if (path === "/blog") return <BlogIndex />;
  const postMatch = path.match(/^\/blog\/([a-z0-9-]+)$/);
  if (postMatch) {
    const post = getPostBySlug(postMatch[1]);
    if (post) return <BlogPost post={post} />;
  }

  return (
    <div className="min-h-screen bg-blue-100 pt-28">
      <Navbar />
      <Hero />
      <div className="bg-gradient-to-b from-blue-900 to-slate-950">
        <TrustBar />
        <div className="pb-24">
          <QuoteForm />
        </div>
      </div>
      <div className="bg-blue-100">
        <Services />
      </div>
      <div className="bg-blue-200">
        <HowItWorks />
      </div>
      <div className="bg-blue-100">
        <Stats />
      </div>
      <div className="bg-blue-200">
        <WhyChooseUs />
      </div>
      <div className="bg-blue-100">
        <Reviews />
      </div>
      <div className="bg-blue-200">
        <FAQ />
      </div>
      <Promotions />
      <Contact />
      <Footer />
      <FloatingButtons />
      <CookieConsent />
    </div>
  );
}

export default App;