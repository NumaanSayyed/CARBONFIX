import React from "react";
import Header from "./Header";
import AnalyticsCards from "./AnalyticsCards";
import ProjectTrendsChart from "./ProjectTrendsChart";
import RecentActivities from "./RecentActivities";

const Dashboard: React.FC = () => {
  // Define Stats Object with Required Fields
  const stats = {
    students: 16789, // Total Enrolled Students
    carbonCredits: 2456, // Carbon Credits Earned
    activeProjects: 48, // Active Projects
  };

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <div className="max-w-[1440px] mx-auto px-6">
        <Header />
        {/* Only Pass `stats`, Remove `handleCardClick` */}
        <AnalyticsCards stats={stats} />
        <ProjectTrendsChart />
        <RecentActivities />
      </div>
    </div>
  );
};

export default Dashboard;
