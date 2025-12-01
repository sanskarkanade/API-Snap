import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="bg-white shadow-sm border-b sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-blue-600 tracking-wide"
        >
          API Snap
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8">
          <NavItem to="/features" label="Features" />
          <NavItem to="/price" label="Pricing" />
          <NavItem to="/docs" label="Docs" />
        </div>

        {/* Desktop Buttons */}
        <div className="hidden md:flex space-x-4">
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="px-5 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="px-5 py-2 text-gray-700 border rounded-lg hover:bg-gray-50 transition"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="md:hidden bg-white border-t shadow-sm px-6 py-4 space-y-4"
        >
          <NavItemMobile to="/features" label="Features" onClick={() => setOpen(false)} />
          <NavItemMobile to="/price" label="Pricing" onClick={() => setOpen(false)} />
          <NavItemMobile to="/docs" label="Docs" onClick={() => setOpen(false)} />

          {isLoggedIn ? (
            <button
              onClick={() => {
                handleLogout();
                setOpen(false);
              }}
              className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
            >
              Logout
            </button>
          ) : (
            <div className="space-y-3">
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="block text-center w-full border text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition"
              >
                Login
              </Link>
              <Link
                to="/signup"
                onClick={() => setOpen(false)}
                className="block text-center w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Sign Up
              </Link>
            </div>
          )}
        </motion.div>
      )}
    </motion.nav>
  );
};

/* Reusable Navigation Link Component */
const NavItem = ({ to, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `relative text-gray-600 font-medium hover:text-blue-600 transition ${
        isActive ? "text-blue-600" : ""
      }`
    }
  >
    {({ isActive }) => (
      <>
        {label}
        {isActive && (
          <motion.div
            layoutId="nav-underline"
            className="absolute left-0 -bottom-1 h-[2px] w-full bg-blue-600 rounded"
          />
        )}
      </>
    )}
  </NavLink>
);

/* Mobile Nav Item */
const NavItemMobile = ({ to, label, onClick }) => (
  <NavLink
    to={to}
    onClick={onClick}
    className="block text-gray-700 font-medium py-1 hover:text-blue-600 transition"
  >
    {label}
  </NavLink>
);

export default Navbar;
