import React from "react";

const Footer = () => {
  return (
    <footer className="bg-indigo-700 text-white mt-16">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Column 1 */}
        <div>
          <h2 className="text-2xl font-bold mb-3">Real Estate</h2>
          <p className="text-indigo-100">
            Find your dream property easily. We connect buyers and sellers for a
            smooth real estate experience.
          </p>
        </div>

        {/* Column 2 */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <a href="/my-properties" className="hover:text-gray-300">
                My Properties
              </a>
            </li>
            <li>
              <a href="/add-property" className="hover:text-gray-300">
                Add Property
              </a>
            </li>
            <li>
              <a href="/login" className="hover:text-gray-300">
                Login
              </a>
            </li>
            <li>
              <a href="/signup" className="hover:text-gray-300">
                Signup
              </a>
            </li>
          </ul>
        </div>

        {/* Column 3 */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Contact Us</h3>
          <p>Email: <a href="mailto:info@realestate.com" className="hover:text-gray-300">info@realestate.com</a></p>
          <p>Phone: <a href="tel:+1234567890" className="hover:text-gray-300">+1 234 567 890</a></p>
          <div className="flex gap-4 mt-3">
            <a href="#" className="hover:text-gray-300">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="hover:text-gray-300">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="hover:text-gray-300">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-indigo-500 mt-8 py-4 text-center text-indigo-200 text-sm">
        © {new Date().getFullYear()} Real Estate Listing. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
