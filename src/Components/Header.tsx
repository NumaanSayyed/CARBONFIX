import React, { useState } from "react";
import { Link } from "react-router-dom";

interface HeaderProps {
    isScrolled: boolean;
    activeNav: string;
    setActiveNav: (nav: string) => void;
}

const Header: React.FC<HeaderProps> = ({ isScrolled, activeNav, setActiveNav }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? "bg-white shadow-lg" : "bg-transparent"}`}>
            <div className="container mx-auto px-6">
                <div className="flex items-center justify-between h-16 sm:h-20">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link to="/" className={`text-xl sm:text-2xl font-bold ${isScrolled ? "text-green-700" : "text-white"}`}>
                            <i className="fas fa-globe-americas mr-2"></i>
                            CarbonFix
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-6">
                        {[
                            { id: "home", label: "Home", route: "/" },
                            { id: "programs", label: "Programs", route: "/program" },
                        ].map((item) => (
                            <Link
                                to={item.route}
                                key={item.id}
                                onClick={() => setActiveNav(item.id)}
                                className={`text-sm font-semibold transition-all duration-300 relative
                  ${isScrolled ? "text-gray-800 hover:text-green-600" : "text-white hover:text-green-200"}
                  ${activeNav === item.id ? 'after:content-[""] after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-0.5 after:bg-current' : ""}`}
                            >
                                {item.label}
                            </Link>
                        ))}
                        <Link to='/login' className="bg-green-500 hover:bg-green-600 text-white px-5 sm:px-6 py-2 text-sm font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg whitespace-nowrap">
                            <i className="fas fa-user-plus mr-2"></i>
                            Join Now
                        </Link>
                    </div>

                    {/* Mobile Menu Button (Hamburger) */}
                    <button className="md:hidden text-2xl text-gray-800 z-50 relative" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        <i className={`fas ${isMenuOpen ? "fa-times" : "fa-bars"} ${isScrolled ? "text-gray-800" : "text-white"}`}></i>
                    </button>
                </div>

                {/* Mobile Navigation - Fullscreen Sidebar */}
                {isMenuOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-end">
                        <div className="w-3/4 max-w-xs h-full bg-white shadow-lg flex flex-col py-8 px-6">
                            <button className="absolute top-4 right-4 text-gray-600 text-2xl" onClick={() => setIsMenuOpen(false)}>
                                <i className="fas fa-times"></i>
                            </button>

                            <nav className="flex flex-col space-y-6">
                                {[
                                    { id: "home", label: "Home", route: "/" },
                                    { id: "programs", label: "Programs", route: "/program" },
                                ].map((item) => (
                                    <Link
                                        to={item.route}
                                        key={item.id}
                                        onClick={() => {
                                            setActiveNav(item.id);
                                            setIsMenuOpen(false);
                                        }}
                                        className="text-gray-800 text-lg font-medium py-2 px-3 rounded hover:bg-green-100 hover:text-green-600 transition-all"
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                                <button className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg whitespace-nowrap">
                                    <i className="fas fa-user-plus mr-2"></i>
                                    Join Now
                                </button>
                            </nav>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Header;
