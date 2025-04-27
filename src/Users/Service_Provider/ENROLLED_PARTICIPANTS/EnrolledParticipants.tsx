import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "./Components/Header";
import SearchFilter from "./Components/SearchFilter";
import NotificationPanel from "./Components/NotificationPanel";
import ViewParticipantModal from "./Components/ViewParticipantModal";
import UpdateProofStatusModal from "./Components/UpdateProofStatusModal";
import ParticipantList from "./Components/ParticipantList";
import { backend_url } from "../../../backend_route";

// Participant Type
interface Participant {
  id: string;
  name: string;
  avatar: string;
  project_enroll_status:
    | "approved"
    | "rejected"
    | "completed"
    | "proof-submitted"
    |"rejected_by_admin";
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
  participant_id: string;
}

// Notification Type
interface Notification {
  id: string;
  type: "enrollment" | "update" | "alert";
  message: string;
  timestamp: string;
  isRead: boolean;
}

const EnrolledParticipants: React.FC = () => {
  const { projectId } = useParams();
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [filteredParticipants, setFilteredParticipants] = useState<
    Participant[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
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
  const [selectedFilters, setSelectedFilters] = useState({
    status: "All",
    serviceType: "All",
    location: "All",
    dateRange: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilterPanel, setShowFilterPanel] = useState(false);

  const notifications: Notification[] = [
    {
      id: "1",
      type: "enrollment",
      message: "New enrollment request from Emily Richardson",
      timestamp: "2 hours ago",
      isRead: false,
    },
    {
      id: "2",
      type: "update",
      message: "Michael Anderson updated their profile information",
      timestamp: "4 hours ago",
      isRead: false,
    },
  ];

  // Function to filter participants
  const filterParticipants = (participants: Participant[]) => {
    return participants.filter((participant) => {
      const matchesSearchTerm = searchTerm
        ? participant.name.toLowerCase().includes(searchTerm.toLowerCase().trim()) ||
          participant.serviceType
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          participant.location.toLowerCase().includes(searchTerm.toLowerCase().trim())
        : true;

      const matchesStatus =
        selectedFilters.status === "All" ||
        participant.project_enroll_status === selectedFilters.status;


      console.log(participant.project_enroll_status);
      console.log(selectedFilters.status);

      const matchesServiceType =
        selectedFilters.serviceType === "All" ||
        participant.serviceType === selectedFilters.serviceType;

      const matchesLocation =
        selectedFilters.location === "All" ||
        participant.location === selectedFilters.location;

      const matchesDateRange = selectedFilters.dateRange
        ? participant.enrollmentDate.slice(0, 10) === selectedFilters.dateRange
        : true;

      return (
        matchesSearchTerm &&
        matchesStatus &&
        matchesServiceType &&
        matchesLocation &&
        matchesDateRange
      );
    });
  };

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
        `${backend_url}/serviceProviders/participants/${projectId}`,
        {
          headers: {
            Authorization: `Bearer ${getWithExpirationCheck("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response.data.participants);
      const formattedParticipants: Participant[] =
        response.data.participants.map((participant: any) => ({
          id: participant.id,
          name: `${participant.first_name} ${participant.last_name}`,
          avatar:
            "https://tse4.mm.bing.net/th?id=OIP.9BVL-wy_acR02ymiRXskpQHaHa&pid=Api&P=0&h=180",
          project_enroll_status: participant.project_enroll_status,
          serviceType: participant.project_name, // Hardcoded for now since it's not in participant object
          enrollmentDate: participant.created_at,
          location: participant.category, // Could be derived elsewhere if needed
          creditsEarned: participant.credit_earned || 0,
          creditsAllocated: participant.credit_allocated || 0,
          email: participant.email || "",
          proofImage: participant.proofImage || undefined,
          proofVideo: participant.proofVideo || undefined,
          area: participant.area || undefined,
          project_id: participant.project_id,
          participant_id: participant.participant_id,
          service_provider_id: participant.service_provider_id,
        }));

      setParticipants(formattedParticipants);
      setFilteredParticipants(formattedParticipants); // Initialize the filtered list
    } catch (error) {
      console.error("Error fetching participants:", error);
      setError("Failed to load participants.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchParticipants();
  }, [projectId]);

  useEffect(() => {
    // Reapply filters whenever searchTerm or selectedFilters change
    const filtered = filterParticipants(participants);
    setFilteredParticipants(filtered);
  }, [searchTerm, selectedFilters, participants]);

  return (
    <div className="min-h-screen bg-[#F5F5F5] pt-20">
      <Header
        toggleNotifications={() => setShowNotifications(!showNotifications)}
        notifications={notifications}
      />
      <SearchFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        showFilterPanel={showFilterPanel}
        setShowFilterPanel={setShowFilterPanel}
        viewMode={viewMode}
        setViewMode={setViewMode}
        selectedFilters={selectedFilters}
        setSelectedFilters={setSelectedFilters}
      />
      {loading ? (
        <p className="text-center">Loading participants...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <ParticipantList
          participants={filteredParticipants}
          viewMode={viewMode}
          selectedParticipant={selectedParticipant}
          setShowViewModal={setShowViewModal}
          setSelectedParticipant={setSelectedParticipant}
          setShowUpdateModal={setShowUpdateModal}
          fetchParticipant={fetchParticipants}
          setUpdateFormData={setUpdateFormData}
        />
      )}

      <NotificationPanel
        notifications={notifications}
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
        fetchParticipant={fetchParticipants}
      />
    </div>
  );
};

export default EnrolledParticipants;
