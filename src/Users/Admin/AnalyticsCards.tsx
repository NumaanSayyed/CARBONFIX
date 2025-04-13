import React from "react";

interface AnalyticsCardsProps {
  stats: { pending: number; validated: number; rejected: number };
  percentageChanges: { pending: string; validated: string; rejected: string };
  handleCardClick: (type: string) => void;
}

const AnalyticsCards: React.FC<AnalyticsCardsProps> = ({ stats, percentageChanges, handleCardClick }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {[
        {
          type: "pending",
          title: "Pending Verifications",
          value: stats.pending,
          icon: "fa-clock",
          bgColor: "bg-orange-100",
          iconColor: "text-orange-500",
          change: percentageChanges.pending,
          changeColor: "text-orange-500",
        },
        {
          type: "validated",
          title: "Validated Proofs",
          value: stats.validated,
          icon: "fa-check-circle",
          bgColor: "bg-green-100",
          iconColor: "text-green-500",
          change: percentageChanges.validated,
          changeColor: "text-green-500",
        },
        {
          type: "rejected",
          title: "Rejected Proofs",
          value: stats.rejected,
          icon: "fa-times-circle",
          bgColor: "bg-red-100",
          iconColor: "text-red-500",
          change: percentageChanges.rejected,
          changeColor: "text-red-500",
        },
      ].map((item) => (
        <div
          key={item.type}
          onClick={() => handleCardClick(item.type)}
          className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-transform hover:scale-[1.02] cursor-pointer border border-gray-200"
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 ${item.bgColor} rounded-full flex items-center justify-center`}>
              <i className={`fas ${item.icon} ${item.iconColor} text-xl`}></i>
            </div>
            <span className={`text-sm font-medium ${item.changeColor}`}>{item.change} vs last week</span>
          </div>
          <h3 className="text-3xl font-bold text-gray-800 mb-2">{item.value}</h3>
          <p className="text-gray-600">{item.title}</p>
        </div>
      ))}
    </div>
  );
};

export default AnalyticsCards;
