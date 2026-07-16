import { useState } from "react";
import { STATES } from "../data/states";
import { SERVICES } from "../data/services";

function Modal({ title, onClose, children }) {
  return (
    <div
      className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-6 border-b sticky top-0 bg-white">
          <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-3xl font-bold">✕</button>
        </div>
        <div className="p-6 text-gray-600 leading-7 text-sm">{children}</div>
      </div>
    </div>
  );
}

function Footer() {
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  return (
    <footer className="bg-slate-950 text-slate-300">

      {showPrivacy && (
        <Modal title="Privacy Policy" onClose={() => setShowPrivacy(false)}>
          <p className="mb-4"><strong>Last updated: July 15, 2026</strong></p>
          <h3 className="font-bold text-slate-900 mb-2">Information We Collect</h3>
          <p className="mb-4">We collect information you provide when requesting a quote, including your name, phone number, email address, pickup and delivery ZIP codes, and vehicle details.</p>
          <h3 className="font-bold text-slate-900 mb-2">How We Use Your Information</h3>
          <p className="mb-4">We use your information solely to provide auto transport quotes and services. We do not sell or share your personal information with third parties except as necessary to arrange your shipment.</p>
          <h3 className="font-bold text-slate-900 mb-2">Data Security</h3>
          <p className="mb-4">We implement industry-standard security measures to protect your personal information from unauthorized access or disclosure.</p>
          <h3 className="font-bold text-slate-900 mb-2">Contact Us</h3>
          <p>If you have questions about this Privacy Policy, contact us at leo@usstrucking.org or call (865) 722-7114.</p>
        </Modal>
      )}

      {showTerms && (
        <Modal title="Terms & Conditions" onClose={() => setShowTerms(false)}>
          <p className="mb-4"><strong>US Star Trucking LLC — MC# 206532</strong></p>
          <h3 className="font-bold text-slate-900 mb-2">Additional Information and Cancellation Fees</h3>
          <ul className="list-disc pl-5 mb-4 space-y-2">
            <li>Once the vehicle is picked up, the deposit amount is due and charged to the credit card on file.</li>
            <li>If the Customer needs to change the pick-up or delivery date after the Carrier has been dispatched, a Rescheduling Fee may apply.</li>
            <li>It is the Customer's responsibility to inform the Broker of any modifications on the vehicle that affect size and/or weight.</li>
            <li>If there is a delay including storage, auction, port, towing, or mechanical problems, the Customer may be responsible for a Cancellation Fee and/or a Dry Run Fee of $200.</li>
            <li>Once the contract is signed, all future conversations by phone, email, or text are null and void. Any changes require a written addendum.</li>
            <li><strong>IMPORTANT:</strong> It is the Customer's responsibility to request the Bill of Lading and condition report at pickup. All damages must be noted and a copy kept until final delivery.</li>
            <li>The Broker has 5 business days from the first available date to find a Carrier. If the Customer cancels before the 5 days expire, a Cancellation Fee of $200 may apply.</li>
            <li>The Broker reserves the right to assign a Carrier without prior notification.</li>
            <li>Pricing may change at the time of assigning a Carrier due to mechanical failure, weather, carrier schedule, or Acts of God.</li>
            <li>The Customer agrees to pay the price as quoted/revised at the time of assigning a Carrier and will not seek a chargeback/refund.</li>
          </ul>
          <h3 className="font-bold text-slate-900 mb-2">Terms and Conditions</h3>
          <ul className="list-decimal pl-5 mb-4 space-y-2">
            <li>US Star Trucking LLC is a registered and bonded property broker (MC-206532).</li>
            <li>The Carrier will pick up and deliver as close to your door as legally and safely possible.</li>
            <li>Estimated pickup and delivery dates are not guaranteed. Delays may occur due to weather, road conditions, or mechanical problems.</li>
            <li>The Customer must prepare the vehicle for transport. All loose parts must be removed or secured.</li>
            <li>The Customer must disarm any alarm system or provide proper instructions.</li>
            <li>Personal property in the trunk must not exceed 100 lbs. No explosives, guns, ammunition, live pets, or unlawful contraband.</li>
            <li>If the vehicle is inoperable or oversized, an additional fee of $200.00 applies.</li>
            <li>Once a carrier is assigned, the Broker will contact the Customer to confirm the schedule.</li>
            <li>If the Customer cancels after a Carrier is assigned, the reservation will NOT be refunded.</li>
            <li>All claims must be filed with the Carrier within 24 hours of delivery.</li>
            <li>All payments to the Carrier must be in Cash, Cashier's Check, or Money Order.</li>
          </ul>
          <h3 className="font-bold text-slate-900 mb-2">Governing Law</h3>
          <p className="mb-4">This Agreement shall be governed by the laws of the State of Tennessee.</p>
          <h3 className="font-bold text-slate-900 mb-2">Contact</h3>
          <p>US Star Trucking LLC | (865) 722-7114 | leo@usstrucking.org | MC# 206532</p>
        </Modal>
      )}

      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">

          <div>
            <h2 className="text-3xl font-bold text-white mb-5">US Star Trucking LLC</h2>
            <p className="leading-7 text-slate-400">
              Reliable nationwide vehicle shipping with licensed and insured
              carriers. Safe, affordable door-to-door auto transport across all 50 states.
            </p>
            <div className="flex gap-3 mt-6">
              <span className="bg-blue-600 px-3 py-1 rounded-full text-sm text-white">Licensed</span>
              <span className="bg-green-600 px-3 py-1 rounded-full text-sm text-white">Insured</span>
            </div>

            {/* Social Media */}
            <div className="flex gap-3 mt-6">
              <a
                href="https://www.facebook.com/groups/carshipment"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 hover:bg-blue-700 text-white w-10 h-10 rounded-full flex items-center justify-center text-lg transition"
                title="Facebook"
              >
                f
              </a>
              <a
                href="https://www.instagram.com/usstartrucking/?hl=en"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-br from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white w-10 h-10 rounded-full flex items-center justify-center text-lg transition"
                title="Instagram"
              >
                📷
              </a>
              <a
                href="https://www.linkedin.com/company/usstartruckingllc"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-700 hover:bg-blue-800 text-white w-10 h-10 rounded-full flex items-center justify-center text-lg transition"
                title="LinkedIn"
              >
                in
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-white mb-5">Quick Links</h3>
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-blue-400">Home</a></li>
              <li><a href="#quote-form" className="hover:text-blue-400">Free Quote</a></li>
              <li><a href="/track" className="hover:text-blue-400">📦 Track Shipment</a></li>
              <li><a href="/blog" className="hover:text-blue-400">📰 Blog & Guides</a></li>
              <li><a href="#services" className="hover:text-blue-400">Services</a></li>
              <li><a href="#reviews" className="hover:text-blue-400">Reviews</a></li>
              <li><a href="#faq" className="hover:text-blue-400">FAQ</a></li>
              <li><a href="#contact" className="hover:text-blue-400">Contact</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold text-white mb-5">Contact</h3>
            <p className="mb-3">
              📞{" "}
              <a href="tel:+18657227114" className="hover:text-blue-400 font-semibold">
                (865) 722-7114
              </a>
            </p>
            <p className="mb-3">
              📧{" "}
              <a href="mailto:leo@usstrucking.org" className="hover:text-blue-400">
                leo@usstrucking.org
              </a>
            </p>
            <p>
              📍 9111 Cross Park Dr<br />
              Suite D200 #1013<br />
              Knoxville, TN 37923
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold text-white mb-5">Business Information</h3>
            <p className="mb-2"><strong>USDOT:</strong> 3205543</p>
            <p className="mb-2"><strong>MC:</strong> 206532</p>
            <p className="mb-2">Nationwide Auto Transport</p>
            <p className="text-green-400 font-semibold mt-3">✓ Fully Licensed & Insured</p>
            <div className="mt-5 space-y-2">
              <a
                href="https://safer.fmcsa.dot.gov/query.asp?searchtype=ANY&query_type=queryCarrierSnapshot&query_param=USDOT&query_string=3205543"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-blue-400 hover:text-blue-300 text-sm"
              >
                🏛️ Verify FMCSA License →
              </a>
              <a
                href="https://www.facebook.com/groups/carshipment"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-blue-400 hover:text-blue-300 text-sm"
              >
                👥 Join our Facebook Group →
              </a>
            </div>
          </div>

        </div>

        {/* Popular shipping destinations — state SEO pages */}
        <div className="mt-14 pt-10 border-t border-slate-800">
          <h3 className="text-xl font-bold text-white mb-5">Our Services</h3>
          <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm mb-10">
            {SERVICES.map((s) => (
              <a
                key={s.slug}
                href={`/${s.slug}`}
                className="hover:text-blue-400 transition"
              >
                {s.emoji} {s.name}
              </a>
            ))}
          </div>

          <h3 className="text-xl font-bold text-white mb-5">Popular Shipping Destinations</h3>
          <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm">
            {STATES.map((s) => (
              <a
                key={s.slug}
                href={`/car-shipping-${s.slug}`}
                className="hover:text-blue-400 transition"
              >
                Car Shipping to {s.name}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} US Star Trucking LLC. All Rights Reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <button onClick={() => setShowPrivacy(true)} className="hover:text-blue-400 transition">
              Privacy Policy
            </button>
            <button onClick={() => setShowTerms(true)} className="hover:text-blue-400 transition">
              Terms & Conditions
            </button>
            <a href="#quote-form" className="hover:text-blue-400">Get Quote</a>
          </div>
        </div>
      </div>

    </footer>
  );
}

export default Footer;