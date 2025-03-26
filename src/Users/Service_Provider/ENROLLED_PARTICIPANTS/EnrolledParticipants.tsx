import React, { useState } from "react";
import Header from "./Components/Header";
import SearchFilter from "./Components/SearchFilter";
import NotificationPanel from "./Components/NotificationPanel";
import ViewParticipantModal from "./Components/ViewParticipantModal";
import UpdateProofStatusModal from "./Components/UpdateProofStatusModal";
import ParticipantList from "./Components/ParticipantList";
// import PendingEnrollments from "./Components/PendingEnrollments";

//Participant Type
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
    proofImage?: string; 
    proofVideo?: string;
    area?: string;
}

//Notification Type
interface Notification {
    id: string;
    type: "enrollment" | "update" | "alert"; 
    message: string;
    timestamp: string;
    isRead: boolean;
}

const EnrolledParticipants: React.FC = () => {
    const [participants, ] = useState<Participant[]>([
        {
            id: "P1001",
            name: "Emily Richardson",
            avatar: "https://randomuser.me/api/portraits/women/44.jpg",
            status: "Active",
            serviceType: "Forestation",
            enrollmentDate: "2025-02-28",
            location: "New York",
            creditsEarned: 200,
            creditsAllocated: 250,
            email: "emily@example.com",
            proofImage: "https://imgs.mongabay.com/wp-content/uploads/sites/30/2019/02/25103822/Banner1-6-e1551071497420.jpg",
            proofVideo: "https://v.ftcdn.net/05/49/47/61/700_F_549476136_ntjNDtBok3X3msvnUtgG8P0VgxkwtaCE_ST.mp4"
        },
        {
            id: "P1002",
            name: "Michael Anderson",
            avatar: "https://randomuser.me/api/portraits/men/50.jpg",
            status: "Pending",
            serviceType: "Soil Conservation",
            enrollmentDate: "2025-03-01",
            location: "Los Angeles",
            creditsEarned: 150,
            creditsAllocated: 200,
            email: "michael@example.com",
        },
    ]);

    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const [showNotifications, setShowNotifications] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [selectedParticipant, setSelectedParticipant] = useState<Participant | null>(null);
    // const [updateFormData, setUpdateFormData] = useState({ credits: "", remarks: "" });
    const [updateFormData, setUpdateFormData] = useState<{ credits?: string; remarks: string }>({ 
        credits: "", 
        remarks: "" 
      });
    const [searchTerm, setSearchTerm] = useState("");
    const [showFilterPanel, setShowFilterPanel] = useState(false);

    // Sample Notifications Data
    const notifications: Notification[] = [
        {
            id: "N1001",
            type: "enrollment",
            message: "New enrollment request from Emily Richardson",
            timestamp: "2 hours ago",
            isRead: false,
        },
        {
            id: "N1002",
            type: "update",
            message: "Michael Anderson updated their profile information",
            timestamp: "4 hours ago",
            isRead: false,
        },
    ];

    //Functions for Notifications
    const toggleNotifications = () => setShowNotifications(!showNotifications);
    const markAllAsRead = () => {
        console.log("Marked all as read");
    };
    const clearAllNotifications = () => {
        console.log("Cleared all notifications");
    };

    return (
        <div className="min-h-screen bg-[#F5F5F5] pt-20"> 
            {/*Header Component */}
            <Header toggleNotifications={toggleNotifications} notifications={notifications} />

            {/*Search & Filter Component */}
            <SearchFilter
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                showFilterPanel={showFilterPanel}
                setShowFilterPanel={setShowFilterPanel}
                viewMode={viewMode}
                setViewMode={setViewMode}
            />

            {/* Pending Enrollment  */}
            {/* <PendingEnrollments/> */}

            
            {/*Participant List */}
            <ParticipantList
                participants={participants}
                viewMode={viewMode}
                selectedParticipant={selectedParticipant}
                setShowViewModal={setShowViewModal}
                setSelectedParticipant={setSelectedParticipant}
                setShowUpdateModal={setShowUpdateModal}
                setUpdateFormData={setUpdateFormData}
            />

            {/*Notification Panel */}
            <NotificationPanel
                notifications={notifications}
                showNotifications={showNotifications}
                toggleNotifications={toggleNotifications}
                markAllAsRead={markAllAsRead}
                clearAllNotifications={clearAllNotifications}
            />

            {/*View Participant Modal */}
            <ViewParticipantModal
                selectedParticipant={selectedParticipant}
                showViewModal={showViewModal}
                setShowViewModal={setShowViewModal}
                setShowUpdateModal={setShowUpdateModal}
                setUpdateFormData={setUpdateFormData}
            />

            

            {/*Update Proof Status Modal */}
            <UpdateProofStatusModal
                showUpdateModal={showUpdateModal}
                setShowUpdateModal={setShowUpdateModal}
                updateFormData={updateFormData}
                setUpdateFormData={setUpdateFormData}
                // setUpdateFormData={setUpdateFormData}
            />
        </div>
    );
};

export default EnrolledParticipants;
