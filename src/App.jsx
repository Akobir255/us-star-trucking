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

function App() {
  return (
    <div className="min-h-screen bg-slate-50 pt-20">
      <Navbar />
      <Hero />
      <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-blue-900 pb-20">
        <TrustBar />
        <QuoteForm />
      </div>
      <Services />
      <HowItWorks />
      <Stats />
      <WhyChooseUs />
      <Reviews />
      <FAQ />
      <Promotions />
      <Contact />
      <Footer />
      <FloatingButtons />
    </div>
  );
}

export default App;