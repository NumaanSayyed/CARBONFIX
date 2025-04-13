import React, { useEffect, useState } from "react";
import axios from "axios";
import { backend_url } from "../../backend_route";

interface Activity {
  participant_name: string;
  project_name: string;
  status: string;
  time_ago: string;
}

const RecentActivity: React.FC = () => {
  // State to hold activities
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch the recent activities when the component mounts
  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await axios.get(`${backend_url}/admin/recent-activities`); // Replace with your actual API endpoint
        setActivities(response.data.activities);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch activities.");
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Recent Activity</h2>
      <div className="space-y-4">
        {activities.length === 0 ? (
          <p>No recent activities found.</p>
        ) : (
          activities.map((activity, index) => (
            <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
              <div className="flex items-center gap-4">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    activity.status === "approved_by_admin" ? "bg-emerald-100" : 
                    activity.status === "rejected_by_admin" ? "bg-red-100" : "bg-orange-100"
                  }`}
                >
                  <i
                    className={`fas ${
                      activity.status === "approved_by_admin" 
                        ? "fa-check text-emerald-500" 
                        : activity.status === "rejected_by_admin" 
                        ? "fa-times text-red-500" 
                        : "fa-clock text-orange-500"
                    }`}
                  ></i>
                </div>
                <div>
                  <p className="text-gray-800 font-medium">{activity.participant_name}</p>
                  <p className="text-gray-600 text-sm">{activity.project_name}</p>
                </div>
              </div>
              <span className="text-sm text-gray-500">{activity.time_ago}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RecentActivity;
