function Contact() {
  return (
    <section className="bg-slate-900 text-white py-20">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center mb-4">
          Contact Nationwide Vehicle Transport
        </h2>

        <p className="text-center text-slate-300 mb-12">
          Have questions? Our team is ready to help you ship your vehicle safely and on time.
        </p>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="bg-slate-800 rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-4">📞 Call Us</h3>

            <p className="text-slate-300">
              <a
                href="tel:+18657227114"
                className="hover:text-blue-400"
              >
                (865) 722-7114
              </a>
            </p>
          </div>

          <div className="bg-slate-800 rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-4">📍 Office</h3>

            <p className="text-slate-300">
              9111 Cross Park Dr
              <br />
              Suite D200 #1013
              <br />
              Knoxville, TN 37923
            </p>
          </div>

          <div className="bg-slate-800 rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-4">🛡️ Authority</h3>

            <p className="text-slate-300">
              USDOT: 3205543
              <br />
              MC: 206532
              <br />
              Licensed & Insured
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}

export default Contact;