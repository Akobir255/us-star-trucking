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
import RecentShipments from "./components/RecentShipments";
import Promotions from "./components/Promotions";
import CookieConsent from "./components/CookieConsent";
import TrackOrder from "./components/TrackOrder";
import AdminOrders from "./components/AdminOrders";
import StatePage from "./components/StatePage";
import ServicePage from "./components/ServicePage";
import { BlogIndex, BlogPost } from "./components/Blog";
import { PrivacyPolicy, TermsPage } from "./components/LegalPages";
import NotFound from "./components/NotFound";
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

  // Homepage
  if (path === "" || path === "/") return null;

  // Anything else is a real 404 — never silently render the homepage
  return <NotFound />;
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
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:bg-white focus:text-blue-700 focus:font-bold focus:px-4 focus:py-2 focus:rounded-lg"
      >
        Skip to main content
      </a>
      <Navbar />
      <main id="main-content">
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
      <RecentShipments />
      <div className="bg-[#001D3F]">
        <FAQ />
      </div>
      <Promotions />
      <Contact />
      </main>
      <Footer />
      <FloatingButtons />
      <CookieConsent />
    </div>
  );
}

export default App;