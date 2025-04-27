import React, { useState, useEffect } from "react";
import axios from "axios";
import { backend_url } from "../../backend_route";
import { apiResponse } from "../../Helpers/Helpers";

const VerificationTable: React.FC = () => {
  const [showProofModal, setShowProofModal] = useState(false);
  const [proofContent, setProofContent] = useState<any | null>(null);
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [selectedProofId, setSelectedProofId] = useState<string | null>(null);
  const [rejectRemark, setRejectRemark] = useState("");

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

  const approveProof = async (proofId: string, remark: string) => {
    try {
      const token = getWithExpirationCheck("token");
      const response = await axios.patch(
        `${backend_url}/admin/proofs/${proofId}/approve`,
        { remark },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      apiResponse(response.data.message || "Proof approved ", "bg-green-500");
      fetchProofsForAdmin();
    } catch (error) {
      console.error("Error approving proof:", error);
    }
  };

  const rejectProof = async () => {
    try {
      if (!selectedProofId || rejectRemark.trim() === "") return;

      const token = getWithExpirationCheck("token");
      const response = await axios.patch(
        `${backend_url}/admin/proofs/${selectedProofId}/reject`,
        { remark: rejectRemark },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      apiResponse(response.data.message || "Proof rejected", "bg-red-500");
      setShowRejectModal(false);
      setRejectRemark("");
      setSelectedProofId(null);
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
      if (response.data?.data) {
        const formatted = response.data.data.map((proof: any) => ({
          id: proof.id,
          project_name: proof.project_name,
          participant_first_name: proof.first_name,
          participant_last_name: proof.last_name,
          status: proof.status,
          proofImage: proof.image_url || proof.image_path,
          proofVideo: proof.video_url || proof.video_path,
          description: proof.remark || "No description",
        }));
        setEnrollments(formatted);
      }
    } catch (error) {
      console.error("Error fetching proofs for admin:", error);
    }
  };

  useEffect(() => {
    fetchProofsForAdmin();
  }, []);

  const openProofModal = (proof: any) => {
    setProofContent({
      imageUrl: proof.proofImage || null,
      videoUrl: proof.proofVideo || null,
      description: proof.remark || "No description",
    });
    setShowProofModal(true);
  };

  const openRejectModal = (proofId: string) => {
    setSelectedProofId(proofId);
    setRejectRemark("");
    setShowRejectModal(true);
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-12">
      {/* Reject Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Enter Rejection Remark
            </h2>
            <textarea
              rows={4}
              className="w-full p-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-red-400"
              placeholder="Enter reason for rejection..."
              value={rejectRemark}
              onChange={(e) => setRejectRemark(e.target.value)}
            />
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setShowRejectModal(false)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={rejectProof}
                disabled={rejectRemark.trim() === ""}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Proof Modal */}
      {showProofModal && proofContent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
            <h3 className="text-xl text-center text-gray-800 mb-4">
              Proof Content
            </h3>
            {proofContent.imageUrl && (
              <div className="mb-4">
                <img src={proofContent.imageUrl} alt="Proof" className="w-full h-auto" />
              </div>
            )}
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
              className="w-full bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors duration-300"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Main Table */}
      <div className="overflow-x-auto relative">
        <table className="w-full table-auto">
          <thead className="sticky top-0 bg-white z-10 shadow-sm">
            <tr className="border-b border-gray-200">
              {["S.No", "Project Name", "Participant Name", "Status", "Proofs", "Action"].map(
                (heading) => (
                  <th
                    key={heading}
                    className="text-left py-4 px-4 text-sm font-semibold text-gray-600"
                  >
                    {heading}
                  </th>
                )
              )}
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
                <td className="py-4 px-4">
                  {`${participant.participant_first_name} ${participant.participant_last_name}`}
                </td>
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
                  {participant.status === "approved_by_admin" ? (
                    <span className="text-green-600 font-semibold">Proof Approved</span>
                  ) : participant.status === "rejected_by_admin" ? (
                    <span className="text-red-600 font-semibold">Proof Rejected</span>
                  ) : (
                    <div className="flex gap-2">
                      <button
                        onClick={() => approveProof(participant.id, "Approved by admin")}
                        className="px-3 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600"
                      >
                        <i className="fas fa-check mr-1"></i>Validate
                      </button>
                      <button
                        onClick={() => openRejectModal(participant.id)}
                        className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
                      >
                        <i className="fas fa-times mr-1"></i>Reject
                      </button>
                    </div>
                  )}
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
