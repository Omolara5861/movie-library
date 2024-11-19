"use client"

import Link from 'next/link';
import { useState } from 'react';

const Navbar: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMobileMenu = () => setIsMenuOpen((prev) => !prev);

    return (
        <nav className="bg-gray-800 text-white py-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link className="text-2xl font-bold" href="/">
                    🎬 Movie Library
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex space-x-6">
                    <Link className="hover:text-blue-400" href="/">
                        Home
                    </Link>
                    <Link className="hover:text-blue-400" href="/favorites">
                        Favorites
                    </Link>
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
                </div>
            )}
        </nav>
    );
};

export default Navbar;