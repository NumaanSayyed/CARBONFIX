import React from "react";

const Leaderboard: React.FC = () => {
    const topColleges = [
        { name: "Stanford University", credits: 25890, icon: "🌲" },
        { name: "MIT", credits: 23456, icon: "🌱" },
        { name: "Harvard University", credits: 21234, icon: "🍃" },
        { name: "UC Berkeley", credits: 19876, icon: "🌿" },
    ];

    const topParticipants = [
        {
            name: "Emma Thompson",
            credits: 1890,
            avatar: "https://public.readdy.ai/ai/img_res/65698aece20d0c7a01fa13df646e3817.jpg",
        },
        {
            name: "Michael Chenasdf",
            credits: 1756,
            avatar: "https://public.readdy.ai/ai/img_res/1f9ae8e2de21abf31b944dc2c71365d2.jpg",
        },
        {
            name: "Sarah Johnson",
            credits: 1634,
            avatar: "https://public.readdy.ai/ai/img_res/59ca1a91946116a79dc77225789bb34a.jpg",
        },
        {
            name: "David Miller",
            credits: 1523,
            avatar: "https://public.readdy.ai/ai/img_res/ee2a87320bb36be3ba9779391e48a0b7.jpg",
        },
    ];

    return (
        <div className="container mx-auto px-4 sm:px-6 md:px-8 py-16 sm:py-20 md:py-24 bg-white/50 backdrop-blur-sm">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-10 sm:mb-12 text-center">
                Impact Leaderboard
            </h2>

            {/* Leaderboard Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-12">
                <LeaderboardCard title="Top Contributing Colleges" icon="fa-university">
                    {topColleges.map((college, index) => (
                        <LeaderboardItem key={index} icon={college.icon} name={college.name} credits={college.credits} />
                    ))}
                </LeaderboardCard>

                <LeaderboardCard title="Top Individual Contributors" icon="fa-medal">
                    {topParticipants.map((participant, index) => (
                        <ParticipantItem key={index} avatar={participant.avatar} name={participant.name} credits={participant.credits} />
                    ))}
                </LeaderboardCard>
            </div>
        </div>
    );
};

const LeaderboardCard: React.FC<{ title: string; icon: string; children: React.ReactNode; }> = ({ title, icon, children }) => (
    <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 transform hover:-translate-y-2 transition-all duration-300">
        <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 flex items-center">
            <i className={`fas ${icon} text-green-600 text-lg sm:text-xl mr-3`}></i>
            {title}
        </h3>
        <div className="space-y-4">{children}</div>
    </div>
);

const LeaderboardItem: React.FC<{ icon: string; name: string; credits: number; }> = ({ icon, name, credits }) => (
    <div className="flex items-center justify-between p-3 sm:p-4 rounded-lg bg-gray-50 hover:bg-green-50 transition-colors duration-300">
        <div className="flex items-center">
            <span className="text-lg sm:text-xl mr-3">{icon}</span>
            <span className="font-semibold text-gray-800 text-sm sm:text-base">{name}</span>
        </div>
        <div className="text-green-600 font-bold text-sm sm:text-base">{credits.toLocaleString()} credits</div>
    </div>
);

const ParticipantItem: React.FC<{ avatar: string; name: string; credits: number; }> = ({ avatar, name, credits }) => (
    <div className="flex items-center justify-between p-3 sm:p-4 rounded-lg bg-gray-50 hover:bg-green-50 transition-colors duration-300">
        <div className="flex items-center">
            <img src={avatar} alt={name} className="w-8 sm:w-10 h-8 sm:h-10 rounded-full mr-3 object-cover" />
            <span className="font-semibold text-gray-800 text-sm sm:text-base">{name}</span>
        </div>
        <div className="text-green-600 font-bold text-sm sm:text-base">{credits.toLocaleString()} credits</div>
    </div>
);

export default Leaderboard;
