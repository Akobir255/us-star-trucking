import { useState, useEffect } from "react";

const GA_ID = "G-RG3KEMN5W9";
const TIDIO_SRC = "//code.tidio.co/qgbial9mocqxxk4valcyluyti9dixfrh.js";

// Injects Google Analytics + Tidio. Called only after the visitor accepts.
function loadTrackingScripts() {
  if (window.__trackingLoaded) return;
  window.__trackingLoaded = true;

  // Google Analytics (gtag.js)
  const ga = document.createElement("script");
  ga.async = true;
  ga.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(ga);

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag("js", new Date());
  gtag("config", GA_ID);

  // Tidio live chat
  const tidio = document.createElement("script");
  tidio.async = true;
  tidio.src = TIDIO_SRC;
  document.body.appendChild(tidio);
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (consent === "accepted") {
      // Returning visitor who already accepted — load immediately.
      loadTrackingScripts();
    } else if (!consent) {
      const t = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(t);
    }
    // "declined" → load nothing, show nothing.
  }, []);

  const accept = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setVisible(false);
    loadTrackingScripts();
  };

  const decline = () => {
    localStorage.setItem("cookieConsent", "declined");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed bottom-6 left-6 z-50 max-w-md bg-slate-900 text-white rounded-2xl shadow-2xl border border-slate-700 p-6 animate-fade-in"
    >
      <div className="flex items-start gap-3 mb-4">
        <span className="text-3xl" aria-hidden="true">🍪</span>
        <div>
          <h3 className="font-bold text-lg mb-1">We use cookies</h3>
          <p className="text-slate-300 text-sm leading-6">
            With your permission we use cookies for analytics (Google
            Analytics) and live chat (Tidio). If you decline, these services
            are not loaded — the site still works normally.
          </p>
        </div>
      </div>

      <div className="flex gap-3 mt-2">
        <button
          onClick={accept}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl transition"
        >
          Accept All
        </button>
        <button
          onClick={decline}
          className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded-xl transition"
        >
          Decline
        </button>
      </div>

      <p className="text-slate-500 text-xs mt-3 text-center">
        Read our{" "}
        <a href="/privacy-policy" className="text-blue-400 hover:underline">
          Privacy Policy
        </a>{" "}
        for details. You can change your choice anytime via "Cookie
        Preferences" in the footer.
      </p>
    </div>
  );
}
