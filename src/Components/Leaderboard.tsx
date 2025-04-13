import React, { useState, useEffect } from "react";
import { backend_url } from "../backend_route";

//static fb for missing avat
const defaultAvatar =
  "https://tse4.mm.bing.net/th?id=OIP.9BVL-wy_acR02ymiRXskpQHaHa&pid=Api&P=0&h=180"; // Fallback image for avatar

const Leaderboard: React.FC = () => {
  const topColleges = [
    { name: "Stanford University", credits: 25890, icon: "🌲" },
    { name: "MIT", credits: 23456, icon: "🌱" },
    { name: "Harvard University", credits: 21234, icon: "🍃" },
    { name: "UC Berkeley", credits: 19876, icon: "🌿" },
  ];

  // Static fallback data for top participants
  const staticTopParticipants = [
    {
      name: "Emma Thompson",
      credits: 1890,
      avatar:
        "https://public.readdy.ai/ai/img_res/65698aece20d0c7a01fa13df646e3817.jpg",
    },
  ];

  // State to hold the top participants fetched from the backend
  const [topParticipants, setTopParticipants] = useState(staticTopParticipants);

  // Fetch top participants from the backend API
  useEffect(() => {
    const fetchTopParticipants = async () => {
      try {
        const response = await fetch(
          `${backend_url}/participants/top-participant`
        ); // Update this URL based on your API endpoint
        const data = await response.json();

        if (response.ok && data.topParticipants) {
          // Map the data from backend to fit the structure needed for the UI
          const participants = data.topParticipants.map((participant: any) => ({
            name: `${participant.first_name} ${participant.last_name}`,
            credits: participant.total_carbon_credits,
            avatar: defaultAvatar, // Set default avatar if not present in backend data
          }));
          setTopParticipants(participants);
        } else {
          setTopParticipants(staticTopParticipants); // Fallback to static data if the response is empty or malformed
        }
      } catch (error) {
        console.error("Error fetching top participants:", error);
        setTopParticipants(staticTopParticipants); // Fallback to static data if there is an error
      }
    };

    fetchTopParticipants();
  }, []);

  return (
    <div className="container mx-auto px-4 sm:px-6 md:px-8 py-16 sm:py-20 md:py-24 bg-white/50 backdrop-blur-sm">
      <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-10 sm:mb-12 text-center">
        Impact Leaderboard
      </h2>

      {/* Leaderboard Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-12">
        <LeaderboardCard title="Top Contributing Colleges" icon="fa-university">
          {topColleges.map((college, index) => (
            <LeaderboardItem
              key={index}
              icon={college.icon}
              name={college.name}
              credits={college.credits}
            />
          ))}
        </LeaderboardCard>

        <LeaderboardCard title="Top Individual Contributors" icon="fa-medal">
          {topParticipants.map((participant, index) => (
            <ParticipantItem
              key={index}
              avatar={participant.avatar}
              name={participant.name}
              credits={participant.credits}
            />
          ))}
        </LeaderboardCard>
      </div>
    </div>
  );
};

const LeaderboardCard: React.FC<{
  title: string;
  icon: string;
  children: React.ReactNode;
}> = ({ title, icon, children }) => (
  <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 transform hover:-translate-y-2 transition-all duration-300">
    <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 flex items-center">
      <i className={`fas ${icon} text-green-600 text-lg sm:text-xl mr-3`}></i>
      {title}
    </h3>
    <div className="space-y-4">{children}</div>
  </div>
);

const LeaderboardItem: React.FC<{
  icon: string;
  name: string;
  credits: number;
}> = ({ icon, name, credits }) => (
  <div className="flex items-center justify-between p-3 sm:p-4 rounded-lg bg-gray-50 hover:bg-green-50 transition-colors duration-300">
    <div className="flex items-center">
      <span className="text-lg sm:text-xl mr-3">{icon}</span>
      <span className="font-semibold text-gray-800 text-sm sm:text-base">
        {name}
      </span>
    </div>
    <div className="text-green-600 font-bold text-sm sm:text-base">
      {credits.toLocaleString()} credits
    </div>
  </div>
);

const ParticipantItem: React.FC<{
  avatar: string;
  name: string;
  credits: number;
}> = ({ avatar, name, credits }) => (
  <div className="flex items-center justify-between p-3 sm:p-4 rounded-lg bg-gray-50 hover:bg-green-50 transition-colors duration-300">
    <div className="flex items-center">
      <img
        src={avatar}
        alt={name}
        className="w-8 sm:w-10 h-8 sm:h-10 rounded-full mr-3 object-cover"
      />
      <span className="font-semibold text-gray-800 text-sm sm:text-base">
        {name}
      </span>
    </div>
    <div className="text-green-600 font-bold text-sm sm:text-base">
      {credits.toLocaleString()} credits
    </div>
  </div>
);

export default Leaderboard;
