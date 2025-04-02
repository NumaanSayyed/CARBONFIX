import React, { useState, useEffect } from "react";
import axios from "axios";

const VerificationTable: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedAction, setSelectedAction] = useState<"validate" | "reject" | null>(null);
  const [selectedParticipant, setSelectedParticipant] = useState<string>("");
  const [rejectReason, setRejectReason] = useState("");
  const [showProofModal, setShowProofModal] = useState(false);
  const [proofContent, setProofContent] = useState<{ type: "image" | "video" | "youtube"; url: string; description: string } | null>(null);
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/enroll/all-requests", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setEnrollments(response.data.enrollments);
      } catch (error) {
        console.error("Error fetching enrollments:", error);
      }
    };

    fetchEnrollments();
  }, []);

  const openModal = (action: "validate" | "reject", participant: string) => {
    setSelectedAction(action);
    setSelectedParticipant(participant);
    setRejectReason("");
    setShowModal(true);
  };

  const handleConfirm = async () => {
    if (selectedAction === "reject" && !rejectReason.trim()) {
      setModalMessage("Please provide a reason for rejection.");
      setIsModalOpen(true);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:5000/enroll/approve-reject",
        { enrollment_id: selectedParticipant, status: selectedAction === "validate" ? "approved" : "rejected" },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setModalMessage(`Successfully ${selectedAction === "validate" ? "validated" : "rejected"} ${selectedParticipant}`);
      setIsModalOpen(true);
      setShowModal(false);
    } catch (error) {
      console.error("Error updating status:", error);
      setModalMessage("Failed to update status. Please try again.");
      setIsModalOpen(true);
    }
  };

  const openProofModal = (type: "image" | "video" | "youtube", url: string, description: string) => {
    setProofContent({ type, url, description });
    setShowProofModal(true);
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800">Proof Verifications</h2>
      </div>

       {/* Modal */}
       {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
              <p className="text-center text-gray-800 mb-4">{modalMessage}</p>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300 !rounded-button whitespace-nowrap"
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
              {["S.No", "Project Name", "Participant Name", "Status", "Proofs", "Action"].map((heading) => (
                <th key={heading} className="text-left py-4 px-4 text-sm font-semibold text-gray-600">{heading}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {enrollments.map((participant, index) => (
              <tr key={participant.id} className="border-b border-gray-100 hover:bg-gray-50 even:bg-gray-50/30">
                <td className="py-4 px-4">{index + 1}</td>
                <td className="py-4 px-4">{participant.project_name}</td>
                <td className="py-4 px-4">{`${participant.participant_first_name} ${participant.participant_last_name}`}</td>
                <td className="py-4 px-4">
                  <span className={`px-3 py-1 rounded-full text-sm ${participant.status === "Pending" ? "bg-orange-100 text-orange-700" : "bg-emerald-100 text-emerald-700"}`}>
                    {participant.status}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <button
                    onClick={() => openProofModal("video", participant.proofImage, participant.description)}
                    className="flex items-center gap-2 px-3 py-2 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200"
                  >
                    <i className="fas fa-file-alt text-gray-700"></i>
                    <span className="text-sm text-gray-800">View Proofs</span>
                  </button>
                </td>
                <td className="py-4 px-4">
                  <div className="flex gap-2">
                    <button onClick={() => handleConfirm} className="px-3 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600">
                      <i className="fas fa-check mr-1"></i>Validate
                    </button>
                    <button onClick={() => handleConfirm} className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600">
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
