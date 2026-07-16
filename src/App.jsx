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
import { PrivacyPolicy, TermsPage } from "./components/LegalPages";
import { getPostBySlug } from "./data/posts";
import { getStateBySlug } from "./data/states";
import { getServiceBySlug } from "./data/services";

function resolvePage(path) {
  if (path === "/track") return <TrackOrder />;
  if (path === "/admin") return <AdminOrders />;
  if (path === "/privacy-policy") return <PrivacyPolicy />;
  if (path === "/terms") return <TermsPage />;

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

  return null; // homepage
}

function App() {
  // Simple path-based routing (no router library needed)
  const path = window.location.pathname.replace(/\/$/, "");
  const page = resolvePage(path);

  // Non-homepage routes: render the page + the consent banner (which also
  // loads analytics/chat for returning visitors who already accepted).
  if (page) {
    return (
      <>
        {page}
        <CookieConsent />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-[#000919] pt-28">
      <Navbar />
      <Hero />
      <div className="bg-gradient-to-b from-[#04356A] to-[#000919]">
        <TrustBar />
        <div className="pb-24">
          <QuoteForm />
        </div>
      </div>
      <div className="bg-[#000919]">
        <Services />
      </div>
      <div className="bg-[#001D3F]">
        <HowItWorks />
      </div>
      <div className="bg-[#000919]">
        <Stats />
      </div>
      <div className="bg-[#001D3F]">
        <WhyChooseUs />
      </div>
      <div className="bg-[#000919]">
        <Reviews />
      </div>
      <div className="bg-[#001D3F]">
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