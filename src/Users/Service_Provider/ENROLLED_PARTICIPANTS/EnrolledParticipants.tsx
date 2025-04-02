import React, { useState, useEffect } from "react";
import Header from "./Components/Header";
import SearchFilter from "./Components/SearchFilter";
import NotificationPanel from "./Components/NotificationPanel";
import ViewParticipantModal from "./Components/ViewParticipantModal";
import UpdateProofStatusModal from "./Components/UpdateProofStatusModal";
import ParticipantList from "./Components/ParticipantList";
// import PendingEnrollments from "./Components/PendingEnrollments";
import axios from "axios";

//Participant Type
interface Participant {
  id: string; // exist
  name: string; //exist
  avatar: string;
  status: "Approved" | "Pending" | "Completed" | "Proof Submitted"; //exist
  serviceType: string;
  enrollmentDate: string; // exist as created_at
  location: string;
  creditsEarned?: number;
  creditsAllocated?: number;
  email?: string;
  proofImage?: string;
  proofVideo?: string;
  area?: string;
  // last_name exist in backend but not in frontend
  // location (backend there , but not in fronetned )
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
  const [participants, setParticipants] = useState<Participant[]>([]);

  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showNotifications, setShowNotifications] = useState(false);

  const [showViewModal, setShowViewModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedParticipant, setSelectedParticipant] =
    useState<Participant | null>(null);
  const [updateFormData, setUpdateFormData] = useState<{
    credits?: string;
    remarks: string;
  }>({
    credits: "",
    remarks: "",
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
  /* here the api that fetches all the partiipants should come instead of this
    useEffect(() => {
      const fetchParticipants = async () => {
          setLoading(true);
          setError(null);
  
          try {
              const response = await axios.get(
                  "http://localhost:5000/enroll/all-requests",
                  {
                      headers: {
                          Authorization: `Bearer ${localStorage.getItem("token")}`,
                          "Content-Type": "application/json",
                      },
                  }
              );
  
              const formattedParticipants: Participant[] = response.data.enrollments.map((enrollment: any) => ({
                  id: enrollment.participant_id, 
                  name: `${enrollment.participant_first_name} ${enrollment.participant_last_name}`,
                  avatar: "https://randomuser.me/api/portraits/men/45.jpg", // Placeholder (No avatar in API)
                  status: enrollment.status,
                  serviceType: enrollment.project_name, // Map project name to serviceType
                  enrollmentDate: enrollment.created_at,
                  location: "NA", // No location in API response, keeping it empty
                  creditsEarned: undefined, // Placeholder (Not in API)
                  creditsAllocated: undefined, // Placeholder (Not in API)
                  email: undefined, // Placeholder (Not in API)
                  proofImage: undefined, // Placeholder (Not in API)
                  proofVideo: undefined, // Placeholder (Not in API)
                  area: undefined, // Placeholder (Not in API)
              }));
  
              setParticipants(formattedParticipants);
          } catch (error) {
              console.error("Error fetching participants:", error);
              setError("Failed to load participants.");
          } finally {
              setLoading(false);
          }
      };
  
      fetchParticipants();
  }, []);
  */

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
      <Header
        toggleNotifications={toggleNotifications}
        notifications={notifications}
      />

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
      {loading ? (
        <p className="text-center">Loading participants...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <ParticipantList
          participants={participants}
          viewMode={viewMode}
          selectedParticipant={selectedParticipant}
          setShowViewModal={setShowViewModal}
          setSelectedParticipant={setSelectedParticipant}
          setShowUpdateModal={setShowUpdateModal}
          setUpdateFormData={setUpdateFormData}
        />
      )}

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
      />
    </div>
  );
};

export default EnrolledParticipants;
