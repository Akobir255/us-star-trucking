import logo from "../assets/usstar-logo.jpg";
function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo and Company Name */}
        <div className="flex items-center gap-4">
          <img
            src={logo}
            alt="Nationwide Vehicle Transport"
            className="h-14 w-auto"
          />

          <div>
            <h1 className="text-2xl font-bold text-blue-700">
              Nationwide Vehicle Transport
            </h1>

            <p className="text-sm text-gray-500">
              Powered by US Star Trucking LLC
            </p>
          </div>
        </div>

        {/* Navigation */}
        <div className="hidden md:flex gap-8 font-medium">
          <a href="#" className="hover:text-blue-600">Home</a>
          <a href="#" className="hover:text-blue-600">Services</a>
          <a href="#" className="hover:text-blue-600">About</a>
          <a href="#" className="hover:text-blue-600">FAQ</a>
          <a href="#" className="hover:text-blue-600">Contact</a>
        </div>

        {/* Phone & Button */}
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