import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { backend_url } from "../../../../backend_route";

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
  setSelectedParticipant: (participant: Participant | null) => void;
  setShowViewModal: (value: boolean) => void;
  setUpdateFormData: (data: { credits?: string; remarks: string }) => void;
  setShowUpdateModal: (value: boolean) => void;
  selectedParticipant: Participant | null;
}

// ✅ Updated color mapping
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
    case "Pending":
    default:
      return "bg-yellow-100 text-yellow-800";
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
  const navigate = useNavigate();

  const formatStandardDate = (dateString: string) => {
    return new Date(dateString).toISOString().split("T")[0];
  };

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

  const handleEnrollmentAction = async (
    enrollmentId: string,
    action: "approved" | "rejected"
  ) => {
    try {
      const token = getWithExpirationCheck("token");
      const response = await axios.put(
        `${backend_url}/enroll/approve-reject`,
        {
          enrollment_id: enrollmentId,
          status: action,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        alert(`Enrollment ${action} successfully`);
        // navigate("");
        navigate(0);
      }
    } catch (error) {
      console.error(`Failed to ${action} enrollment:`, error);
      alert(`Failed to ${action} enrollment`);
    }
  };

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
                  {/* <p className="text-sm text-gray-500">ID: {participant.id}</p> */}
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <span
                    className={`px-2 py-1 rounded-full text-sm font-semibold ${getStatusColor(
                      participant.project_enroll_status
                    )}`}
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
                          {participant.project_enroll_status === "rejected" && (
                            <button
                              className="pr-4 pl-4 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300 active:bg-green-700 transition duration-200 ease-in-out"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleEnrollmentAction(participant.id, "approved");
                              }}
                            >
                              Approve
                            </button>
                          )}

                          {participant.project_enroll_status === "approved" && (
                            <button
                              className="pr-4 pl-4 mr-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 active:bg-red-700 transition duration-200 ease-in-out"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleEnrollmentAction(participant.id, "rejected");
                              }}
                            >
                              Reject
                            </button>
                          )}

                          {participant.project_enroll_status !== "approved" &&
                            participant.project_enroll_status !== "rejected" && (
                              <>
                                <button
                                  className="pr-4 pl-4 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300 active:bg-green-700 transition duration-200 ease-in-out"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleEnrollmentAction(participant.id, "approved");
                                  }}
                                >
                                  Approve
                                </button>

                                <button
                                  className="pr-4 pl-4 py-2 ml-4 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 active:bg-red-700 transition duration-200 ease-in-out"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleEnrollmentAction(participant.id, "rejected");
                                  }}
                                >
                                  Reject
                                </button>
                              </>
                            )}
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
