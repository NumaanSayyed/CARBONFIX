// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom"; // Assuming you're using React Router
// import axios from "axios";
// // import { backend_url } from "../../../../backend_route";
// // import { formatDate } from "../../../../Helpers/Helpers";
// import { formatDate } from "../../Helpers/Helpers";
// import { backend_url } from "../../backend_route";

// // Type definition for the Participant
// interface Participant {
//   id: string;
//   name: string;
//   avatar: string;
//   project_enroll_status: string;
//   serviceType: string;
//   enrollmentDate: string;
//   location: string;
//   creditsEarned?: number;
//   creditsAllocated?: number;
//   email?: string;
//   proofImage?: string;
//   proofVideo?: string;
//   proofId?: string;
// }

// const ParticipantDetailsPage: React.FC = () => {
//   const { participantId } = useParams<{ participantId: string }>(); // Get participantId from URL params
//   const [selectedParticipant, setSelectedParticipant] = useState<Participant | null>(null);
//   const [proofData, setProofData] = useState<{
//     proofImage?: string;
//     proofVideo?: string;
//     proofId?: string;
//   }>({});

//   // Fetch participant data by ID
//   useEffect(() => {
//     const fetchParticipantDetails = async () => {
//       try {
//         const response = await axios.get(
//           `${backend_url}/participants/${participantId}` // Update with your API endpoint
//         );
//         if (response.data.success) {
//           setSelectedParticipant(response.data.data);
//         }
//       } catch (error) {
//         console.error("Error fetching participant details:", error);
//       }
//     };

//     if (participantId) {
//       fetchParticipantDetails();
//     }
//   }, [participantId]);

//   // Fetch proofs for the selected participant
//   useEffect(() => {
//     const fetchProofs = async () => {
//       if (selectedParticipant && selectedParticipant.email) {
//         try {
//           const response = await axios.get(
//             `${backend_url}/serviceProviders/proofs/${participantId}`,
//             {
//               headers: {
//                 Authorization: `Bearer ${localStorage.getItem("token")}`,
//               },
//             }
//           );

//           if (response.data.success) {
//             const participantProof = response.data.data.find(
//               (proof: any) => proof.email === selectedParticipant.email
//             );

//             if (participantProof) {
//               setProofData({
//                 proofImage: participantProof.image_url || participantProof.image_path,
//                 proofVideo: participantProof.video_url || participantProof.video_path,
//                 proofId: participantProof.id,
//               });
//             }
//           }
//         } catch (error) {
//           console.error("Error fetching proofs:", error);
//         }
//       }
//     };

//     if (selectedParticipant) {
//       fetchProofs();
//     }
//   }, [selectedParticipant, participantId]);

//   // Format status colors
//   const getStatusClass = (status: string) => {
//     switch (status) {
//       case "approved":
//         return "bg-green-500";
//       case "pending":
//         return "bg-yellow-500";
//       case "rejected":
//         return "bg-red-500";
//       default:
//         return "bg-gray-500";
//     }
//   };

//   // if (!selectedParticipant) return <div>Loading...</div>;

//   return (
//     <div className="container mx-auto p-6">
//       {/* Header */}
//       <div className="mb-6">
//         <h2 className="text-3xl font-semibold text-gray-900">Participant Details</h2>
//       </div>

//       {/* Participant Info */}
//       <div className="flex items-center gap-6 mb-6">
//         <img
//           src={selectedParticipant.avatar}
//           alt={selectedParticipant.name}
//           className="w-24 h-24 rounded-full object-cover"
//         />
//         <div>
//           <h3 className="text-xl font-semibold text-gray-900">{selectedParticipant.name}</h3>
//           <p className="text-gray-500">{selectedParticipant.email}</p>
//         </div>
//       </div>

//       {/* Table displaying Participant Info */}
//       <div className="overflow-x-auto mb-8">
//         <table className="min-w-full table-auto">
//           <thead>
//             <tr>
//               <th className="px-4 py-2 text-left text-sm font-semibold text-gray-900">Field</th>
//               <th className="px-4 py-2 text-left text-sm font-semibold text-gray-900">Details</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <td className="px-4 py-2 text-sm text-gray-500">Status</td>
//               <td className="px-4 py-2 text-sm">
//                 <span
//                   className={`px-3 py-1 rounded-full text-sm text-white ${getStatusClass(
//                     selectedParticipant.project_enroll_status
//                   )}`}
//                 >
//                   {selectedParticipant.project_enroll_status}
//                 </span>
//               </td>
//             </tr>
//             <tr>
//               <td className="px-4 py-2 text-sm text-gray-500">Service Type</td>
//               <td className="px-4 py-2 text-sm font-medium text-gray-900">
//                 {selectedParticipant.serviceType}
//               </td>
//             </tr>
//             <tr>
//               <td className="px-4 py-2 text-sm text-gray-500">Enrollment Date</td>
//               <td className="px-4 py-2 text-sm font-medium text-gray-900">
//                 {formatDate(selectedParticipant.enrollmentDate)}
//               </td>
//             </tr>
//             <tr>
//               <td className="px-4 py-2 text-sm text-gray-500">Location</td>
//               <td className="px-4 py-2 text-sm font-medium text-gray-900">
//                 {selectedParticipant.location}
//               </td>
//             </tr>
//             <tr>
//               <td className="px-4 py-2 text-sm text-gray-500">Credits Earned</td>
//               <td className="px-4 py-2 text-sm font-medium text-gray-900">
//                 {selectedParticipant.creditsEarned ?? "N/A"}
//               </td>
//             </tr>
//             <tr>
//               <td className="px-4 py-2 text-sm text-gray-500">Credits Allocated</td>
//               <td className="px-4 py-2 text-sm font-medium text-gray-900">
//                 {selectedParticipant.creditsAllocated ?? "N/A"}
//               </td>
//             </tr>
//           </tbody>
//         </table>
//       </div>

//       {/* Submitted Proofs */}
//       <div className="mt-8">
//         <h4 className="text-lg font-medium text-gray-900 mb-4">Submitted Proof</h4>
//         <div className="grid grid-cols-2 gap-4">
//           {/* Display Proof Image */}
//           {proofData.proofImage ? (
//             <img
//               src={proofData.proofImage}
//               alt="Proof"
//               className="rounded-lg w-full h-48 object-cover"
//             />
//           ) : (
//             <p className="text-gray-500 text-sm col-span-2">No Image Proof Available</p>
//           )}

//           {/* Display Proof Video */}
//           {proofData.proofVideo ? (
//             <video controls className="rounded-lg w-full h-48 object-cover">
//               <source src={proofData.proofVideo} type="video/mp4" />
//               Your browser does not support the video tag.
//             </video>
//           ) : (
//             <p className="text-gray-500 text-sm col-span-2">No Video Proof Available</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ParticipantDetailsPage;

import React from "react";

interface Participant {
  id: string;
  name: string;
  avatar: string;
  project_enroll_status: "approved" | "rejected" | "Completed" | "Proof Submitted";
  serviceType: string;
  enrollmentDate: string;
  location: string;
  creditsEarned?: number;
  creditsAllocated?: number;
  email?: string;
}

const staticParticipants: Participant[] = [
  {
    id: "1",
    name: "John Doe",
    avatar: "https://i.pravatar.cc/150?img=1",
    project_enroll_status: "approved",
    serviceType: "Software Development",
    enrollmentDate: "2025-01-10",
    location: "New York",
    creditsEarned: 100,
    creditsAllocated: 50,
  },
  {
    id: "2",
    name: "Jane Smith",
    avatar: "https://i.pravatar.cc/150?img=2",
    project_enroll_status: "rejected",
    serviceType: "UI/UX Design",
    enrollmentDate: "2025-02-15",
    location: "Los Angeles",
    creditsEarned: 200,
    creditsAllocated: 150,
  },
  {
    id: "3",
    name: "Alice Johnson",
    avatar: "https://i.pravatar.cc/150?img=3",
    project_enroll_status: "Completed",
    serviceType: "Data Science",
    enrollmentDate: "2025-03-01",
    location: "San Francisco",
    creditsEarned: 300,
    creditsAllocated: 100,
  },
  {
    id: "4",
    name: "Bob Brown",
    avatar: "https://i.pravatar.cc/150?img=4",
    project_enroll_status: "Proof Submitted",
    serviceType: "Project Management",
    enrollmentDate: "2025-04-05",
    location: "Chicago",
    creditsEarned: 150,
    creditsAllocated: 50,
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "approved":
      return "bg-green-100 text-green-800";
    case "rejected":
      return "bg-red-100 text-red-800";
    case "Completed":
      return "bg-blue-100 text-blue-800";
    case "Proof Submitted":
      return "bg-indigo-100 text-indigo-800";
    default:
      return "bg-yellow-100 text-yellow-800";
  }
};

const ParticipantList = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 pb-8 ">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden ">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 mt-28">
            <thead className="bg-gray-50">
              <tr>
                {[
                  "S.No",
                  "Location",
                  "Service Type",
                  "Status",
                  "Credits Earned",
                  "Credits Allocated",
                  "Actions",
                ].map((heading) => (
                  <th
                    key={heading}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {staticParticipants.map((participant, index) => (
                <tr key={participant.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm text-gray-500">{index + 1}</td>
                  
                  <td className="px-6 py-4 text-sm text-gray-900">{participant.location}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{participant.serviceType}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-sm font-semibold ${getStatusColor(
                        participant.project_enroll_status
                      )}`}
                    >
                      {participant.project_enroll_status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-emerald-600">
                    {participant.creditsEarned ?? "N/A"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {participant.creditsAllocated ?? "N/A"}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium">
                    <div className="flex space-x-2">
                      {/* <button>Remark </button> */}
                      <button className="text-blue-600 hover:text-blue-900">
                        <i className="fas fa-eye"></i>
                      </button>
                      {/* <button className="text-green-600 hover:text-green-900">
                        <i className="fas fa-check-circle"></i>
                      </button> */}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ParticipantList;
