import { useState, useEffect } from "react";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem("cookieConsent");
    if (!accepted) {
      setTimeout(() => setVisible(true), 1500);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem("cookieConsent", "declined");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 left-6 z-50 max-w-md bg-slate-900 text-white rounded-2xl shadow-2xl border border-slate-700 p-6 animate-fade-in">
      <div className="flex items-start gap-3 mb-4">
        <span className="text-3xl">🍪</span>
        <div>
          <h3 className="font-bold text-lg mb-1">We use cookies</h3>
          <p className="text-slate-300 text-sm leading-6">
            We use cookies to improve your experience on our site, analyze traffic, and personalize content. By clicking <strong>Accept</strong>, you agree to our use of cookies.
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
        By using our site you agree to our{" "}
        <a href="#" className="text-blue-400 hover:underline">Privacy Policy</a>
      </p>
    </div>
  );
}
