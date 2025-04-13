import React, { useEffect, useState } from "react";
import Header from "./Header";
import AnalyticsCards from "./AnalyticsCards";
import ActivityChart from "./ActivityChart";
import VerificationTable from "./VerificationTable";
import RecentActivity from "./RecentActivity";
import axios from "axios";
import { backend_url } from "../../backend_route";

const Dashboard: React.FC = () => {
  const [adminDetails, setAdminDetails] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState({
    pending: 0,
    validated: 0,
    rejected: 0,
    changes: {
      pending: "+0.00%",
      validated: "+0.00%",
      rejected: "+0.00%",
    },
  });

  const getWithExpirationCheck = (key: string) => {
    const dataString = localStorage.getItem(key);
    if (!dataString) return null;

    const data = JSON.parse(dataString);
    const currentTime = new Date().getTime();

    if (currentTime > data.expirationTime) {
      localStorage.removeItem(key);
      return null;
    }

    return data.value;
  };

  useEffect(() => {
    const fetchAdminDetails = async () => {
      try {
        const token = getWithExpirationCheck("token");
        if (!token) {
          throw new Error("Token missing. Please log in.");
        }

        const response = await axios.get(`${backend_url}/admin/authenticate`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = response.data;

        setAdminDetails(data.user);
        setStats({
          pending: parseInt(data.total_stats.total_pending),
          validated: parseInt(data.total_stats.total_approved),
          rejected: parseInt(data.total_stats.total_rejected),
          changes: {
            pending: data.weekly_change_percentage.pending_percentage,
            validated: data.weekly_change_percentage.approval_percentage,
            rejected: data.weekly_change_percentage.rejection_percentage,
          },
        });
      } catch (err: any) {
        setError(err.message || "An error occurred while fetching admin details.");
      } finally {
        setLoading(false);
      }
    };

    fetchAdminDetails();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-[1440px] mx-auto px-8 py-6">
        <Header adminDetails={adminDetails} />
        <AnalyticsCards
          stats={{
            pending: stats.pending,
            validated: stats.validated,
            rejected: stats.rejected,
          }}
          percentageChanges={stats.changes}
          handleCardClick={(type) => {
            console.log(`${type} card clicked`);
          }}
        />
        <ActivityChart />
        <VerificationTable />
        <RecentActivity />
      </div>
    </div>
  );
};

export default Dashboard;
