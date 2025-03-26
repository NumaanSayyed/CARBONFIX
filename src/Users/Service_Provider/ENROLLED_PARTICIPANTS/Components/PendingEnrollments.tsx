import React from "react";

interface EnrollmentRequest {
    id: string;
    name: string;
    email: string;
    program: string;
    location: string;
    creditsEarned: number;
    status: "Pending" | "Proof Submitted";
}

const pendingRequests: EnrollmentRequest[] = [
    {
        id: "1",
        name: "Alexandra Martinez",
        email: "alexandra.m@ecoedu.com",
        program: "Forest Conservation Project",
        location: "Amazon Rainforest Area",
        creditsEarned: 245,
        status: "Pending",
    },
    {
        id: "2",
        name: "Benjamin Chen",
        email: "ben.chen@ecoedu.com",
        program: "Ocean Conservation Project",
        location: "Great Barrier Reef Area",
        creditsEarned: 180,
        status: "Proof Submitted",
    },
];

const PendingEnrollments: React.FC = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                    Pending Enrollment Requests
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {pendingRequests.map((request) => (
                        <div
                            key={request.id}
                            className="border border-gray-100 rounded-xl p-5 hover:shadow-lg transition-shadow"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <h3 className="font-bold text-gray-900">{request.name}</h3>
                                    <p className="text-sm text-gray-500">{request.email}</p>
                                </div>
                                <span
                                    className={`px-3 py-1 rounded-full text-sm font-medium ${request.status === "Pending"
                                            ? "bg-yellow-100 text-yellow-700"
                                            : "bg-blue-100 text-blue-700"
                                        }`}
                                >
                                    {request.status}
                                </span>
                            </div>
                            <div className="space-y-3 mb-4">
                                <div className="flex items-center gap-2">
                                    <i className="fas fa-tree text-green-600"></i>
                                    <span className="text-gray-700">{request.program}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <i className="fas fa-map-marker-alt text-blue-600"></i>
                                    <span className="text-gray-700">{request.location}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <i className="fas fa-leaf text-emerald-600"></i>
                                    <span className="text-gray-700">
                                        Credits Earned:{" "}
                                        <span className="font-semibold text-emerald-600 animate-pulse">
                                            {request.creditsEarned}
                                        </span>
                                    </span>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <button className="flex-1 py-2 bg-[#2E7D32] hover:bg-[#1b5e20] text-white rounded-lg transition-all hover:animate-glow !rounded-button whitespace-nowrap">
                                    Accept
                                </button>
                                <button className="flex-1 py-2 bg-[#FFA000] hover:bg-[#FF6F00] text-white rounded-lg transition-all hover:animate-shake !rounded-button whitespace-nowrap">
                                    Reject
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PendingEnrollments;
