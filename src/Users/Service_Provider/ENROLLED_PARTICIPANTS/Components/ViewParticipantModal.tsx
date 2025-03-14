import React from "react";

interface Participant {
    id: string;
    name: string;
    avatar: string;
    status: string;
    serviceType: string;
    enrollmentDate: string;
    location: string;
    creditsEarned?: number;
    creditsAllocated?: number;
    email?: string;
    proofImage?: string; // Single image URL
    proofVideo?: string; // Single video URL
}

interface ViewParticipantModalProps {
    selectedParticipant: Participant | null;
    showViewModal: boolean;
    setShowViewModal: (value: boolean) => void;
    setShowUpdateModal: (value: boolean) => void;
    setUpdateFormData: (data: { credits: string; remarks: string; }) => void;
}

const ViewParticipantModal: React.FC<ViewParticipantModalProps> = ({
    selectedParticipant,
    showViewModal,
    setShowViewModal,
    // setShowUpdateModal,
    // setUpdateFormData,
}) => {
    if (!showViewModal || !selectedParticipant) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl w-[90vw] sm:w-[600px] lg:w-[800px] max-h-[80vh] overflow-hidden mx-4">
                {/* Header */}
                <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                    <h2 className="text-2xl font-semibold text-gray-900">Participant Details</h2>
                    <button
                        onClick={() => setShowViewModal(false)}
                        className="text-gray-400 hover:text-gray-500"
                    >
                        <i className="fas fa-times text-xl"></i>
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto max-h-[calc(80vh-120px)]">
                    <div className="flex items-center gap-4 mb-6">
                        <img
                            src={selectedParticipant.avatar}
                            alt={selectedParticipant.name}
                            className="w-20 h-20 rounded-full object-cover"
                        />
                        <div>
                            <h3 className="text-xl font-semibold text-gray-900">{selectedParticipant.name}</h3>
                            <p className="text-gray-500">{selectedParticipant.email}</p>
                        </div>
                    </div>

                    {/* Participant Info */}
                    <div className="grid grid-cols-2 gap-4 mb-8">
                        <div>
                            <p className="text-sm text-gray-500">Status</p>
                            <span
                                className={`px-3 py-1 rounded-full text-sm text-white ${selectedParticipant.status === "Active"
                                        ? "bg-green-500"
                                        : selectedParticipant.status === "Pending"
                                            ? "bg-yellow-500"
                                            : "bg-red-500"
                                    }`}
                            >
                                {selectedParticipant.status}
                            </span>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Service Type</p>
                            <p className="text-sm font-medium text-gray-900">{selectedParticipant.serviceType}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Enrollment Date</p>
                            <p className="text-sm font-medium text-gray-900">{selectedParticipant.enrollmentDate}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Location</p>
                            <p className="text-sm font-medium text-gray-900">{selectedParticipant.location}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Credits Earned</p>
                            <p className="text-sm font-medium text-gray-900">{selectedParticipant.creditsEarned ?? "N/A"}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Credits Allocated</p>
                            <p className="text-sm font-medium text-gray-900">{selectedParticipant.creditsAllocated ?? "N/A"}</p>
                        </div>
                    </div>

                    {/* Submitted Proofs */}
                    <div className="mb-8">
                        <h4 className="text-lg font-medium text-gray-900 mb-4">Submitted Proof</h4>
                        <div className="grid grid-cols-2 gap-4">
                            {/* Display Proof Image */}
                            {selectedParticipant.proofImage ? (
                                <img
                                    src={selectedParticipant.proofImage}
                                    alt="Proof"
                                    className="rounded-lg w-full h-48 object-cover"
                                />
                            ) : (
                                <p className="text-gray-500 text-sm col-span-2">No Image Proof Available</p>
                            )}

                            {/* Display Proof Video */}
                            {selectedParticipant.proofVideo ? (
                                <video controls className="rounded-lg w-full h-48 object-cover">
                                    <source src={selectedParticipant.proofVideo} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            ) : (
                                <p className="text-gray-500 text-sm col-span-2">No Video Proof Available</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* CLOSE AND UPDATE PROOF BUTTONS*/}

                {/* <div className="p-6 border-t border-gray-200 flex justify-end gap-4">
                    <button
                        onClick={() => setShowViewModal(false)}
                        className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
                    >
                        Close
                    </button>
                    <button
                        onClick={() => {
                            setUpdateFormData({
                                credits: selectedParticipant.creditsAllocated?.toString() || "",
                                remarks: "",
                            });
                            setShowUpdateModal(true);
                        }}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                    >
                        Update Proof Status
                    </button>
                </div> */}
            </div>
        </div>
    );
};

export default ViewParticipantModal;
