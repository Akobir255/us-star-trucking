import { useState, useEffect } from "react";

function PrivacyModal({ onClose }) {
  return (
    <div
      className="fixed inset-0 bg-black/70 z-[60] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-6 border-b sticky top-0 bg-white">
          <h2 className="text-2xl font-bold text-slate-900">Privacy Policy</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-3xl font-bold">✕</button>
        </div>
        <div className="p-6 text-gray-600 leading-7 text-sm">
          <p className="mb-4"><strong>Last updated: July 15, 2026</strong></p>
          <h3 className="font-bold text-slate-900 mb-2">Information We Collect</h3>
          <p className="mb-4">We collect information you provide when requesting a quote, including your name, phone number, email address, pickup and delivery ZIP codes, and vehicle details.</p>
          <h3 className="font-bold text-slate-900 mb-2">Cookies & Analytics</h3>
          <p className="mb-4">Our site uses cookies for analytics (Google Analytics) and live chat functionality (Tidio). These help us understand site traffic and respond to your questions. You can decline non-essential cookies using the banner.</p>
          <h3 className="font-bold text-slate-900 mb-2">How We Use Your Information</h3>
          <p className="mb-4">We use your information solely to provide auto transport quotes and services. We do not sell or share your personal information with third parties except as necessary to arrange your shipment.</p>
          <h3 className="font-bold text-slate-900 mb-2">Data Security</h3>
          <p className="mb-4">We implement industry-standard security measures to protect your personal information from unauthorized access or disclosure.</p>
          <h3 className="font-bold text-slate-900 mb-2">Contact Us</h3>
          <p>If you have questions about this Privacy Policy, contact us at leo@usstrucking.org or call (865) 722-7114.</p>
        </div>
      </div>
    </div>
  );
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [showPolicy, setShowPolicy] = useState(false);

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
    <>
      {showPolicy && <PrivacyModal onClose={() => setShowPolicy(false)} />}

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
          <button onClick={() => setShowPolicy(true)} className="text-blue-400 hover:underline">
            Privacy Policy
          </button>
        </p>
      </div>
    </>
  );
}