function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        <div>
          <h1 className="text-2xl font-bold text-blue-700">
            Nationwide Vehicle Transport
          </h1>

          <p className="text-sm text-gray-500">
            Powered by US Star Trucking LLC
          </p>
        </div>

        <div className="hidden md:flex gap-8 font-medium">
          <a href="#">Home</a>
          <a href="#">Services</a>
          <a href="#">About</a>
          <a href="#">FAQ</a>
          <a href="#">Contact</a>
        </div>

        <div className="text-right">
          <p className="text-blue-700 font-bold">
            (865) 722-7114
          </p>

          <button className="mt-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl">
            Free Quote
          </button>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;