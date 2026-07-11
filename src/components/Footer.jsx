function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300 py-12">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-8">

        <div>
          <h3 className="text-2xl font-bold text-white mb-4">
            US Star Auto Transport
          </h3>

          <p>
            Safe, reliable nationwide vehicle shipping for individuals,
            dealerships, military members, and businesses.
          </p>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">
            Quick Links
          </h4>

          <ul className="space-y-2">
            <li>Home</li>
            <li>Services</li>
            <li>FAQ</li>
            <li>Contact</li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">
            Contact
          </h4>

          <p>(865) 722-7114</p>

          <p className="mt-3">
            9111 Cross Park Dr
            <br />
            Suite D200 #1013
            <br />
            Knoxville, TN 37923
          </p>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">
            Licensing
          </h4>

          <p>USDOT: 3205543</p>
          <p>MC: 206532</p>
          <p>Licensed & Insured</p>
        </div>

      </div>

      <div className="border-t border-slate-800 mt-10 pt-6 text-center text-sm">
        © {new Date().getFullYear()} US Star Auto Transport • Powered by US Star Trucking LLC
      </div>
    </footer>
  );
}

export default Footer;