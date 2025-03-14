// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
// import React, { useState, useEffect } from "react";
// import * as echarts from "echarts";
// const App: React.FC = () => {
//   const [, setSelectedCard] = useState<string | null>(null);
//   const [showModal, setShowModal] = useState(false);
//   const [] = useState<"image" | "video" | "youtube">(
//     "image"
//   );
//   const [stats] = useState({
//     pending: 247,
//     validated: 1893,
//     rejected: 124,
//   });
//   useEffect(() => {
//     const chart = echarts.init(document.getElementById("activity-chart"));
//     const option = {
//       animation: false,
//       tooltip: {
//         trigger: "axis",
//       },
//       grid: {
//         left: "3%",
//         right: "4%",
//         bottom: "3%",
//         containLabel: true,
//       },
//       xAxis: {
//         type: "category",
//         boundaryGap: false,
//         data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
//       },
//       yAxis: {
//         type: "value",
//       },
//       series: [
//         {
//           name: "Verifications",
//           type: "line",
//           smooth: true,
//           data: [140, 232, 201, 264, 190, 330, 410],
//           lineStyle: {
//             color: "#10B981",
//           },
//           areaStyle: {
//             color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
//               { offset: 0, color: "rgba(16, 185, 129, 0.3)" },
//               { offset: 1, color: "rgba(16, 185, 129, 0.1)" },
//             ]),
//           },
//         },
//       ],
//     };
//     chart.setOption(option);
//     return () => chart.dispose();
//   }, []);
//   const handleCardClick = (type: string) => {
//     setSelectedCard(type);
//     setShowModal(true);
//   };
//   return (
//     <div className=" pt-20 min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
//       <div className="max-w-[1440px] mx-auto px-8 py-6 min-h-[1024px]">
//         {/* Header Section */}
//         <header className="mb-12">
//           <div className="flex items-center justify-between mb-8">
//             <div>
//               <h1 className="text-4xl font-bold text-gray-800 mb-3">
//                 Welcome, James Anderson! <span className="wave">👋</span>
//               </h1>
//               <p className="text-lg text-gray-600">
//                 Manage & Verify Proofs for Carbon Credit Programs
//               </p>
//             </div>
//             <div className="flex items-center gap-4">
//               <button className="!rounded-button bg-white border border-gray-200 px-4 py-2 flex items-center gap-2 hover:bg-gray-50 transition-all whitespace-nowrap">
//                 <i className="fas fa-bell text-gray-600"></i>
//                 <span className="text-sm font-medium">Notifications</span>
//               </button>
//               <button className="!rounded-button bg-emerald-500 text-white px-4 py-2 flex items-center gap-2 hover:bg-emerald-600 transition-all whitespace-nowrap">
//                 <i className="fas fa-plus"></i>
//                 <span className="text-sm font-medium">New Verification</span>
//               </button>
//             </div>
//           </div>
//         </header>
//         {/* Analytics Cards */}
//         <div className="grid grid-cols-3 gap-6 mb-12">
//           <div
//             onClick={() => handleCardClick("pending")}
//             className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md hover:scale-[1.02] transition-all cursor-pointer border border-gray-100"
//           >
//             <div className="flex items-center justify-between mb-4">
//               <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
//                 <i className="fas fa-clock text-orange-500 text-xl"></i>
//               </div>
//               <span className="text-orange-500 text-sm font-medium">
//                 +12.5% vs last week
//               </span>
//             </div>
//             <h3 className="text-3xl font-bold text-gray-800 mb-2">
//               {stats.pending}
//             </h3>
//             <p className="text-gray-600">Pending Verifications</p>
//           </div>
//           <div
//             onClick={() => handleCardClick("validated")}
//             className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md hover:scale-[1.02] transition-all cursor-pointer border border-gray-100"
//           >
//             <div className="flex items-center justify-between mb-4">
//               <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
//                 <i className="fas fa-check text-emerald-500 text-xl"></i>
//               </div>
//               <span className="text-emerald-500 text-sm font-medium">
//                 +28.4% vs last week
//               </span>
//             </div>
//             <h3 className="text-3xl font-bold text-gray-800 mb-2">
//               {stats.validated}
//             </h3>
//             <p className="text-gray-600">Validated Proofs</p>
//           </div>
//           <div
//             onClick={() => handleCardClick("rejected")}
//             className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md hover:scale-[1.02] transition-all cursor-pointer border border-gray-100"
//           >
//             <div className="flex items-center justify-between mb-4">
//               <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
//                 <i className="fas fa-times text-red-500 text-xl"></i>
//               </div>
//               <span className="text-red-500 text-sm font-medium">
//                 -8.3% vs last week
//               </span>
//             </div>
//             <h3 className="text-3xl font-bold text-gray-800 mb-2">
//               {stats.rejected}
//             </h3>
//             <p className="text-gray-600">Rejected Proofs</p>
//           </div>
//         </div>
//         {/* Activity Chart */}
//         <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-12">
//           <div className="flex items-center justify-between mb-6">
//             <h2 className="text-xl font-bold text-gray-800">
//               Verification Activity
//             </h2>
//             <div className="flex items-center gap-4">
//               <button className="!rounded-button text-sm text-gray-600 hover:text-gray-800 whitespace-nowrap">
//                 Last 7 Days
//               </button>
//               <button className="!rounded-button text-sm text-gray-600 hover:text-gray-800 whitespace-nowrap">
//                 Last Month
//               </button>
//               <button className="!rounded-button text-sm text-gray-600 hover:text-gray-800 whitespace-nowrap">
//                 Last Year
//               </button>
//             </div>
//           </div>
//           <div id="activity-chart" style={{ height: "400px" }}></div>
//         </div>
//         {/* Proof Verification Table */}
//         <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-12">
//           <div className="flex items-center justify-between mb-6">
//             <h2 className="text-xl font-bold text-gray-800">
//               Proof Verifications
//             </h2>
//             <div className="flex items-center gap-4">
//               <div className="relative">
//                 <input
//                   type="text"
//                   placeholder="Search proofs..."
//                   className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-emerald-500"
//                 />
//                 <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
//               </div>
//               <button className="!rounded-button bg-emerald-500 text-white px-4 py-2 text-sm hover:bg-emerald-600 transition-all whitespace-nowrap">
//                 <i className="fas fa-filter mr-2"></i>Filter
//               </button>
//             </div>
//           </div>
//           <div className="overflow-x-auto relative">
//             <table className="w-full table-auto">
//               <style>{`
// .proof-status-pending {
// animation: blink 2s infinite;
// }
// .proof-status-valid {
// animation: glow 2s infinite;
// }
// .proof-status-rejected {
// animation: fade 2s infinite;
// }
// @keyframes blink {
// 0%, 100% { opacity: 1; }
// 50% { opacity: 0.5; }
// }
// @keyframes glow {
// 0%, 100% { box-shadow: 0 0 5px rgba(16, 185, 129, 0.5); }
// 50% { box-shadow: 0 0 15px rgba(16, 185, 129, 0.8); }
// }
// @keyframes fade {
// 0%, 100% { opacity: 0.8; }
// 50% { opacity: 1; }
// }
// .validate-btn:hover {
// animation: pulse 1s infinite;
// }
// .reject-btn:hover {
// animation: shake 0.5s;
// }
// @keyframes pulse {
// 0% { transform: scale(1); }
// 50% { transform: scale(1.05); }
// 100% { transform: scale(1); }
// }
// @keyframes shake {
// 0%, 100% { transform: translateX(0); }
// 25% { transform: translateX(-2px); }
// 75% { transform: translateX(2px); }
// }
// `}</style>
//               <thead className="sticky top-0 bg-white z-10 shadow-sm">
//                 <tr className="border-b border-gray-200">
//                   <th className="text-left py-4 px-4 text-sm font-semibold text-gray-600">
//                     S.No
//                   </th>
//                   <th className="text-left py-4 px-4 text-sm font-semibold text-gray-600">
//                     Service Provider
//                   </th>
//                   <th className="text-left py-4 px-4 text-sm font-semibold text-gray-600">
//                     Participant Name
//                   </th>
//                   <th className="text-left py-4 px-4 text-sm font-semibold text-gray-600">
//                     Program
//                   </th>
//                   <th className="text-left py-4 px-4 text-sm font-semibold text-gray-600">
//                     Status
//                   </th>
//                   <th className="text-left py-4 px-4 text-sm font-semibold text-gray-600">
//                     Proofs
//                   </th>
//                   <th className="text-left py-4 px-4 text-sm font-semibold text-gray-600">
//                     Images
//                   </th>
//                   <th className="text-left py-4 px-4 text-sm font-semibold text-gray-600">
//                     Action
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr className="border-b border-gray-100 hover:bg-gray-50 even:bg-gray-50/30">
//                   <td className="py-4 px-4">1</td>
//                   <td className="py-4 px-4">
//                     <div className="flex items-center gap-3">
//                       <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
//                         <i className="fas fa-leaf text-emerald-500"></i>
//                       </div>
//                       <span className="font-medium">ZED Wellness</span>
//                     </div>
//                   </td>
//                   <td className="py-4 px-4">Sayyed Numan</td>
//                   <td className="py-4 px-4">
//                     <span className="flex items-center gap-2">
//                       <i className="fas fa-tree text-emerald-500"></i>
//                       Forestation
//                     </span>
//                   </td>
//                   <td className="py-4 px-4">
//                     <span className="px-3 py-1 rounded-full text-sm bg-orange-100 text-orange-700 proof-status-pending">
//                       Pending
//                     </span>
//                   </td>
//                   <td className="py-4 px-4">
//                     <div className="flex gap-2">
//                       <button
//                         onClick={() => setShowModal(true)}
//                         className="!rounded-button px-2 py-1 bg-blue-100 text-blue-700 text-xs hover:bg-blue-200 transition-transform hover:scale-105"
//                       >
//                         <i className="fas fa-video mr-1"></i>Video
//                       </button>
//                       <button
//                         onClick={() => setShowModal(true)}
//                         className="!rounded-button px-2 py-1 bg-red-100 text-red-700 text-xs hover:bg-red-200 transition-transform hover:scale-105"
//                       >
//                         <i className="fab fa-youtube mr-1"></i>YouTube
//                       </button>
//                     </div>
//                   </td>
//                   <td className="py-4 px-4">
//                     <button
//                       onClick={() => setShowModal(true)}
//                       className="!rounded-button px-3 py-1 bg-gray-100 text-gray-700 text-sm hover:bg-gray-200 transition-transform hover:scale-105"
//                     >
//                       <i className="fas fa-image mr-1"></i>View
//                     </button>
//                   </td>
//                   <td className="py-4 px-4">
//                     <div className="flex gap-2">
//                       <button className="!rounded-button px-3 py-1 bg-emerald-500 text-white text-sm hover:bg-emerald-600 validate-btn">
//                         <i className="fas fa-check mr-1"></i>Validate
//                       </button>
//                       <button className="!rounded-button px-3 py-1 bg-red-500 text-white text-sm hover:bg-red-600 reject-btn">
//                         <i className="fas fa-times mr-1"></i>Reject
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//                 <tr className="border-b border-gray-100 hover:bg-gray-50">
//                   <td className="py-4 px-4">2</td>
//                   <td className="py-4 px-4">
//                     <div className="flex items-center gap-3">
//                       <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
//                         <i className="fas fa-globe text-blue-500"></i>
//                       </div>
//                       <span className="font-medium">Green Earth NGO</span>
//                     </div>
//                   </td>
//                   <td className="py-4 px-4">Sam Shaikh</td>
//                   <td className="py-4 px-4">
//                     <span className="flex items-center gap-2">
//                       <i className="fas fa-tint text-blue-500"></i>
//                       Water Conservation
//                     </span>
//                   </td>
//                   <td className="py-4 px-4">
//                     <span className="px-3 py-1 rounded-full text-sm bg-emerald-100 text-emerald-700 proof-status-valid">
//                       Valid
//                     </span>
//                   </td>
//                   <td className="py-4 px-4">
//                     <div className="flex gap-2">
//                       <button
//                         onClick={() => setShowModal(true)}
//                         className="!rounded-button px-2 py-1 bg-blue-100 text-blue-700 text-xs hover:bg-blue-200 transition-transform hover:scale-105"
//                       >
//                         <i className="fas fa-video mr-1"></i>Video
//                       </button>
//                       <button
//                         onClick={() => setShowModal(true)}
//                         className="!rounded-button px-2 py-1 bg-red-100 text-red-700 text-xs hover:bg-red-200 transition-transform hover:scale-105"
//                       >
//                         <i className="fab fa-youtube mr-1"></i>YouTube
//                       </button>
//                     </div>
//                   </td>
//                   <td className="py-4 px-4">
//                     <button
//                       onClick={() => setShowModal(true)}
//                       className="!rounded-button px-3 py-1 bg-gray-100 text-gray-700 text-sm hover:bg-gray-200 transition-transform hover:scale-105"
//                     >
//                       <i className="fas fa-image mr-1"></i>View
//                     </button>
//                   </td>
//                   <td className="py-4 px-4">
//                     <button className="!rounded-button px-3 py-1 bg-gray-100 text-gray-700 text-sm hover:bg-gray-200">
//                       <i className="fas fa-eye mr-1"></i>View Proof
//                     </button>
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//           <div className="flex justify-between items-center mt-6">
//             <p className="text-sm text-gray-600">Showing 2 of 24 entries</p>
//             <div className="flex gap-2">
//               <button
//                 className="!rounded-button px-4 py-2 bg-gray-100 text-gray-700 text-sm hover:bg-gray-200 disabled:opacity-50"
//                 disabled
//               >
//                 <i className="fas fa-chevron-left mr-1"></i>Previous
//               </button>
//               <button className="!rounded-button px-4 py-2 bg-gray-100 text-gray-700 text-sm hover:bg-gray-200">
//                 Next<i className="fas fa-chevron-right ml-1"></i>
//               </button>
//             </div>
//           </div>
//         </div>
//         {/* Recent Activity */}
//         <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
//           <h2 className="text-xl font-bold text-gray-800 mb-6">
//             Recent Activity
//           </h2>
//           <div className="space-y-4">
//             {[
//               {
//                 user: "Emily Thompson",
//                 action: "validated",
//                 project: "Forest Conservation Project",
//                 time: "2 hours ago",
//               },
//               {
//                 user: "Michael Chen",
//                 action: "rejected",
//                 project: "Solar Farm Initiative",
//                 time: "4 hours ago",
//               },
//               {
//                 user: "Sarah Williams",
//                 action: "pending",
//                 project: "Wind Energy Program",
//                 time: "5 hours ago",
//               },
//               {
//                 user: "David Martinez",
//                 action: "validated",
//                 project: "Ocean Cleanup Initiative",
//                 time: "6 hours ago",
//               },
//             ].map((activity, index) => (
//               <div
//                 key={index}
//                 className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
//               >
//                 <div className="flex items-center gap-4">
//                   <div
//                     className={`w-10 h-10 rounded-full flex items-center justify-center ${
//                       activity.action === "validated"
//                         ? "bg-emerald-100"
//                         : activity.action === "rejected"
//                         ? "bg-red-100"
//                         : "bg-orange-100"
//                     }`}
//                   >
//                     <i
//                       className={`fas ${
//                         activity.action === "validated"
//                           ? "fa-check text-emerald-500"
//                           : activity.action === "rejected"
//                           ? "fa-times text-red-500"
//                           : "fa-clock text-orange-500"
//                       }`}
//                     ></i>
//                   </div>
//                   <div>
//                     <p className="text-gray-800 font-medium">{activity.user}</p>
//                     <p className="text-gray-600 text-sm">{activity.project}</p>
//                   </div>
//                 </div>
//                 <span className="text-sm text-gray-500">{activity.time}</span>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//       {/* Proof Verification Modal */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
//           <div className="bg-white rounded-xl w-[90vw] h-[90vh] flex flex-col">
//             <div className="flex justify-between items-center p-6 border-b border-gray-100">
//               <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
//                 <i className="fas fa-file-alt text-emerald-500"></i>
//                 Proof Verification Details
//               </h3>
//               <button
//                 onClick={() => setShowModal(false)}
//                 className="!rounded-button w-10 h-10 bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-all whitespace-nowrap"
//               >
//                 <i className="fas fa-times text-gray-600"></i>
//               </button>
//             </div>

//             <div className="flex-1 overflow-y-auto p-6">
//               <div className="grid grid-cols-3 gap-6 h-full">
//                 {/* Preview Section */}
//                 <div className="col-span-2 bg-gray-50 rounded-xl p-4 flex flex-col">
//                   <div className="bg-black rounded-lg flex-1 mb-4 relative group cursor-zoom-in">
//                     <img
//                       src="https://public.readdy.ai/ai/img_res/93e205342d558b0c5dc3f56ad5211cb5.jpg"
//                       className="w-full h-full object-contain"
//                       alt="Proof preview"
//                     />
//                     <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
//                       <i className="fas fa-search-plus text-white text-3xl"></i>
//                     </div>
//                   </div>
//                   <div className="flex gap-3">
//                     <button className="!rounded-button flex-1 bg-blue-100 text-blue-700 py-2 hover:bg-blue-200 transition-all">
//                       <i className="fas fa-video mr-2"></i>View Video Proof
//                     </button>
//                     <button className="!rounded-button flex-1 bg-red-100 text-red-700 py-2 hover:bg-red-200 transition-all">
//                       <i className="fab fa-youtube mr-2"></i>YouTube Evidence
//                     </button>
//                   </div>
//                 </div>

//                 {/* Details Section */}
//                 <div className="bg-gray-50 rounded-xl p-6 flex flex-col">
//                   <div className="mb-6">
//                     <h4 className="text-lg font-semibold text-gray-800 mb-4">
//                       Participant Details
//                     </h4>
//                     <div className="space-y-4">
//                       <div>
//                         <label className="text-sm text-gray-600 block mb-1">
//                           Name
//                         </label>
//                         <p className="text-gray-800 font-medium">
//                           Sayyed Numan
//                         </p>
//                       </div>
//                       <div>
//                         <label className="text-sm text-gray-600 block mb-1">
//                           Email
//                         </label>
//                         <p className="text-gray-800 font-medium">
//                           sayyed.numan@example.com
//                         </p>
//                       </div>
//                       <div>
//                         <label className="text-sm text-gray-600 block mb-1">
//                           Program Type
//                         </label>
//                         <p className="text-gray-800 font-medium">
//                           Forestation Initiative
//                         </p>
//                       </div>
//                       <div>
//                         <label className="text-sm text-gray-600 block mb-1">
//                           Submission Date
//                         </label>
//                         <p className="text-gray-800 font-medium">
//                           March 2, 2025
//                         </p>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="mb-6">
//                     <h4 className="text-lg font-semibold text-gray-800 mb-4">
//                       Additional Remarks
//                     </h4>
//                     <p className="text-gray-600 text-sm">
//                       The reforestation project has successfully planted 1,000
//                       native tree species across 5 hectares of land. All trees
//                       are properly tagged and GPS coordinates have been recorded
//                       for monitoring purposes.
//                     </p>
//                   </div>

//                   <div className="mt-auto space-y-3">
//                     <button className="!rounded-button w-full bg-emerald-500 text-white py-3 hover:bg-emerald-600 transition-all validate-btn flex items-center justify-center">
//                       <i className="fas fa-check-circle mr-2"></i>Mark as Valid
//                     </button>
//                     <button className="!rounded-button w-full bg-red-500 text-white py-3 hover:bg-red-600 transition-all reject-btn flex items-center justify-center">
//                       <i className="fas fa-times-circle mr-2"></i>Mark as
//                       Invalid
//                     </button>
//                     <button className="!rounded-button w-full bg-blue-500 text-white py-3 hover:bg-blue-600 transition-all flex items-center justify-center">
//                       <i className="fas fa-redo mr-2"></i>Request Resubmission
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };
// export default App;
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
