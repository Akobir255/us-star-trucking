import { useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

function LegalLayout({ title, updated, slug, description, children }) {
  useEffect(() => {
    document.title = `${title} | US Star Trucking LLC`;
    let desc = document.querySelector('meta[name="description"]');
    if (desc && description) desc.setAttribute("content", description);
    let canonical = document.querySelector('link[rel="canonical"]');
    if (canonical && slug) {
      canonical.setAttribute("href", `https://carshippingservice.org/${slug}`);
    }
  }, [title, slug, description]);

  return (
    <div className="min-h-screen bg-[#000919] pt-28">
      <Navbar />
      <main className="max-w-4xl mx-auto px-6 py-16">
        <div className="bg-white rounded-3xl shadow-2xl p-8 sm:p-12">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-2">{title}</h1>
          <p className="text-sm text-gray-400 mb-8">Last updated: {updated}</p>
          <div className="text-gray-600 leading-7 text-[15px] space-y-4">{children}</div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

const H = ({ children }) => (
  <h2 className="font-bold text-slate-900 text-xl pt-4">{children}</h2>
);

export function PrivacyPolicy() {
  return (
    <LegalLayout title="Privacy Policy" updated="July 16, 2026" slug="privacy-policy" description="Read the privacy policy for US Star Trucking LLC — how we collect, use, and protect your information when you request auto transport quotes or services.">
      <p>
        US Star Trucking LLC ("we", "us") is an FMCSA-authorized auto transport
        broker (USDOT 3205543, MC 206532). This Privacy Policy explains what
        information we collect through this website, how we use it, and the
        choices you have.
      </p>

      <H>Information We Collect</H>
      <p>
        When you request a quote or book a shipment, we collect the information
        you provide: your name, phone number, email address, pickup and
        delivery ZIP codes, preferred pickup date, and vehicle details (year,
        make, model, type, and condition). When you use our shipment tracking
        tool, we process your order number or phone number to locate your
        shipment. We also automatically receive standard technical information
        such as your IP address, browser type, and pages visited.
      </p>

      <H>Cookies & Third-Party Services</H>
      <p>
        With your consent (via the cookie banner), we use the following
        third-party services, each of which may set cookies or process your
        data on our behalf:
      </p>
      <ul className="list-disc pl-5 space-y-2">
        <li>
          <strong>Google Analytics</strong> — anonymous website traffic and
          usage statistics.
        </li>
        <li>
          <strong>Tidio</strong> — the live chat widget, which processes any
          messages and contact details you share in chat.
        </li>
        <li>
          <strong>EmailJS</strong> — used to deliver quote confirmations and
          internal notifications by email.
        </li>
        <li>
          <strong>Vercel</strong> — our website hosting provider, which
          processes standard server logs.
        </li>
      </ul>
      <p>
        If you decline cookies, analytics and the chat widget are not loaded.
        Essential functionality (such as the quote form) works without
        non-essential cookies.
      </p>

      <H>How We Use Your Information</H>
      <p>
        We use your information to calculate shipping estimates, arrange your
        shipment with an independent motor carrier, communicate with you about
        your quote or order, and improve our website. We share your shipment
        details with the motor carrier assigned to transport your vehicle, as
        this is necessary to perform the service. We do not sell your personal
        information.
      </p>

      <H>Communications & Opt-Out</H>
      <p>
        By submitting a quote request, you agree that we may contact you by
        phone, SMS, or email about your quote or shipment. Message and data
        rates may apply. You can opt out of SMS at any time by replying STOP,
        and out of marketing emails via the unsubscribe link in any message, or
        by contacting us directly.
      </p>

      <H>Data Retention</H>
      <p>
        We keep quote and order records for as long as needed to provide our
        services, comply with legal, tax, and regulatory obligations, and
        resolve disputes. You may request deletion of your data at any time
        (see below).
      </p>

      <H>Your Rights</H>
      <p>
        Depending on your state of residence (including under laws such as the
        California Consumer Privacy Act), you may have the right to access,
        correct, or delete the personal information we hold about you, and to
        ask what information we have collected. To exercise any of these
        rights, contact us using the details below. We will respond within the
        timeframe required by applicable law and will not discriminate against
        you for exercising your rights.
      </p>

      <H>Data Security</H>
      <p>
        We use industry-standard measures to protect your personal information,
        including encrypted connections (HTTPS) and access controls. No method
        of transmission or storage is 100% secure, but we work to protect your
        data appropriately.
      </p>

      <H>Children</H>
      <p>
        Our services are intended for adults. We do not knowingly collect
        personal information from children under 13.
      </p>

      <H>Changes to This Policy</H>
      <p>
        We may update this policy from time to time. The "Last updated" date at
        the top shows the latest revision. Material changes will be posted on
        this page.
      </p>

      <H>Contact Us</H>
      <p>
        US Star Trucking LLC
        <br />
        9111 Cross Park Dr, Suite D200 #1013, Knoxville, TN 37923
        <br />
        Phone: <a href="tel:+18657227114" className="text-blue-600 hover:underline">(865) 722-7114</a>
        <br />
        Email: <a href="mailto:leo@usstrucking.org" className="text-blue-600 hover:underline">leo@usstrucking.org</a>
      </p>
    </LegalLayout>
  );
}

export function TermsPage() {
  return (
    <LegalLayout title="Terms & Conditions" updated="July 16, 2026" slug="terms" description="Terms and conditions for auto transport brokerage services provided by US Star Trucking LLC, an FMCSA-authorized broker.">
      <p>
        <strong>US Star Trucking LLC — MC# 206532.</strong> US Star Trucking
        LLC is a registered and bonded property broker. We arrange the
        transport of your vehicle with an independent, FMCSA-licensed and
        insured motor carrier; we do not transport vehicles ourselves. The
        assigned carrier's cargo insurance covers your vehicle while it is in
        transit.
      </p>

      <H>Pricing, Fees & Cancellation</H>
      <ul className="list-disc pl-5 space-y-2">
        <li>Quotes shown on this website are estimates. The final price is confirmed when a carrier is assigned to your route.</li>
        <li>Once the vehicle is picked up, the deposit amount is due and charged to the credit card on file.</li>
        <li>If the Customer needs to change the pick-up or delivery date after the Carrier has been dispatched, a Rescheduling Fee may apply.</li>
        <li>It is the Customer's responsibility to inform the Broker of any modifications on the vehicle that affect size and/or weight.</li>
        <li>If there is a delay including storage, auction, port, towing, or mechanical problems, the Customer may be responsible for a Cancellation Fee and/or a Dry Run Fee of $200.</li>
        <li>If the vehicle is inoperable or oversized, an additional fee of $200.00 applies.</li>
        <li>The Broker has 5 business days from the first available date to find a Carrier. If the Customer cancels before the 5 days expire, a Cancellation Fee of $200 may apply.</li>
        <li>If the Customer cancels after a Carrier is assigned, the reservation will NOT be refunded.</li>
        <li>Pricing may change at the time of assigning a Carrier due to mechanical failure, weather, carrier schedule, or Acts of God.</li>
        <li>The Customer agrees to pay the price as quoted/revised at the time of assigning a Carrier and will not seek a chargeback/refund.</li>
      </ul>

      <H>Service Terms</H>
      <ul className="list-decimal pl-5 space-y-2">
        <li>The Carrier will pick up and deliver as close to your door as legally and safely possible.</li>
        <li>Estimated pickup and delivery dates are not guaranteed. Delays may occur due to weather, road conditions, or mechanical problems.</li>
        <li>The Customer must prepare the vehicle for transport. All loose parts must be removed or secured.</li>
        <li>The Customer must disarm any alarm system or provide proper instructions.</li>
        <li>Personal property in the trunk must not exceed 100 lbs. No explosives, guns, ammunition, live pets, or unlawful contraband.</li>
        <li>Once a carrier is assigned, the Broker will contact the Customer to confirm the schedule.</li>
        <li>The Broker reserves the right to assign a Carrier without prior notification.</li>
        <li>Once the contract is signed, changes to the agreement require a written addendum.</li>
        <li><strong>IMPORTANT:</strong> It is the Customer's responsibility to request the Bill of Lading and condition report at pickup. All damages must be noted on the Bill of Lading and a copy kept until final delivery.</li>
        <li>All claims must be filed with the Carrier within 24 hours of delivery.</li>
        <li>All payments to the Carrier must be in Cash, Cashier's Check, or Money Order.</li>
      </ul>

      <H>Damage Claims & Insurance</H>
      <p>
        The assigned motor carrier is responsible for damage occurring during
        transit and carries cargo insurance as required by federal law. Any
        damage must be noted on the Bill of Lading at delivery and a claim
        filed with the Carrier within 24 hours. We will assist you with the
        claims process and provide the Carrier's insurance information on
        request.
      </p>

      <H>Governing Law</H>
      <p>This Agreement shall be governed by the laws of the State of Tennessee.</p>

      <H>Contact</H>
      <p>
        US Star Trucking LLC | <a href="tel:+18657227114" className="text-blue-600 hover:underline">(865) 722-7114</a> |{" "}
        <a href="mailto:leo@usstrucking.org" className="text-blue-600 hover:underline">leo@usstrucking.org</a> | MC# 206532
      </p>
    </LegalLayout>
  );
}
