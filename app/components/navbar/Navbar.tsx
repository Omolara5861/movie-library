"use client";

import Link from "next/link";
import { useState } from "react";
import { FiSun, FiMoon } from "react-icons/fi"; // Importing icons

interface NavbarProps {
    toggleDarkMode: () => void;
    darkMode: boolean;
}

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
                    <button
                        onClick={toggleDarkMode}
                        className="text-xl p-2 rounded hover:bg-gray-700 dark:hover:bg-gray-300"
                        aria-label={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                    >
                        {darkMode ? <FiSun className="text-yellow-400" /> : <FiMoon />}
                    </button>
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={toggleMobileMenu}
                    className="md:hidden hover:text-blue-400"
                >
                    ☰
                </button>
            </div>

            {/* Mobile Menu Links */}
            {isMenuOpen && (
                <div className="md:hidden flex flex-col space-y-2 mt-2">
                    <Link className="hover:text-blue-400" href="/">
                        Home
                    </Link>
                    <Link className="hover:text-blue-400" href="/favorites">
                        Favorites
                    </Link>

                    {/* Dark Mode Toggle in Mobile Menu */}
                    <button
                        onClick={toggleDarkMode}
                        className="text-xl p-2 rounded hover:bg-gray-700 dark:hover:bg-gray-300"
                        aria-label={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                    >
                        {darkMode ? <FiSun className="text-yellow-400" /> : <FiMoon />}
                    </button>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
