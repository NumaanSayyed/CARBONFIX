// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.

import React, { useState, useEffect } from "react";

const MedalProgress: React.FC = () => {
  const [activeLevel, setActiveLevel] = useState<string>("Bronze");

  // User's current credits
  const [userCredits, setUserCredits] = useState<number>(35);

  // Medal level data
  const medalLevels = [
    {
      name: "Bronze",
      required: 1000,
      color: "#CD7F32",
      icon: "fa-medal",
    },
    {
      name: "Silver",
      required: 10000,
      color: "#C0C0C0",
      icon: "fa-medal",
    },
    {
      name: "Gold",
      required: 100000,
      color: "#FFD700",
      icon: "fa-medal",
    },
    {
      name: "Diamond",
      required: 1000000,
      color: "#B9F2FF",
      icon: "fa-gem",
    },
  ];

  // Calculate current level based on user credits
  useEffect(() => {
    for (let i = medalLevels.length - 1; i >= 0; i--) {
      if (userCredits >= medalLevels[i].required) {
        setActiveLevel(medalLevels[i].name);
        break;
      } else if (i === 0 && userCredits < medalLevels[0].required) {
        setActiveLevel("Bronze"); // Default to Bronze if below all thresholds
      }
    }
  }, [userCredits]);

  // Calculate progress percentage for circular progress
  const calculateProgress = (level: { required: number; name: string }) => {
    // For completed levels
    if (userCredits >= level.required) {
      return 100;
    }

    // For current level in progress
    const prevLevelIndex =
      medalLevels.findIndex((m) => m.name === level.name) - 1;
    const prevThreshold =
      prevLevelIndex >= 0 ? medalLevels[prevLevelIndex].required : 0;

    const progress =
      ((userCredits - prevThreshold) / (level.required - prevThreshold)) * 100;
    return Math.min(Math.max(progress, 0), 99); // Cap between 0 and 99%
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-6"
      style={{
        background: "linear-gradient(135deg, #E8F5E9 0%, #E3F2FD 100%)",
      }}
    >
      <div className="w-full max-w-6xl bg-white bg-opacity-95 rounded-xl shadow-lg p-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Carbon Credit Achievements
          </h1>
          <p className="text-lg text-gray-600">Earn More, Achieve More</p>
          <div className="mt-4 bg-green-50 rounded-lg p-3 inline-block">
            <p className="text-green-700 font-medium">
              Your Current Credits:{" "}
              <span className="text-2xl font-bold">{userCredits}</span>
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {medalLevels.map((level) => {
            const progress = calculateProgress(level);
            const isActive = activeLevel === level.name;
            const isCompleted = userCredits >= level.required;

            return (
              <div
                key={level.name}
                className={`relative flex flex-col items-center p-6 rounded-lg transition-all duration-300 transform hover:scale-105 cursor-pointer ${
                  isActive ? "bg-green-50 shadow-md" : "bg-white shadow"
                }`}
                onClick={() => setActiveLevel(level.name)}
              >
                {/* Progress Circle */}
                <div className="relative w-36 h-36 mb-4">
                  {/* Background Circle */}
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="#E5E7EB"
                      strokeWidth="8"
                    />

                    {/* Progress Circle */}
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke={level.color}
                      strokeWidth="8"
                      strokeDasharray="283"
                      strokeDashoffset={283 - (283 * progress) / 100}
                      strokeLinecap="round"
                      transform="rotate(-90 50 50)"
                      style={{ transition: "stroke-dashoffset 1s ease-in-out" }}
                    />
                  </svg>

                  {/* Icon in the center */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <i
                      className={`fas ${level.icon} text-4xl`}
                      style={{
                        color: level.color,
                        filter: "drop-shadow(0 2px 3px rgba(0,0,0,0.2))",
                      }}
                    ></i>
                  </div>

                  {/* Completion checkmark */}
                  {isCompleted && (
                    <div className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center shadow-md">
                      <i className="fas fa-check text-sm"></i>
                    </div>
                  )}
                </div>

                {/* Medal level name */}
                <h3 className="text-xl font-bold text-gray-800 mb-1">
                  {level.name}
                </h3>

                {/* Required credits */}
                <p className="text-2xl font-medium text-gray-700 mb-1">
                  {level.required} <span className="text-sm">credits</span>
                </p>

                {/* Progress text */}
                <p className="text-sm text-gray-500">
                  {Math.min(userCredits, level.required)}/{level.required}{" "}
                  credits
                </p>

                {/* Status label */}
                <div
                  className={`mt-3 px-3 py-1 rounded-full text-xs font-medium ${
                    isCompleted
                      ? "bg-green-100 text-green-800"
                      : isActive
                      ? "bg-blue-100 text-blue-800"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {isCompleted
                    ? "Achieved"
                    : isActive
                    ? "In Progress"
                    : "Locked"}
                </div>
              </div>
            );
          })}
        </div>

        {/* Action buttons */}
        {/* <div className="mt-10 flex flex-wrap justify-center gap-4">
                    <button
                        className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-button whitespace-nowrap transition-colors shadow-md flex items-center"
                        onClick={() => setUserCredits(prev => prev + 10)}
                    >
                        <i className="fas fa-plus mr-2"></i>
                        Earn 10 Credits
                    </button>

                    <button
                        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-button whitespace-nowrap transition-colors shadow-md flex items-center"
                    >
                        <i className="fas fa-trophy mr-2"></i>
                        View All Achievements
                    </button>

                    <button
                        className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-button whitespace-nowrap transition-colors shadow-md flex items-center"
                    >
                        <i className="fas fa-exchange-alt mr-2"></i>
                        Redeem Credits
                    </button>
                </div> */}

        {/* Tips section */}
        {/* <div className="mt-10 bg-blue-50 rounded-lg p-6">
                    <h3 className="text-xl font-bold text-blue-800 mb-3 flex items-center">
                        <i className="fas fa-lightbulb mr-2 text-yellow-500"></i>
                        How to Earn More Carbon Credits
                    </h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <li className="flex items-start">
                            <i className="fas fa-leaf text-green-500 mt-1 mr-2"></i>
                            <span>Plant trees through our partner programs</span>
                        </li>
                        <li className="flex items-start">
                            <i className="fas fa-bicycle text-green-500 mt-1 mr-2"></i>
                            <span>Track and log your eco-friendly commutes</span>
                        </li>
                        <li className="flex items-start">
                            <i className="fas fa-solar-panel text-green-500 mt-1 mr-2"></i>
                            <span>Install renewable energy solutions at home</span>
                        </li>
                        <li className="flex items-start">
                            <i className="fas fa-recycle text-green-500 mt-1 mr-2"></i>
                            <span>Participate in community recycling events</span>
                        </li>
                    </ul>
                </div> */}
      </div>
    </div>
  );
};

export default MedalProgress;
