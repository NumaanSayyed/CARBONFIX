import { useEffect, useState } from "react";
import axios from "axios";
import { backend_url } from "../../backend_route";
import { getWithExpirationCheck } from "../../Helpers/Helpers";

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
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "approved":
      return "bg-green-100 text-green-800";
    case "rejected":
      return "bg-red-100 text-red-800";
    case "Completed":
      return "bg-blue-100 text-blue-800";
    case "proof-submitted":
      return "bg-indigo-100 text-indigo-800";
    default:
      return "bg-yellow-100 text-yellow-800";
  }
};

const ParticipantList = () => {
  const [participants, setParticipants] = useState<Participant[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const token = getWithExpirationCheck("token");
      try {
        const response = await axios.get(
          `${backend_url}/participants/my-projects`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // update path if needed
        const data = response.data;

        // Transforming API response to match Participant interface
        const transformed: Participant[] = data.map(
          (item: any, index: number) => ({
            id: `${index + 1}`,
            name: `Participant ${index + 1}`,
            avatar: `https://i.pravatar.cc/150?img=${index + 1}`,
            project_enroll_status: item.status,
            // item.status === "approved_by_admin"
            //   ? "approved"
            //   : item.status === "rejected"
            //   ? "rejected"
            //   : item.status === "completed"
            //   ? "Completed"
            //   : "Proof Submitted", // adjust as needed
            serviceType: item.org_type || "Unknown",
            enrollmentDate: "2025-01-01", // You can include this if available in API
            location: item.project_category, // Add if available in your DB
            creditsEarned: item.credit_earned,
            creditsAllocated: item.credit_allocated,
          })
        );

        setParticipants(transformed);
      } catch (error) {
        console.error("Failed to fetch participant projects:", error);
      }
    };

    fetchProjects();
  }, []);

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
              {participants.map((participant, index) => (
                <tr
                  key={participant.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {index + 1}
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
                      <button className="text-blue-600 hover:text-blue-900">
                        <i className="fas fa-eye"></i>
                      </button>
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
