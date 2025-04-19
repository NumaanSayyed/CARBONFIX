import React, { useState, useEffect } from "react";
import axios from "axios";
import EditModal from "./EditModal";
import { useNavigate } from "react-router-dom";
import { backend_url } from "../../backend_route";

interface Program {
  id: number;
  name: string;
  category: string;
  credits: number;
  project_status: string;
  start_date: string;
  end_date: string;
  remark: string;
  final_status: string;
}

interface DetailModalProps {
  isOpen: boolean;
  program: Program | null;
  onClose: () => void;
  onUpdate: (updatedProgram: Program) => void;
  fetchProjects: () => void;
}

const DetailModal: React.FC<DetailModalProps> = ({
  isOpen,
  program,
  onClose,
  // @ts-ignore
  onUpdate,
  fetchProjects,
}) => {
  if (!isOpen || !program) return null;
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [updatedProgram, setUpdatedProgram] = useState(program);
  // @ts-ignore
  const [isModalOpen, setIsModalOpen] = useState(false);
  // @ts-ignore
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    setUpdatedProgram(program);
    console.log("program", program);
  }, [program]);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Forestation":
        return "fa-tree";
      case "Water":
        return "fa-water";
      case "Soil":
        return "fa-seedling";
      case "re-cycle":
        return "fa-recycle";
      case "Animal":
        return "fa-paw";
      default:
        return "fa-leaf";
    }
  };
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

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`${backend_url}/serviceProviders/projects/${id}`, {
        headers: {
          Authorization: `Bearer ${getWithExpirationCheck("token")}`,
        },
      });
      const successDiv = document.createElement("div");
      successDiv.className =
        "fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in-up";
      successDiv.textContent = "Project Deleted successfully!";
      document.body.appendChild(successDiv);
      setTimeout(() => successDiv.remove(), 3000);

      setModalMessage("Project deleted successfully!");
      setIsModalOpen(true);
      fetchProjects();
      onClose(); // Close modal after deletion
    } catch (error) {
      console.error("Error deleting project:", error);
      setModalMessage("Failed to delete project.");
      setIsModalOpen(true);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };

  const handleUpdate = (newData: any) => {
    console.log("Raw newData:", newData);

    const updated =
      Array.isArray(newData) && newData.length > 0 ? newData[0] : newData;

    const mappedProgram: Program = {
      id: updated.id,
      name: updated.project_name || "", // <- mapping from backend
      category: updated.project_category || "",
      credits: updated.carbon_credits || 0,
      project_status: updated.project_enroll_status || "Active",
      start_date: updated.start_date || "",
      end_date: updated.end_date || "",
      remark: updated.remark || "",
      final_status: updated.final_status,
    };

    console.log("Mapped Program object:", mappedProgram);

    onUpdate(mappedProgram);
    setUpdatedProgram(mappedProgram);
    fetchProjects();
  };

  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
      <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6 sm:p-8 w-full max-w-2xl mx-4 animate-scaleIn shadow-2xl border border-white/50">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Project Details</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors duration-300"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>

        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center shadow-lg">
              <i
                className={`fas ${getCategoryIcon(
                  updatedProgram.category
                )} text-3xl text-green-600`}
              ></i>
            </div>
            <div>
              <h3 className="text-2xl [@media(max-width:770px)]:text-1xl font-bold text-gray-800">
                {updatedProgram.name}
              </h3>
              <p className="text-gray-600">{updatedProgram.category}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">Status</p>
              <p className="text-lg font-semibold text-gray-800">
                {updatedProgram.project_status}
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">Carbon Credits</p>
              <p className="text-lg font-semibold text-gray-800">
                {updatedProgram.credits}
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-semibold text-gray-800">Project Timeline</h4>
            <div className="relative pl-8 pb-8 border-l-2 border-green-200">
              <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-green-500"></div>
              <p className="text-sm text-gray-600">Project Started</p>
              <p className="text-gray-800">
                {formatDate(updatedProgram.start_date.toLocaleString())}
              </p>
            </div>

            <div className="relative pl-8">
              <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-green-500"></div>
              <p className="text-sm text-gray-600">Estimated Completion</p>
              <p className="text-gray-800">
                {formatDate(updatedProgram.end_date.toLocaleString())}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              setTimeout(() => setIsEditOpen(true), 0);
            }}
            className="w-full bg-green-700 text-white py-3 rounded-xl hover:bg-green-600 transition-all duration-300 [@media(max-width:770px)]:hidden"
          >
            Edit
          </button>

          {/* See particvipants */}
          <button
            onClick={() =>
              navigate(`/dashboard/participant_manage/${updatedProgram.id}`)
            }
            // onClick={() => console.log()}
            className="w-full bg-blue-700 text-white py-3 rounded-xl hover:bg-blue-600 transition-all duration-300 [@media(max-width:770px)]:hidden"
          >
            View Participants
          </button>

          <div className="[@media(min-width:770px)]:hidden flex justify-between">
            <button
              onClick={() => {
                setTimeout(() => setIsEditOpen(true), 0);
              }}
              className="p-4 bg-green-700 text-white py-3 rounded-xl hover:bg-green-600 transition-all duration-300 "
            >
              Edit
            </button>

            <button
              onClick={() =>
                navigate(`/dashboard/participant_manage/${updatedProgram.id}`)
              }
              // onClick={() => console.log()}
              className=" p-2 bg-blue-700 text-white py-3 rounded-xl hover:bg-blue-600 transition-all duration-300 "
            >
              View Participants
            </button>
            <button
              onClick={() => program && handleDelete(updatedProgram.id)}
              className="p-2 bg-red-700 text-white py-3 rounded-xl hover:bg-red-600 transition-all duration-300 "
            >
              {/* <i className="fas fa-trash-alt mr-2"></i>  */}
              Delete
            </button>
          </div>

          {/* Delete Button */}
          <button
            onClick={() => program && handleDelete(program.id)}
            className="w-full bg-red-700 text-white py-3 rounded-xl hover:bg-red-600 transition-all duration-300 [@media(max-width:770px)]:hidden"
          >
            {/* <i className="fas fa-trash-alt mr-2"></i>  */}
            Delete
          </button>

          {/* Edit Modal */}
          {isEditOpen && (
            <EditModal
              isOpen={isEditOpen}
              program={updatedProgram} // Ensure it uses updated state
              onClose={() => setIsEditOpen(false)}
              onUpdate={handleUpdate}
              fetchProjects={fetchProjects}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailModal;
