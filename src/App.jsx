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

function App() {
  // Simple path-based routing (no router library needed)
  const path = window.location.pathname.replace(/\/$/, "");

  if (path === "/track") return <TrackOrder />;
  if (path === "/admin") return <AdminOrders />;

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