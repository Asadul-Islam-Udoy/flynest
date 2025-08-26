import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo / Brand */}
        <motion.div
          className="text-2xl font-bold cursor-pointer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Flynest School
        </motion.div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 font-semibold">
          <Link to="/" className="hover:text-yellow-300 transition-colors">Home</Link>
          <Link to="/users" className="hover:text-yellow-300 transition-colors">Users</Link>
          <Link to="/students" className="hover:text-yellow-300 transition-colors">Students</Link>
          <Link to="/classes" className="hover:text-yellow-300 transition-colors">Classes</Link>
        </div>

        {/* User Action */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <motion.button
              onClick={logout}
              className="bg-red-500 px-4 py-2 rounded-lg shadow-lg hover:bg-red-600 transition-colors"
              whileHover={{ scale: 1.05 }}
            >
              Logout
            </motion.button>
          ) : (
            <Link
              to="/login"
              className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold shadow-lg hover:bg-gray-100 transition-colors"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setIsOpen(!isOpen)}>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          className="md:hidden mt-4 flex flex-col gap-3 text-white font-semibold"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/users" onClick={() => setIsOpen(false)}>Users</Link>
          <Link to="/students" onClick={() => setIsOpen(false)}>Students</Link>
          <Link to="/classes" onClick={() => setIsOpen(false)}>Classes</Link>
          {user ? (
            <button
              onClick={() => { logout(); setIsOpen(false); }}
              className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Login
            </Link>
          )}
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
