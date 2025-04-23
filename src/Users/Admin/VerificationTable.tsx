import React, { useState, useEffect } from "react";
import axios from "axios";
import { backend_url } from "../../backend_route";
import { apiResponse } from "../../Helpers/Helpers";

const VerificationTable: React.FC = () => {
  const [showProofModal, setShowProofModal] = useState(false);
  const [proofContent, setProofContent] = useState<{
    imageUrl: string | null;
    videoUrl: string | null;
    description: string;
  } | null>(null);
  const [enrollments, setEnrollments] = useState<any[]>([]);

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

  // Approve proof function
  const approveProof = async (proofId: string, remark: string) => {
    try {
      const token = getWithExpirationCheck("token");
      const response = await axios.patch(
        // /proofs/:proofId/reject
        // /proofs/:proofId/approve
        `${backend_url}/admin/proofs/${proofId}/approve`,
        { remark },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // alert(response.data.message); // Notify the admin/
      apiResponse(response.data.message, "bg-green-500");
      // Refresh the data after approval
      fetchProofsForAdmin();
    } catch (error) {
      console.error("Error approving proof:", error);
    }
  };

  // Reject proof function
  const rejectProof = async (proofId: string, remark: string) => {
    try {
      const token = getWithExpirationCheck("token");
      const response = await axios.patch(
        `${backend_url}/admin/proofs/${proofId}/reject`,
        { remark },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // alert(response.data.message); // Notify the admin
      apiResponse(response.data.message, "bg-red-500");

      // Refresh the data after rejection
      fetchProofsForAdmin();
    } catch (error) {
      console.error("Error rejecting proof:", error);
    }
  };

  const fetchProofsForAdmin = async () => {
    try {
      const token = getWithExpirationCheck("token");
      const response = await axios.get(`${backend_url}/admin/getProofs`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data && response.data.data) {
        const formattedData = response.data.data.map((proof: any) => ({
          id: proof.id,
          project_name: proof.project_name,
          participant_first_name: proof.first_name,
          participant_last_name: proof.last_name,
          status: proof.status,
          proofImage: proof.image_url || proof.image_path,
          proofVideo: proof.video_url || proof.video_path,
          description: proof.remark || "No description",
        }));

        setEnrollments(formattedData);
      }
    } catch (error) {
      console.error("Error fetching proofs for admin:", error);
    }
  };

  useEffect(() => {
    fetchProofsForAdmin();
  }, []);

  const openProofModal = (proof: any) => {
    console.log("Selected Proof:", proof); // Debugging
    console.log(proof.proofImage);

    // Set proof content
    setProofContent({
      imageUrl: proof.proofImage || null,
      videoUrl: proof.proofVideo || null,
      description: proof.remark || "No description",
    });

    // Open the proof modal
    setShowProofModal(true);
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-12">
      {/* Proof Modal */}
      {showProofModal && proofContent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
            <h3 className="text-xl text-center text-gray-800 mb-4">
              Proof Content
            </h3>

            {/* Show Image */}
            {proofContent.imageUrl && (
              <div className="mb-4">
                <img
                  src={proofContent.imageUrl}
                  alt="Proof"
                  className="w-full h-auto"
                />
              </div>
            )}

            {/* Show Video */}
            {proofContent.videoUrl && (
              <div className="mb-4">
                <video controls className="w-full h-auto">
                  <source src={proofContent.videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            )}

            <button
              onClick={() => setShowProofModal(false)}
              className="w-full bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors duration-300 !rounded-button whitespace-nowrap mt-4"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto relative">
        <table className="w-full table-auto">
          <thead className="sticky top-0 bg-white z-10 shadow-sm">
            <tr className="border-b border-gray-200">
              {[
                "S.No",
                "Project Name",
                "Participant Name",
                "Status",
                "Proofs",
                "Action",
              ].map((heading) => (
                <th
                  key={heading}
                  className="text-left py-4 px-4 text-sm font-semibold text-gray-600"
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {enrollments.map((participant, index) => (
              <tr
                key={participant.id}
                className="border-b border-gray-100 hover:bg-gray-50 even:bg-gray-50/30"
              >
                <td className="py-4 px-4">{index + 1}</td>
                <td className="py-4 px-4">{participant.project_name}</td>
                <td className="py-4 px-4">{`${participant.participant_first_name} ${participant.participant_last_name}`}</td>
                <td className="py-4 px-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      participant.status === "pending_admin_review"
                        ? "bg-orange-100 text-orange-700"
                        : participant.status === "rejected_by_admin"
                        ? "bg-red-100 text-red-700"
                        : "bg-emerald-100 text-emerald-700"
                    }`}
                  >
                    {participant.status}
                  </span>
                </td>

                <td className="py-4 px-4">
                  <button
                    onClick={() => openProofModal(participant)}
                    className="flex items-center gap-2 px-3 py-2 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200"
                  >
                    <i className="fas fa-file-alt text-gray-700"></i>
                    <span className="text-sm text-gray-800">View Proofs</span>
                  </button>
                </td>
                <td className="py-4 px-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        approveProof(participant.id, "Approved by admin")
                      }
                      className="px-3 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600"
                    >
                      <i className="fas fa-check mr-1"></i>Validate
                    </button>
                    <button
                      onClick={() =>
                        rejectProof(participant.id, "Rejected by admin")
                      }
                      className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
                    >
                      <i className="fas fa-times mr-1"></i>Reject
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VerificationTable;
