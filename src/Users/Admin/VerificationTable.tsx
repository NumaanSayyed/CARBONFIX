import React, { useState } from "react";

const VerificationTable: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedAction, setSelectedAction] = useState<
    "validate" | "reject" | null
  >(null);
  const [selectedParticipant, setSelectedParticipant] = useState<string>("");
  const [rejectReason, setRejectReason] = useState("");
  const [showProofModal, setShowProofModal] = useState(false);
  const [proofContent, setProofContent] = useState<{
    type: "image" | "video" | "youtube";
    url: string;
    description: string;
  } | null>(null);

  const openModal = (action: "validate" | "reject", participant: string) => {
    setSelectedAction(action);
    setSelectedParticipant(participant);
    setRejectReason("");
    setShowModal(true);
  };

  const handleConfirm = () => {
    setShowModal(false);
    if (selectedAction === "reject" && !rejectReason.trim()) {
      alert("Please provide a reason for rejection.");
      return;
    }
    alert(
      `Successfully ${
        selectedAction === "validate" ? "validated" : "rejected"
      } ${selectedParticipant}`
    );
  };

  const openProofModal = (
    type: "image" | "video" | "youtube",
    url: string,
    description: string
  ) => {
    setProofContent({ type, url, description });
    setShowProofModal(true);
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800">Proof Verifications</h2>
      </div>

      {/* Table */}
      <div className="overflow-x-auto relative">
        <table className="w-full table-auto">
          <thead className="sticky top-0 bg-white z-10 shadow-sm">
            <tr className="border-b border-gray-200">
              {[
                "S.No",
                "Project Name",
                "Participant Name",
                "Service Provider",
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
            {[
              {
                id: 1,
                provider: "ZED Wellness",
                name: "Sayyed Numan",
                program: "Forestation",
                description:
                  "Join our initiative to restore and protect the Amazon rainforest through sustainable planting and community engagement.",
                status: "Pending",
                proofImage: "https://source.unsplash.com/200x200/?tree",
                proofVideo: "https://www.w3schools.com/html/mov_bbb.mp4",
                youtubeLink: "https://www.youtube.com/embed/dQw4w9WgXcQ",
              },
              {
                id: 2,
                provider: "Green Earth NGO",
                name: "Sam Shaikh",
                program: "Water Conservation",
                description:
                  "Innovative technologies and community efforts to remove plastic waste from our oceans and protect marine ecosystems.",
                progress: 60,
                status: "Valid",
                proofImage: "https://source.unsplash.com/200x200/?water",
                proofVideo: "https://www.w3schools.com/html/mov_bbb.mp4",
                youtubeLink: "https://www.youtube.com/embed/9bZkp7q19f0",
              },
            ].map((participant) => (
              <tr
                key={participant.id}
                className="border-b border-gray-100 hover:bg-gray-50 even:bg-gray-50/30"
              >
                <td className="py-4 px-4">{participant.id}</td>
                <td className="py-4 px-4">{participant.program}</td>
                <td className="py-4 px-4">{participant.name}</td>
                <td className="py-4 px-4">{participant.provider}</td>
                <td className="py-4 px-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      participant.status === "Pending"
                        ? "bg-orange-100 text-orange-700"
                        : "bg-emerald-100 text-emerald-700"
                    }`}
                  >
                    {participant.status}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <button
                    onClick={() =>
                      openProofModal(
                        "video",
                        participant.proofImage,
                        participant.description
                      )
                    }
                    className="flex items-center gap-2 px-3 py-2 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200"
                  >
                    <i className="fas fa-file-alt text-gray-700"></i>
                    <span className="text-sm text-gray-800">View Proofs</span>
                  </button>
                </td>

                <td className="py-4 px-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => openModal("validate", participant.name)}
                      className="px-3 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600"
                    >
                      <i className="fas fa-check mr-1"></i>Validate
                    </button>
                    <button
                      onClick={() => openModal("reject", participant.name)}
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

      {/* Modal for Validation/Rejection */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg w-[400px]">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              {selectedAction === "validate"
                ? "Confirm Validation"
                : "Confirm Rejection"}
            </h3>
            {selectedAction === "reject" && (
              <textarea
                className="w-full p-2 border border-gray-300 rounded-md mb-4"
                placeholder="Enter reason for rejection..."
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
              />
            )}
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className={`px-4 py-2 text-white rounded-md ${
                  selectedAction === "validate" ? "bg-green-500" : "bg-red-500"
                }`}
              >
                {selectedAction === "validate" ? "Validate" : "Reject"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Proof Modal */}
      {showProofModal && proofContent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg max-w-lg relative">
            <button
              onClick={() => setShowProofModal(false)}
              className="absolute top-2 right-2 text-gray-600 text-lg"
            >
              <i className="fas fa-times"></i>
            </button>

            <h3 className="text-lg font-bold text-gray-900 mb-3">
              Project Description
            </h3>
            <p className="text-sm text-gray-700 mb-4">
              {proofContent.description}
            </p>

            <h4 className="text-md font-semibold text-gray-800 mb-2">
              YouTube Proof
            </h4>
            <video controls className="w-full h-48 rounded-md">
              <source src={proofContent.url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            <h4 className="text-md font-semibold text-gray-800 mt-4 mb-2">
              Video Proof
            </h4>
            <iframe
              src={proofContent.url}
              className="w-full h-48 rounded-md"
              allowFullScreen
            ></iframe>

            <h4 className="text-md font-semibold text-gray-800 mt-4 mb-2">
              Supporting Document
            </h4>
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 block text-center"
            >
              View Document
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerificationTable;
