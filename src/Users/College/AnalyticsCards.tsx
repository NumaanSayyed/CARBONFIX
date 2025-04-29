import React from "react";
import { useNavigate } from "react-router-dom";

interface AnalyticsCardsProps {
  stats: { students: number; carbonCredits: number; activeProjects: number };
}

const AnalyticsCards: React.FC<AnalyticsCardsProps> = ({ stats }) => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {[
        {
          key: "students",
          title: "Total Students",
          value: stats.students,
          icon: "fa-users",
          bgColor: "bg-blue-100",
          iconColor: "text-blue-600",
          change: "+12% increase",
          changeColor: "text-green-500",
          changeIcon: "fa-arrow-up",
          onClick: () => navigate("/college/students"),
        },
        {
          key: "carbonCredits",
          title: "Carbon Credits",
          value: `${stats.carbonCredits}`,
          icon: "fa-leaf",
          bgColor: "bg-green-100",
          iconColor: "text-green-600",
          change: "+8% increase",
          changeColor: "text-green-500",
          changeIcon: "fa-arrow-up",
        },
        {
          key: "projects",
          title: "Active Projects",
          value: stats.activeProjects,
          icon: "fa-project-diagram",
          bgColor: "bg-purple-100",
          iconColor: "text-purple-600",
          progressBar: { percentage: "75%", color: "bg-purple-600" },
        },
      ].map((card) => (
        <div
          key={card.key}
          onClick={card.onClick}
          className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all cursor-pointer border border-gray-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">{card.title}</p>
              <h3 className="text-3xl font-bold text-gray-900 mt-1">
                {card.value}
              </h3>
            </div>
            <div
              className={`w-12 h-12 ${card.bgColor} rounded-full flex items-center justify-center shadow-md`}
            >
              <i className={`fas ${card.icon} ${card.iconColor} text-xl`}></i>
            </div>
          </div>

          {card.change && (
            <div className="mt-4 flex items-center gap-2">
              <i className={`fas ${card.changeIcon} ${card.changeColor}`}></i>
              <span className={`text-sm font-medium ${card.changeColor}`}>
                {card.change}
              </span>
            </div>
          )}

          {card.progressBar && (
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`${card.progressBar.color} h-2 rounded-full`}
                  style={{ width: card.progressBar.percentage }}
                ></div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default AnalyticsCards;
