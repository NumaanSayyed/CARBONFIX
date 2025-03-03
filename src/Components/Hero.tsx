import React, { useEffect, useState } from "react";

const Hero: React.FC = () => {
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="relative h-[90vh] sm:h-screen flex items-center pt-16 sm:pt-20 overflow-hidden">
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-green-900/20 to-emerald-900/20"></div>

            {/* Floating Particles */}
            <div className="absolute inset-0 animate-float-particles">
                {[...Array(15)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute animate-float"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 5}s`,
                            transform: `scale(${0.3 + Math.random() * 0.7})`,
                        }}
                    >
                        <i className={`fas fa-${["leaf", "tint", "sun", "cloud"][Math.floor(Math.random() * 4)]} text-white/20 text-sm sm:text-lg md:text-2xl`}></i>
                    </div>
                ))}
            </div>

            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center transform transition-transform duration-1000"
                style={{
                    backgroundImage: "url('/Images/HERO-BG.jpg')",
                    transform: `translateY(${Math.min(scrollY * 0.2, 100)}px)`,
                }}
            ></div>

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-40 sm:bg-opacity-30"></div>

            {/* Hero Content */}
            <div className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 relative z-10">
                <div className="max-w-2xl sm:max-w-3xl text-white text-center sm:text-left">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-green-300 to-emerald-200">
                        Join the Movement. Offset Carbon. Build a Greener Future.
                    </h1>
                    
                   
                </div>
            </div>
        </div>
    );
};

export default Hero;
