"use client";

import Link from "next/link";
import { useState } from "react";
import { FiSun, FiMoon } from "react-icons/fi";
import { NavbarProps } from '../../utils/types/types';

const Navbar: React.FC<NavbarProps> = ({ toggleDarkMode, darkMode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <nav className="bg-gray-800 text-white py-4 dark:bg-gray-900">
      <div className="container mx-auto flex justify-between items-center">
        <Link className="text-2xl font-bold" href="/">
          🎬 Movie Library
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6 items-center">
          <Link className="hover:text-blue-400" href="/">
            Home
          </Link>
          <Link className="hover:text-blue-400" href="/favorites">
            Favorites
          </Link>

          {/* Dark Mode Toggle */}
          <div
            onClick={toggleDarkMode}
            className="flex items-center cursor-pointer pr-5"
            aria-label={
              darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"
            }
          >
            <FiSun
              className={`text-yellow-400 ${
                darkMode ? "opacity-50" : "opacity-100"
              }`}
              size={20}
            />
            <div
              className={`mx-2 w-10 h-5 flex items-center rounded-full p-1 transition-all duration-300 ${
                darkMode ? "bg-gray-600" : "bg-yellow-400"
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full shadow-md transform transition-transform ${
                  darkMode
                    ? "translate-x-5 bg-white"
                    : "translate-x-0 bg-gray-800"
                }`}
              ></div>
            </div>
            <FiMoon
              className={`text-gray-300 ${
                darkMode ? "opacity-100" : "opacity-50"
              }`}
              size={20}
            />
          </div>
        </div>

        {/* Mobile Menu and Dark Mode Toggle */}
        <div className="md:hidden flex items-center space-x-4 pr-5">
          <div
            onClick={toggleDarkMode}
            className="flex items-center cursor-pointer"
            aria-label={
              darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"
            }
          >
            <FiSun
              className={`text-yellow-400 ${
                darkMode ? "opacity-50" : "opacity-100"
              }`}
              size={20}
            />
            <div
              className={`mx-2 w-10 h-5 flex items-center rounded-full p-1 transition-all duration-300 ${
                darkMode ? "bg-gray-600" : "bg-yellow-400"
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full shadow-md transform transition-transform ${
                  darkMode
                    ? "translate-x-5 bg-white"
                    : "translate-x-0 bg-gray-800"
                }`}
              ></div>
            </div>
            <FiMoon
              className={`text-gray-300 ${
                darkMode ? "opacity-100" : "opacity-50"
              }`}
              size={20}
            />
          </div>

          {/* Hamburger Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="hover:text-blue-400"
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Menu Links */}
      {isMenuOpen && (
        <div className="md:hidden flex flex-col space-y-2 mt-2 pl-3">
          <Link className="hover:text-blue-400" href="/">
            Home
          </Link>
          <Link className="hover:text-blue-400" href="/favorites">
            Favorites
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
