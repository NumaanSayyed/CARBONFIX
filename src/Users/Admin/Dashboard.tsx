// // import React from "react";
// // import Header from "./Header";
// // import AnalyticsCards from "./AnalyticsCards";
// // import ActivityChart from "./ActivityChart";
// // import VerificationTable from "./VerificationTable";
// // import RecentActivity from "./RecentActivity";

// // const Dashboard: React.FC = () => {
// //   return (
// //     <div className="pt-20 min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
// //       <div className="max-w-[1440px] mx-auto px-8 py-6">
// //         <Header />
// //         <AnalyticsCards handleCardClick={function (): void {
// //           throw new Error("Function not implemented.");
// //         } } stats={{
// //           pending: 0,
// //           validated: 0,
// //           rejected: 0
// //         }} />
// //         <ActivityChart />
// //         <VerificationTable />
// //         <RecentActivity />
// //       </div>
// //     </div>
// //   );
// // };

// // export default Dashboard;

// import React, { useEffect, useState } from "react";
// import Header from "./Header";
// import AnalyticsCards from "./AnalyticsCards";
// import ActivityChart from "./ActivityChart";
// import VerificationTable from "./VerificationTable";
// import RecentActivity from "./RecentActivity";
// import axios from "axios";

// const Dashboard: React.FC = () => {
//   const [adminDetails, setAdminDetails] = useState<any>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

  
//   const getWithExpirationCheck = (key: string) => {
//     const dataString = localStorage.getItem(key);
//     if (!dataString) return null;
  
//     const data = JSON.parse(dataString);
//     const currentTime = new Date().getTime();
  
//     if (currentTime > data.expirationTime) {
//       localStorage.removeItem(key); // Remove expired item
//       return null; // Item expired
//     }
  
//     return data.value; // Item is still valid
//   };

//   useEffect(() => {
//     const fetchAdminDetails = async () => {
//       try {
//         const token = getWithExpirationCheck("token"); // Assuming token is stored in localStorage

//         if (!token) {
//           throw new Error("Token missing. Please log in.");
//         }

//         const response = await axios.get("http://localhost:5000/admin/authenticate", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         setAdminDetails(response.data.user);
//       } catch (err: any) {
//         setError(err.message || "An error occurred while fetching admin details.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAdminDetails();
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>; // Add your loading component here
//   }

//   if (error) {
//     return <div>Error: {error}</div>; // Error handling component
//   }

//   return (
//     <div className="pt-20 min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
//       <div className="max-w-[1440px] mx-auto px-8 py-6">
//         <Header  />
//         <AnalyticsCards
//           handleCardClick={() => {
//             throw new Error("Function not implemented.");
//           }}
//           stats={{
//             pending: 0,
//             validated: 0,
//             rejected: 0,
//           }}
//         />
//         <ActivityChart />
//         <VerificationTable />
//         <RecentActivity />
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import React, { useEffect, useState } from "react";
import Header from "./Header";
import AnalyticsCards from "./AnalyticsCards";
import ActivityChart from "./ActivityChart";
import VerificationTable from "./VerificationTable";
import RecentActivity from "./RecentActivity";
import axios from "axios";

const Dashboard: React.FC = () => {
  const [adminDetails, setAdminDetails] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getWithExpirationCheck = (key: string) => {
    const dataString = localStorage.getItem(key);
    if (!dataString) return null;
  
    const data = JSON.parse(dataString);
    const currentTime = new Date().getTime();
  
    if (currentTime > data.expirationTime) {
      localStorage.removeItem(key); // Remove expired item
      return null; // Item expired
    }
  
    return data.value; // Item is still valid
  };

  useEffect(() => {
    const fetchAdminDetails = async () => {
      try {
        const token = getWithExpirationCheck("token"); // Assuming token is stored in localStorage

        if (!token) {
          throw new Error("Token missing. Please log in.");
        }

        const response = await axios.get("https://carbonfix-backend-5y3e.onrender.com/admin/authenticate", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setAdminDetails(response.data.user);
      } catch (err: any) {
        setError(err.message || "An error occurred while fetching admin details.");
      } finally {
        setLoading(false);
      }
    };

    fetchAdminDetails();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Add your loading component here
  }

  if (error) {
    return <div>Error: {error}</div>; // Error handling component
  }

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-[1440px] mx-auto px-8 py-6">
        {/* Pass the admin details to the Header component */}
        <Header adminDetails={adminDetails} />
        <AnalyticsCards
          handleCardClick={() => {
            throw new Error("Function not implemented.");
          }}
          stats={{
            pending: 0,
            validated: 0,
            rejected: 0,
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
