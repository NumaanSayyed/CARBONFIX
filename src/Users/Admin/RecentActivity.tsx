import React from "react";

const RecentActivity: React.FC = () => {
  const activities = [
    { user: "Emily Thompson", action: "validated", project: "Forest Conservation Project", time: "2 hours ago" },
    { user: "Michael Chen", action: "rejected", project: "Solar Farm Initiative", time: "4 hours ago" },
    { user: "Sarah Williams", action: "pending", project: "Wind Energy Project", time: "5 hours ago" },
    { user: "David Martinez", action: "validated", project: "Ocean Cleanup Initiative", time: "6 hours ago" },
  ];

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Recent Activity</h2>
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
            <div className="flex items-center gap-4">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  activity.action === "validated" ? "bg-emerald-100" : activity.action === "rejected" ? "bg-red-100" : "bg-orange-100"
                }`}
              >
                <i
                  className={`fas ${
                    activity.action === "validated"
                      ? "fa-check text-emerald-500"
                      : activity.action === "rejected"
                      ? "fa-times text-red-500"
                      : "fa-clock text-orange-500"
                  }`}
                ></i>
              </div>
              <div>
                <p className="text-gray-800 font-medium">{activity.user}</p>
                <p className="text-gray-600 text-sm">{activity.project}</p>
              </div>
            </div>
            <span className="text-sm text-gray-500">{activity.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;
