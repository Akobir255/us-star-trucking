function Contact() {
  return (
    <section
      id="contact"
      className="bg-slate-900 text-white py-24"
    >
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">
          <h2 className="text-5xl font-extrabold">
            Contact US Star Trucking LLC
          </h2>

          <p className="mt-5 text-xl text-slate-300 max-w-3xl mx-auto">
            Our experienced auto transport specialists are available to answer
            your questions and help you schedule safe, reliable nationwide
            vehicle shipping.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/*  */}

          <div className="bg-slate-800 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition">
            <div className="text-5xl mb-5">📞</div>

            <h3 className="text-2xl font-bold mb-4">
              Call Us
            </h3>

            <a
              href="tel:+18657227114"
              className="text-blue-400 hover:text-blue-300 text-lg font-semibold"
            >
              (865) 722-7114
            </a>

            <p className="mt-4 text-slate-400">
              Monday – Sunday
              <br />
              8:00 AM – 8:00 PM EST
            </p>
          </div>

          {/* Email */}

          <div className="bg-slate-800 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition">
            <div className="text-5xl mb-5">📧</div>

            <h3 className="text-2xl font-bold mb-4">
              Email
            </h3>

            <a
              href="mailto:leo@usstrucking.org"
              className="text-blue-400 hover:text-blue-300 break-all"
            >
              leo@usstrucking.org
            </a>

            <p className="mt-4 text-slate-400">
              We typically respond within
              <br />
              one business hour.
            </p>
          </div>

          {/* Office */}

          <div className="bg-slate-800 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition">
            <div className="text-5xl mb-5">📍</div>

            <h3 className="text-2xl font-bold mb-4">
              Office
            </h3>

            <p className="text-slate-300">
              9111 Cross Park Dr
              <br />
              Suite D200 #1013
              <br />
              Knoxville, TN 37923
            </p>
          </div>

          {/* Authority */}

          <div className="bg-slate-800 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition">
            <div className="text-5xl mb-5">🛡️</div>

            <h3 className="text-2xl font-bold mb-4">
              Licensed & Insured
            </h3>

            <p className="text-slate-300">
              USDOT: <strong>3205543</strong>
              <br />
              MC: <strong>206532</strong>
              <br />
              Nationwide Auto Transport
            </p>

            <div className="mt-5 inline-block bg-green-600 text-white px-4 py-2 rounded-full text-sm font-bold">
              Fully Licensed
            </div>
          </div>

        </div>

        <div className="mt-20 text-center">

          <h3 className="text-3xl font-bold mb-4">
            Ready to Ship Your Vehicle?
          </h3>

          <p className="text-slate-300 mb-8 text-lg">
            Request your free, no-obligation quote today and let our team
            handle the rest.
          </p>

          <a
            href="#quote-form"
            className="inline-block bg-blue-600 hover:bg-blue-700 transition px-10 py-4 rounded-xl font-bold text-lg"
          >
            Get My Free Quote
          </a>

        </div>

      </div>
    </section>
  );
}

export default Contact;