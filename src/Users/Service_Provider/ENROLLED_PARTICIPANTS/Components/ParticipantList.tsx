// import React from "react";

// interface Participant {
//     id: string;
//     name: string;
//     avatar: string;
//     status:  "Approved" | "Pending" | "Completed" | "Proof Submitted";
//     serviceType: string;
//     enrollmentDate: string;
//     location: string;
//     creditsEarned?: number;
//     creditsAllocated?: number;
//     email?: string;
// }

// interface ParticipantListProps {
//     participants: Participant[];
//     viewMode: "grid" | "list";
//     setSelectedParticipant: (participant: Participant) => void;
//     setShowViewModal: (value: boolean) => void;
//     // setUpdateFormData: (data: { credits: string; remarks: string; }) => void;
//     setUpdateFormData: (data: { credits?: string; remarks: string }) => void;

//     setShowUpdateModal: (value: boolean) => void;
//     selectedParticipant: Participant | null;
// }

// const getStatusColor = (status: string) => {
//     switch (status) {
//         case "Active":
//             return "bg-green-600";
//         case "Pending":
//             return "bg-yellow-600";
//         case "Inactive":
//             return "bg-red-600";
//         default:
//             return "bg-gray-500";
//     }
// };

// const formatStandardDate = (dateString: string) => {
//     return new Date(dateString).toISOString().split("T")[0]; // Converts to YYYY-MM-DD
//   };

// const ParticipantList: React.FC<ParticipantListProps> = ({
//     participants,
//     viewMode,
//     setSelectedParticipant,
//     setShowViewModal,
//     setUpdateFormData,
//     setShowUpdateModal,

// }) => {
//     return (
//         <div className="max-w-7xl mx-auto px-4 pb-8">
//             {viewMode === "grid" ? (
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                     {participants.map((participant) => (
//                         <div
//                             key={participant.id}
//                             className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow"
//                         >
//                             <div className="flex flex-col sm:flex-row items-center gap-4">
//                                 <img
//                                     src={participant.avatar}
//                                     alt={participant.name}
//                                     className="w-12 h-12 rounded-full object-cover"
//                                 />
//                                 <div className="flex-1">
//                                     <h3 className="font-medium text-gray-900">{participant.name ?? "Humaira"}</h3>
//                                     <p className="text-sm text-gray-500">ID: {participant.id}</p>
//                                 </div>
//                             </div>
//                             <div className="mt-4 grid grid-cols-2 gap-4">
//                                 <div>
//                                     <p className="text-sm text-gray-500">Status</p>
//                                     <span
//                                         className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
//                                             participant.status
//                                         )} text-white`}
//                                     >
//                                         {participant.status}
//                                     </span>
//                                 </div>
//                                 <div>
//                                     <p className="text-sm text-gray-500">Service Type</p>
//                                     <p className="text-sm font-medium text-gray-900">{participant.serviceType}</p>
//                                 </div>
//                                 <div>
//                                     <p className="text-sm text-gray-500">Location</p>
//                                     <p className="text-sm font-medium text-gray-900">{participant.location}</p>
//                                 </div>
//                                 <div>
//                                     <p className="text-sm text-gray-500">Enrollment Date</p>
//                                     <p className="text-sm font-medium text-gray-900">{formatStandardDate(participant.enrollmentDate)}</p>
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             ) : (
//                 <div className="bg-white rounded-lg shadow-sm overflow-hidden">
//                     <div className="overflow-x-auto">
//                         <table className="min-w-full divide-y divide-gray-200">
//                             <thead className="bg-gray-50">
//                                 <tr>
//                                     {["S.No", "Participant", "Area", "Project", "Status", "Credits Earned", "Credits Allocated", "Actions","Approve/Reject"].map(
//                                         (heading) => (
//                                             <th
//                                                 key={heading}
//                                                 className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                                             >
//                                                 {heading}
//                                             </th>
//                                         )
//                                     )}
//                                 </tr>
//                             </thead>
//                             <tbody className="bg-white divide-y divide-gray-200">
//                                 {participants.map((participant, index) => (
//                                     <React.Fragment key={participant.id}>
//                                         <tr
//                                             className="hover:bg-gray-50 transition-colors cursor-pointer group"
//                                             onClick={() => setSelectedParticipant(participant)}
//                                         >
//                                             <td className="px-6 py-4 text-sm text-gray-500">{index + 1}</td>
//                                             <td className="px-6 py-4">
//                                                 <div className="flex items-center">
//                                                     <img
//                                                         className="h-10 w-10 rounded-full"
//                                                         src={participant.avatar}
//                                                         alt={participant.name}
//                                                     />
//                                                     <div className="ml-4">
//                                                         <div className="text-sm font-medium text-blue-600 group-hover:text-blue-800">
//                                                             {participant.name}
//                                                         </div>
//                                                         <div className="text-xs text-gray-500">
//                                                             {participant.email || `${participant.id}@ecoedu.com`}
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                             </td>
//                                             <td className="px-6 py-4 text-sm text-gray-900">{participant.location}</td>
//                                             <td className="px-6 py-4 text-sm text-gray-900">{participant.serviceType}</td>
//                                             <td className="px-6 py-4">
//                                                 <span
//                                                     className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
//                                                         participant.status
//                                                     )} text-white`}
//                                                 >
//                                                     {participant.status}
//                                                 </span>
//                                             </td>
//                                             <td className="px-6 py-4 text-sm font-medium text-emerald-600">
//                                                 {participant.creditsEarned ?? "N/A"}
//                                             </td>
//                                             <td className="px-6 py-4 text-sm text-gray-900">
//                                                 {participant.creditsAllocated ?? "N/A"}
//                                             </td>
//                                             <td className="px-6 py-4 text-sm font-medium">
//                                                 <div className="flex space-x-2">
//                                                     <button
//                                                         onClick={(e) => {
//                                                             e.stopPropagation();
//                                                             setSelectedParticipant(participant);
//                                                             setShowViewModal(true);
//                                                         }}
//                                                         className="text-blue-600 hover:text-blue-900"
//                                                     >
//                                                         <i className="fas fa-eye"></i>
//                                                     </button>
//                                                     <button
//                                                         onClick={(e) => {
//                                                             e.stopPropagation();
//                                                             setSelectedParticipant(participant);
//                                                             setUpdateFormData({
//                                                                 credits: participant.creditsAllocated?.toString() || "",
//                                                                 remarks: "",
//                                                             });
//                                                             setShowUpdateModal(true);
//                                                         }}
//                                                         className="text-green-600 hover:text-green-900"
//                                                     >
//                                                         <i className="fas fa-check-circle"></i>
//                                                     </button>
//                                                 </div>
//                                             </td>
//                                             <td>
//                                                 <button className="pr-2 bg-green-500 btn mr-2 ">Approve</button>
//                                                 <button className="pr-2 bg-red-500 btn mr-2 ">Reject</button>
//                                             </td>
//                                         </tr>
//                                     </React.Fragment>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default ParticipantList;

import React from "react";
import axios from "axios"; // ✅ Import axios

interface Participant {
  id: string;
  name: string;
  avatar: string;
  project_enroll_status:
    | "approved"
    | "rejected"
    | "Completed"
    | "Proof Submitted";
  serviceType: string;
  enrollmentDate: string;
  location: string;
  creditsEarned?: number;
  creditsAllocated?: number;
  email?: string;
  participant_id: string;
}

interface ParticipantListProps {
  participants: Participant[];
  viewMode: "grid" | "list";
  // setSelectedParticipant: (participant: Participant | null ) => void;
  setSelectedParticipant: (participant: Participant | null) => void;
  setShowViewModal: (value: boolean) => void;
  setUpdateFormData: (data: { credits?: string; remarks: string }) => void;
  setShowUpdateModal: (value: boolean) => void;
  selectedParticipant: Participant | null;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "Active":
      return "bg-green-600";
    case "Pending":
      return "bg-yellow-600";
    case "Inactive":
      return "bg-red-600";
    default:
      return "bg-gray-500";
  }
};

const formatStandardDate = (dateString: string) => {
  return new Date(dateString).toISOString().split("T")[0]; // Converts to YYYY-MM-DD
};

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

// ✅ API call function for Approve/Reject
const handleEnrollmentAction = async (
  enrollmentId: string,
  action: "approved" | "rejected"
) => {
  try {
    const token = getWithExpirationCheck("token");
    const response = await axios.put(
      "https://carbonfix-backend-5y3e.onrender.com/enroll/approve-reject",
      {
        enrollment_id: enrollmentId,
        status: action,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, // ✅ Pass Bearer token
        },
      }
    );

    if (response.status === 200) {
      alert(`Enrollment ${action} successfully`);
      window.location.reload(); // Reload to update UI
    }
  } catch (error) {
    console.error(`Failed to ${action} enrollment:`, error);
    alert(`Failed to ${action} enrollment`);
  }
};


const ParticipantList: React.FC<ParticipantListProps> = ({
  participants,
  viewMode,
  setSelectedParticipant,
  setShowViewModal,
  setUpdateFormData,
  setShowUpdateModal,
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 pb-8">
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {participants.map((participant) => (
            <div
              key={participant.id}
              className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <img
                  src={participant.avatar}
                  alt={participant.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">
                    {participant.name ?? "Humaira"}
                  </h3>
                  <p className="text-sm text-gray-500">ID: {participant.id}</p>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                      participant.project_enroll_status
                    )} text-white`}
                  >
                    {participant.project_enroll_status}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Service Type</p>
                  <p className="text-sm font-medium text-gray-900">
                    {participant.serviceType}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="text-sm font-medium text-gray-900">
                    {participant.location}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Enrollment Date</p>
                  <p className="text-sm font-medium text-gray-900">
                    {formatStandardDate(participant.enrollmentDate)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {[
                    "S.No",
                    "Participant",
                    "Area",
                    "Project",
                    "Status",
                    "Credits Earned",
                    "Credits Allocated",
                    "Actions",
                    "Approve/Reject",
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
                {participants.map((participant, index) => (
                  <React.Fragment key={participant.id}>
                    <tr
                      className="hover:bg-gray-50 transition-colors cursor-pointer group"
                      onClick={() => setSelectedParticipant(participant)}
                    >
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <img
                            className="h-10 w-10 rounded-full"
                            src={participant.avatar}
                            alt={participant.name}
                          />
                          <div className="ml-4">
                            <div className="text-sm font-medium text-blue-600 group-hover:text-blue-800">
                              {participant.name}
                            </div>
                            <div className="text-xs text-gray-500">
                              {participant.email ||
                                `${participant.id}@ecoedu.com`}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {participant.location}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {participant.serviceType}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 
                            ${
                              participant.project_enroll_status == "approved"
                                ? "bg-green-100 text-green-800"
                                : participant.project_enroll_status ==
                                  "rejected"
                                ? "bg-red-100 text-red-800"
                                : "bg-yellow-100 text-yellow-800"
                            }
                            }
                            font-semibold rounded-full ${getStatusColor(
                              participant.project_enroll_status
                            )} `}
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
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedParticipant(participant);
                              setShowViewModal(true);
                            }}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <i className="fas fa-eye"></i>
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedParticipant(participant);
                              setUpdateFormData({
                                credits:
                                  participant.creditsAllocated?.toString() ||
                                  "",
                                remarks: "",
                              });
                              setShowUpdateModal(true);
                            }}
                            className="text-green-600 hover:text-green-900"
                          >
                            <i className="fas fa-check-circle"></i>
                          </button>
                        </div>
                      </td>
                      <td>
                        <div className="flex justify-center">
                          {/* Show "Approve" button if status is "rejected" */}
                          {participant.project_enroll_status === "rejected" && (
                            <button
                              className="pr-2 bg-green-500 btn mr-2"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleEnrollmentAction(
                                  participant.id,
                                  "approved"
                                );
                              }}
                            >
                              Approve
                            </button>
                          )}

                          {/* Show "Reject" button if status is "approved" */}
                          {participant.project_enroll_status === "approved" && (
                            <button
                              className="pr-2 bg-red-500 btn mr-2"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleEnrollmentAction(
                                  participant.id,
                                  "rejected"
                                );
                              }}
                            >
                              Reject
                            </button>
                          )}

                          {/* Show both buttons if status is neither "approved" nor "rejected" */}
                          {participant.project_enroll_status !== "approved" &&
                            participant.project_enroll_status !==
                              "rejected" && (
                              <>
                                <button
                                  className="pr-2 bg-green-500 btn mr-2"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleEnrollmentAction(
                                      participant.id,
                                      "approved"
                                    );
                                  }}
                                >
                                  Approve
                                </button>

                                <button
                                  className="pr-2 bg-red-500 btn mr-2"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleEnrollmentAction(
                                      participant.id,
                                      "rejected"
                                    );
                                  }}
                                >
                                  Reject
                                </button>
                              </>
                            )}

{/* <button
                    onClick={() => handleSendToAdmin(participant.id)} // Pass participant ID
                    className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                  >
                    Send to Admin
                  </button> */}
                        </div>
                      </td>
                    </tr>
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ParticipantList;
