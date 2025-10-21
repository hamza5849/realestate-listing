import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ handleLogout, loggedOut }) => {
  return (
    <nav className="bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600 shadow-lg border-b border-gray-300 px-6 py-4 w-full">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <h1 className="text-3xl font-extrabold text-white hover:text-gray-200 transition-colors duration-300 drop-shadow-md">
          Real Estate
        </h1>
        <div className="flex gap-8 items-center">
          {loggedOut ? (
            <>
              <Link
                to="/login"
                className="text-white hover:text-yellow-300 font-semibold transition-all duration-300 transform hover:scale-105 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-yellow-300 after:transition-all after:duration-300 hover:after:w-full"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-yellow-500 text-indigo-900 px-6 py-3 rounded-full hover:bg-yellow-400 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg font-semibold"
              >
                Signup
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/add-property"
                className="text-white hover:text-green-300 font-semibold transition-all duration-300 transform hover:scale-105 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-green-300 after:transition-all after:duration-300 hover:after:w-full"
              >
                Add Property
              </Link>
              <Link
                to="/my-properties"
                className="text-white hover:text-green-300 font-semibold transition-all duration-300 transform hover:scale-105 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-green-300 after:transition-all after:duration-300 hover:after:w-full"
              >
                My Properties
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-6 py-3 rounded-full hover:bg-red-400 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg font-semibold"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
