import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-600">
          API Snap
        </Link>

        {/* Navigation Links */}
        <div className="space-x-6 hidden md:flex">
          <NavLink
            to="/features"
            className={({ isActive }) =>
              isActive ? "text-blue-600 font-medium" : "text-gray-600 hover:text-blue-600"
            }
          >
            Features
          </NavLink>
          <NavLink
            to="/price"
            className={({ isActive }) =>
              isActive ? "text-blue-600 font-medium" : "text-gray-600 hover:text-blue-600"
            }
          >
            Pricing
          </NavLink>
          <NavLink
            to="/docs"
            className={({ isActive }) =>
              isActive ? "text-blue-600 font-medium" : "text-gray-600 hover:text-blue-600"
            }
          >
            Docs
          </NavLink>
        </div>

        {/* Auth Buttons */}
        <div className="space-x-4">
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-2 text-gray-700 border rounded hover:bg-gray-100 transition"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
