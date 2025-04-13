import React from "react";

const RecentActivities: React.FC = () => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-lg transition-shadow hover:shadow-xl mb-10">
      {/* Section Title with Animated Underline */}
      <h2 className="text-xl font-semibold mb-6 relative pb-2 border-b-2 border-transparent hover:border-green-500 transition-all duration-300">
        Recent Activities
      </h2>

      <div className="space-y-4">
        {[
          {
            user: "Emily Johnson",
            action: "completed a solar panel installation project",
            time: "2 hours ago",
            credits: 45,
            icon: "fa-solar-panel",
            iconBg: "bg-green-100",
            iconColor: "text-green-600",
          },
          {
            user: "Michael Chen",
            action: "started a wind energy research project",
            time: "4 hours ago",
            credits: 30,
            icon: "fa-wind",
            iconBg: "bg-blue-100",
            iconColor: "text-blue-600",
          },
          {
            user: "Sarah Williams",
            action: "submitted a recycling initiative report",
            time: "6 hours ago",
            credits: 25,
            icon: "fa-recycle",
            iconBg: "bg-yellow-100",
            iconColor: "text-yellow-600",
          },
        ].map((activity, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-all duration-300"
          >
            {/* User Activity Section */}
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${activity.iconBg}`}>
                <i className={`fas ${activity.icon} ${activity.iconColor} text-xl`}></i>
              </div>
              <div>
                <p className="text-gray-900 text-sm sm:text-base">
                  <span className="font-semibold">{activity.user}</span> {activity.action}
                </p>
                <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
              </div>
            </div>

            {/* Credits Earned */}
            <div className="flex items-center gap-2">
              <span className="text-green-600 font-medium">+{activity.credits}</span>
              <i className="fas fa-leaf text-green-600"></i>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivities;
