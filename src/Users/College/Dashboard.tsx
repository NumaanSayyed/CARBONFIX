import React, { useState, useEffect } from "react";
import Header from "./Header";
import AnalyticsCards from "./AnalyticsCards";
import ProjectTrendsChart from "./ProjectTrendsChart";
import RecentActivities from "./RecentActivities";
import { backend_url } from "../../backend_route";
import { getWithExpirationCheck } from "../../Helpers/Helpers";
// import { backend_url } from "../backend_route";
// import { getWithExpirationCheck } from "../Helpers/Helpers";

const Dashboard: React.FC = () => {
  // replace static stats with dynamic state
  const [stats, setStats] = useState({
    students: 0,
    carbonCredits: 0,
    activeProjects: 0,
  });

  const [collegeName,setCollegeName] = useState("");

  useEffect(() => {
    const fetchDashboard = async () => {
      const token = getWithExpirationCheck("token");
      try {
        const response = await fetch(`${backend_url}/college/dashboard`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        if (response.ok) {
          setStats({
            students: data.totalParticipants,
            carbonCredits: data.totalCarbonCredits,
            activeProjects: data.activeProjects,
          });

          setCollegeName(data.college);
        }
      } catch (error) {
        console.error("Error fetching college dashboard:", error);
      }
    };
    fetchDashboard();
  }, []);

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <div className="max-w-[1440px] mx-auto px-6">
        <Header  collegeName={collegeName} />
        {/* Pass dynamic stats down */}
        <AnalyticsCards stats={stats} />
        <ProjectTrendsChart />
        <RecentActivities />
      </div>
    </div>
  );
};

export default Dashboard;
