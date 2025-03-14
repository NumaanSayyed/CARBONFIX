import React from "react";

interface Participant {
    id: string;
    name: string;
    avatar: string;
    status: "Active" | "Pending" | "Inactive";
    serviceType: string;
    enrollmentDate: string;
    location: string;
    creditsEarned?: number;
    creditsAllocated?: number;
    email?: string;
}

interface ParticipantListProps {
    participants: Participant[];
    viewMode: "grid" | "list";
    setSelectedParticipant: (participant: Participant) => void;
    setShowViewModal: (value: boolean) => void;
    setUpdateFormData: (data: { credits: string; remarks: string; }) => void;
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
                                    <h3 className="font-medium text-gray-900">{participant.name}</h3>
                                    <p className="text-sm text-gray-500">ID: {participant.id}</p>
                                </div>
                            </div>
                            <div className="mt-4 grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-gray-500">Status</p>
                                    <span
                                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                                            participant.status
                                        )} text-white`}
                                    >
                                        {participant.status}
                                    </span>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Service Type</p>
                                    <p className="text-sm font-medium text-gray-900">{participant.serviceType}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Location</p>
                                    <p className="text-sm font-medium text-gray-900">{participant.location}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Enrollment Date</p>
                                    <p className="text-sm font-medium text-gray-900">{participant.enrollmentDate}</p>
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
                                    {["S.No", "Participant", "Area", "Program", "Status", "Credits Earned", "Credits Allocated", "Actions"].map(
                                        (heading) => (
                                            <th
                                                key={heading}
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                {heading}
                                            </th>
                                        )
                                    )}
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {participants.map((participant, index) => (
                                    <React.Fragment key={participant.id}>
                                        <tr
                                            className="hover:bg-gray-50 transition-colors cursor-pointer group"
                                            onClick={() => setSelectedParticipant(participant)}
                                        >
                                            <td className="px-6 py-4 text-sm text-gray-500">{index + 1}</td>
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
                                                            {participant.email || `${participant.id}@ecoedu.com`}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-900">{participant.serviceType}</td>
                                            <td className="px-6 py-4 text-sm text-gray-900">{participant.location}</td>
                                            <td className="px-6 py-4">
                                                <span
                                                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                                                        participant.status
                                                    )} text-white`}
                                                >
                                                    {participant.status}
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
                                                                credits: participant.creditsAllocated?.toString() || "",
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
