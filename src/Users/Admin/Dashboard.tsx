import React from "react";
import Header from "./Header";
import AnalyticsCards from "./AnalyticsCards";
import ActivityChart from "./ActivityChart";
import VerificationTable from "./VerificationTable";
import RecentActivity from "./RecentActivity";

const Dashboard: React.FC = () => {
  return (
    <div className="pt-20 min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-[1440px] mx-auto px-8 py-6">
        <Header />
        <AnalyticsCards handleCardClick={function (): void {
          throw new Error("Function not implemented.");
        } } stats={{
          pending: 0,
          validated: 0,
          rejected: 0
        }} />
        <ActivityChart />
        <VerificationTable />
        <RecentActivity />
      </div>
    </div>
  );
};

export default Dashboard;
