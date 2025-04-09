// import React, { useState, useEffect } from "react";
// import Header from "./Components/Header";
// import SearchFilter from "./Components/SearchFilter";
// import NotificationPanel from "./Components/NotificationPanel";
// import ViewParticipantModal from "./Components/ViewParticipantModal";
// import UpdateProofStatusModal from "./Components/UpdateProofStatusModal";
// import ParticipantList from "./Components/ParticipantList";
// // import PendingEnrollments from "./Components/PendingEnrollments";
// import axios from "axios";
// import { useParams } from "react-router-dom";

// //Participant Type
// interface Participant {
//   id: string; // exist
//   name: string; //exist
//   avatar: string;
//   status: "Approved" | "Pending" | "Completed" | "Proof Submitted"; //exist
//   serviceType: string;
//   enrollmentDate: string; // exist as created_at
//   location: string;
//   creditsEarned?: number;
//   creditsAllocated?: number;
//   email?: string;
//   proofImage?: string;
//   proofVideo?: string;
//   area?: string;
//   // last_name exist in backend but not in frontend
//   // location (backend there , but not in fronetned )
// }

// //Notification Type
// interface Notification {
//   id: string;
//   type: "enrollment" | "update" | "alert";
//   message: string;
//   timestamp: string;
//   isRead: boolean;
// }

// const EnrolledParticipants: React.FC = () => {
//   const [participants, setParticipants] = useState<Participant[]>([]);
//   const { project_id } = useParams(); 
  

//   const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const [showNotifications, setShowNotifications] = useState(false);

//   const [showViewModal, setShowViewModal] = useState(false);
//   const [showUpdateModal, setShowUpdateModal] = useState(false);
//   const [selectedParticipant, setSelectedParticipant] =
//     useState<Participant | null>(null);
//   const [updateFormData, setUpdateFormData] = useState<{
//     credits?: string;
//     remarks: string;
//   }>({
//     credits: "",
//     remarks: "",
//   });
//   const [searchTerm, setSearchTerm] = useState("");
//   const [showFilterPanel, setShowFilterPanel] = useState(false);

//   // Sample Notifications Data
//   const notifications: Notification[] = [
//     {
//       id: "N1001",
//       type: "enrollment",
//       message: "New enrollment request from Emily Richardson",
//       timestamp: "2 hours ago",
//       isRead: false,
//     },
//     {
//       id: "N1002",
//       type: "update",
//       message: "Michael Anderson updated their profile information",
//       timestamp: "4 hours ago",
//       isRead: false,
//     },
//   ];
 
//     // Fetch Participants Based on Project ID
//     useEffect(() => {
//       const fetchParticipants = async () => {
//         if (!project_id) {
//           setError("Project ID is missing!");
//           setLoading(false);
//           return;
//         }
  
//         setLoading(true);
//         setError(null);
  
//         try {
//           const response = await axios.get(
//             `http://localhost:5000/project/${project_id}/participants`,
//             {
//               headers: {
//                 Authorization: `Bearer ${localStorage.getItem("token")}`,
//                 "Content-Type": "application/json",
//               },
//             }
//           );
  
//           // Map response data to match Participant structure
//           const formattedParticipants: Participant[] = response.data.map(
//             (participant: any) => ({
//               id: participant.id,
//               name: `${participant.first_name} ${participant.last_name}`,
//               avatar: "https://randomuser.me/api/portraits/men/45.jpg", // Placeholder
//               status: participant.status,
//               serviceType: participant.service_type || "N/A",
//               enrollmentDate: participant.created_at,
//               location: participant.location || "NA",
//               creditsEarned: participant.creditsEarned || undefined,
//               creditsAllocated: participant.creditsAllocated || undefined,
//               email: participant.email || undefined,
//               proofImage: participant.proofImage || undefined,
//               proofVideo: participant.proofVideo || undefined,
//               area: participant.area || undefined,
//             })
//           );
  
//           setParticipants(formattedParticipants);
//         } catch (error) {
//           console.error("Error fetching participants:", error);
//           setError("Failed to load participants.");
//         } finally {
//           setLoading(false);
//         }
//       };
  
//       fetchParticipants();
//     }, [project_id]); 


//   //Functions for Notifications
//   const toggleNotifications = () => setShowNotifications(!showNotifications);
//   const markAllAsRead = () => {
//     console.log("Marked all as read");
//   };
//   const clearAllNotifications = () => {
//     console.log("Cleared all notifications");
//   };

//   return (
//     <div className="min-h-screen bg-[#F5F5F5] pt-20">
//       {/*Header Component */}
//       <Header
//         toggleNotifications={toggleNotifications}
//         notifications={notifications}
//       />

//       {/*Search & Filter Component */}
//       <SearchFilter
//         searchTerm={searchTerm}
//         setSearchTerm={setSearchTerm}
//         showFilterPanel={showFilterPanel}
//         setShowFilterPanel={setShowFilterPanel}
//         viewMode={viewMode}
//         setViewMode={setViewMode}
//       />

//       {/* Pending Enrollment  */}
//       {/* <PendingEnrollments/> */}

//       {/*Participant List */}
//       {loading ? (
//         <p className="text-center">Loading participants...</p>
//       ) : error ? (
//         <p className="text-center text-red-500">{error}</p>
//       ) : (
//         <ParticipantList
//           participants={participants}
//           viewMode={viewMode}
//           selectedParticipant={selectedParticipant}
//           setShowViewModal={setShowViewModal}
//           setSelectedParticipant={setSelectedParticipant}
//           setShowUpdateModal={setShowUpdateModal}
//           setUpdateFormData={setUpdateFormData}
//         />
//       )}

//       {/*Notification Panel */}
//       <NotificationPanel
//         notifications={notifications}
//         showNotifications={showNotifications}
//         toggleNotifications={toggleNotifications}
//         markAllAsRead={markAllAsRead}
//         clearAllNotifications={clearAllNotifications}
//       />

//       {/*View Participant Modal */}
//       <ViewParticipantModal
//         selectedParticipant={selectedParticipant}
//         showViewModal={showViewModal}
//         setShowViewModal={setShowViewModal}
//         setShowUpdateModal={setShowUpdateModal}
//         setUpdateFormData={setUpdateFormData}
//       />

//       {/*Update Proof Status Modal */}
//       <UpdateProofStatusModal
//         showUpdateModal={showUpdateModal}
//         setShowUpdateModal={setShowUpdateModal}
//         updateFormData={updateFormData}
//         setUpdateFormData={setUpdateFormData}
//       />
//     </div>
//   );
// };

// export default EnrolledParticipants;


import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "./Components/Header";
import SearchFilter from "./Components/SearchFilter";
import NotificationPanel from "./Components/NotificationPanel";
import ViewParticipantModal from "./Components/ViewParticipantModal";
import UpdateProofStatusModal from "./Components/UpdateProofStatusModal";
import ParticipantList from "./Components/ParticipantList";

// Participant Type
interface Participant {
  id: string;
  name: string;
  avatar: string;
  project_enroll_status: "approved" | "rejected" | "Completed" | "Proof Submitted";
  serviceType: string;
  enrollmentDate: string;
  location: string;
  creditsEarned?: number;
  creditsAllocated?: number;
  email?: string;
  proofImage?: string;
  proofVideo?: string;
  area?: string;
  project_id?: string;
  service_provider_id?: string;
  participant_id:string
}

const EnrolledParticipants: React.FC = () => {
  const { projectId } = useParams();
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedParticipant, setSelectedParticipant] = useState<Participant | null>(null);
  const [updateFormData, setUpdateFormData] = useState<{ credits?: string; remarks: string }>({
    credits: "",
    remarks: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilterPanel, setShowFilterPanel] = useState(false);

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

  useEffect(() => {
    const fetchParticipants = async () => {
      if (!projectId) {
        setError("Project ID is missing");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          `https://carbonfix-backend-5y3e.onrender.com/serviceProviders/participants/${projectId}`,
          {
            headers: {
              Authorization: `Bearer ${getWithExpirationCheck("token")}`,
              "Content-Type": "application/json",
            },
          }
        );

        const formattedParticipants: Participant[] = response.data.map((participant: any) => ({
          id: participant.id,
          name: `${participant.first_name} ${participant.last_name}`,
          avatar: "https://randomuser.me/api/portraits/men/45.jpg", // Placeholder avatar
          project_enroll_status: participant.project_enroll_status,
          serviceType: participant.project_name || "N/A",
          enrollmentDate: participant.created_at,
          location: participant.location || "NA",
          creditsEarned: participant.creditsEarned || undefined,
          creditsAllocated: participant.carbon_credits || undefined,
          email: participant.email || undefined,
          proofImage: participant.proofImage || undefined,
          proofVideo: participant.proofVideo || undefined,
          area: participant.area || undefined,
          project_id:participant.project_id,
          participant_id:participant.participant_id,
          service_provider_id : participant.service_provider_id
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
  }, [projectId]);

  return (
    <div className="min-h-screen bg-[#F5F5F5] pt-20">
      <Header toggleNotifications={() => setShowNotifications(!showNotifications)} notifications={[]} />
      <SearchFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        showFilterPanel={showFilterPanel}
        setShowFilterPanel={setShowFilterPanel}
        viewMode={viewMode}
        setViewMode={setViewMode}
      />
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
      <NotificationPanel
        notifications={[]}
        showNotifications={showNotifications}
        toggleNotifications={() => setShowNotifications(!showNotifications)}
        markAllAsRead={() => console.log("Marked all as read")}
        clearAllNotifications={() => console.log("Cleared all notifications")}
      />
      <ViewParticipantModal
        selectedParticipant={selectedParticipant}
        showViewModal={showViewModal}
        setShowViewModal={setShowViewModal}
        setShowUpdateModal={setShowUpdateModal}
        projectId={selectedParticipant?.project_id || ""}
        setUpdateFormData={setUpdateFormData}
      />
      <UpdateProofStatusModal
  showUpdateModal={showUpdateModal}
  setShowUpdateModal={setShowUpdateModal}
  updateFormData={updateFormData}
  setUpdateFormData={setUpdateFormData}
  participantId={selectedParticipant?.participant_id || ""}
  projectId={selectedParticipant?.project_id || ""}
  serviceProviderId={selectedParticipant?.service_provider_id || ""}
/>

    </div>
  );
};

export default EnrolledParticipants;
