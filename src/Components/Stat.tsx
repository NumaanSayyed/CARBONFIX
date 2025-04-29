import React from "react";

interface StatsProps {
  carbonSaved: number;
  college: number;
  participants: number;
  carbonCredits: number;
}

const Stats: React.FC<StatsProps> = ({
  carbonSaved,
  college,
  participants,
  carbonCredits,
}) => {
  return (
    <div className="container mx-auto px-6 -mt-32 relative z-20">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <StatCard
          icon="fa-cloud"
          value={carbonSaved}
          label="Active Participants"
        />
        <StatCard icon="fa-tree" value={college} label="Service Providers " />
        <StatCard icon="fa-users" value={participants} label="Colleges" />
        <StatCard
          icon="fas fa-seedling"
          value={carbonCredits}
          label="Carbon Credits"
        />
      </div>
    </div>
  );
};

const StatCard: React.FC<{ icon: string; value: number; label: string }> = ({
  icon,
  value,
  label,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-xl p-8 transform hover:-translate-y-2 transition-all duration-300">
      <div className="text-green-600 text-4xl mb-4">
        <i className={`fas ${icon}`}></i>
      </div>
      <div className="text-4xl font-bold text-gray-800 mb-2">
        {value}
      </div>
      <div className="text-lg text-gray-600">{label}</div>
    </div>
  );
};

export default Stats;
