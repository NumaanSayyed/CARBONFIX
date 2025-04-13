// Banner.tsx
import React from 'react';

const Banner: React.FC<{ credits: number; badgeAnimation: boolean; }> = ({ credits, badgeAnimation }) => {
    const getBadgeInfo = (creditAmount: number) => {
        if (creditAmount >= 501) {
            return { type: 'Gold', color: 'bg-yellow-400', icon: 'fa-crown' };
        } else if (creditAmount >= 101) {
            return { type: 'Silver', color: 'bg-gray-300', icon: 'fa-medal' };
        }
        return { type: 'Bronze', color: 'bg-orange-400', icon: 'fa-award' };
    };

    const badgeInfo = getBadgeInfo(credits);

    return (
        <div className="relative h-48 md:h-64 bg-cover bg-center"
            style={{
                backgroundImage: 'url(https://readdy.ai/api/search-image?query=modern abstract background with gradient colors in blue and green tones creating a professional and clean atmosphere perfect for profile hero section minimal design style&width=1440&height=256&orientation=landscape&flag=3e0d1346fe0c29377e5867ccf4d9a0a0)',
            }}>
            <div className="absolute inset-0 bg-black bg-opacity-30"></div>
            <div className="relative h-full flex flex-col md:flex-row items-center justify-center md:justify-start px-4 md:px-8 space-y-4 md:space-y-0 md:space-x-8">
                <div className="relative group">
                    <div className={`w-24 h-24 md:w-32 md:h-32 rounded-full border-4 ${badgeInfo.color} overflow-hidden transition-all duration-300 group-hover:scale-105 relative ${badgeAnimation ? 'animate-pulse' : ''}`}>
                        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <i className={`fas ${badgeInfo.icon} text-4xl md:text-5xl text-white drop-shadow-lg ${badgeAnimation ? 'animate-bounce' : ''}`}></i>
                        </div>
                        <div className="absolute -bottom-1 left-0 right-0 h-1/3 bg-gradient-to-t from-black/30 to-transparent"></div>
                    </div>
                </div>
                <div className="text-center md:text-left text-white">
                    <div className="flex flex-col md:flex-row items-center md:space-x-4">
                        <h1 className="text-2xl md:text-3xl font-bold">Alexander Thompson</h1>
                        <div className={`mt-2 md:mt-0 ${badgeInfo.color} px-6 py-2 rounded-full flex items-center space-x-3 transition-all duration-300 transform hover:scale-105 ${badgeAnimation ? 'animate-pulse shadow-lg shadow-current' : ''}`}>
                            <i className={`fas ${badgeInfo.icon} text-xl ${badgeAnimation ? 'animate-spin' : ''}`}></i>
                            <span className="font-bold text-lg tracking-wide">{badgeInfo.type}</span>
                            <span className="text-sm opacity-75">Level</span>
                        </div>
                    </div>
                    <p className="text-gray-200 mt-2">Environmental Sustainability Lead</p>
                </div>
            </div>
        </div>
    );
};

export default Banner;
