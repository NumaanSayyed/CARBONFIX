import React, { useState, useEffect } from "react";
import axios from "axios";
import { backend_url } from "../../backend_route";
import Header from "./Header";
import ActionButton from "./ActionButton";
import NavigationButton from "./NavigationButton";
import ProgramsGrid from "./Program";
import DetailModal from "./DetailModal";
import Modal from "./Modal";

const Dashboard: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<any>(null);
  const [programs, setPrograms] = useState<
    {
      id: number;
      name: string;
      category: string;
      credits: number;
      project_status: string;
      start_date: string;
      end_date: string;
      remark: string;
      location: string;
    }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [modalMessage, setModalMessage] = useState("");

  const fetchProjects = async () => {
    try {
      const token = getWithExpirationCheck("token");
      if (!token) {
        console.error("Unauthorized! No token found.");
        return;
      }
      const response = await axios.get(
        `${backend_url}/serviceProviders/projects`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const fetchedProjects = response.data.map((project: any) => ({
        name: project.project_name,
        category: project.project_category,
        credits: project.carbon_credits,
        project_status: "Active",
        id: project.id,
        start_date: project.start_date,
        end_date: project.end_date,
        remark: project.remark,
        location: project.location,
      }));
      console.log("Fetched Projects:", fetchedProjects);
      setPrograms(fetchedProjects);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // Form States
  const [selectedCategory, setSelectedCategory] = useState("");
  const [programName, setProgramName] = useState("");
  const [carbonCredits, setCarbonCredits] = useState("");
  const [remarks, setRemarks] = useState("");
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [completionDate, setCompletionDate] = useState("");

  // Remark Validation State
  const [isRemarkValid, setIsRemarkValid] = useState(true); // Track validity of the remark

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Remarks validation (20 to 250 characters)
    if (remarks.length < 20 || remarks.length > 250) {
      setIsRemarkValid(false);
      setModalMessage("Remarks must be between 20 and 250 characters.");
      setIsModalOpen(true);
      return;
    } else {
      setIsRemarkValid(true);
    }

    const token = getWithExpirationCheck("token");
    if (!token) {
      setModalMessage("Unauthorized! Please log in again.");
      setIsModalOpen(true);
      return;
    }

    const requestData = {
      project_category: selectedCategory,
      project_name: programName,
      carbon_credits: carbonCredits,
      start_date: startDate,
      end_date: completionDate,
      remark: remarks,
      location: location,
    };

    try {
      const response = await axios.post(
        `${backend_url}/serviceProviders/addProject`,
        requestData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const successDiv = document.createElement("div");
      successDiv.className =
        "fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in-up";
      successDiv.textContent = "Project Added successfully!";
      document.body.appendChild(successDiv);
      setTimeout(() => successDiv.remove(), 3000);

      // Clear form fields
      setSelectedCategory("");
      setProgramName("");
      setCarbonCredits("");
      setStartDate("");
      setCompletionDate("");
      setRemarks("");
      setLocation("");
      setIsModalOpen(false);
      fetchProjects();
    } catch (error: any) {
      console.error("Error adding project:", error);
      setModalMessage(error.response?.data?.error || "Failed to add project");
      setIsModalOpen(true);
    }
  };

  const getMinCompletionDate = () => {
    if (!startDate) return "";
    const date = new Date(startDate);
    date.setDate(date.getDate() + 1);
    return date.toISOString().split("T")[0];
  };

  const handleUpdate = async (updatedProgram: any) => {
    try {
      const token = getWithExpirationCheck("token");
      if (!token) {
        console.error("Unauthorized! No token found.");
        return;
      }

      const response = await axios.get(
        `${backend_url}/serviceProviders/projects`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const fetchedProjects = response.data.map((project: any) => ({
        name: project.project_name,
        category: project.project_category,
        credits: project.carbon_credits,
        project_status: "Active",
        id: project.id,
        start_date: project.start_date,
        end_date: project.end_date,
        remark: project.remark,
        location: project.location,
      }));
      setPrograms(fetchedProjects);
    } catch (error) {
      console.error("Error fetching updated projects:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(
        `${backend_url}/serviceProviders/projects/${id}`,
        {
          headers: { Authorization: `Bearer ${getWithExpirationCheck("token")}` },
        }
      );
      setModalMessage("Project deleted successfully!");
      setIsModalOpen(true);
      fetchProjects();
    } catch (error) {
      console.error("Error deleting project:", error);
      setModalMessage("Failed to delete project.");
      setIsModalOpen(true);
    }
  };

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-br from-green-50 to-blue-50 font-['SF Pro Text']">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 transition-all duration-300">
        {/* Header Section */}
        <Header />

        {/* Action Buttons */}
        <ActionButton setIsModalOpen={setIsModalOpen} />

        {loading ? (
          <div className="flex justify-center">
            <i className="fas fa-circle-notch fa-spin"></i>
          </div>
        ) : programs.length > 0 ? (
          <ProgramsGrid
            programs={programs.map((proj) => ({
              ...proj,
              key: proj.id || proj.name,
            }))}
            setSelectedProgram={setSelectedProgram}
            setIsDetailModalOpen={setIsDetailModalOpen}
          />
        ) : (
          <p className="text-center text-gray-500">No projects available.</p>
        )}

        {isDetailModalOpen && selectedProgram && (
          <DetailModal
            isOpen={isDetailModalOpen}
            program={selectedProgram}
            onClose={() => setIsDetailModalOpen(false)}
            onUpdate={handleUpdate}
            fetchProjects={fetchProjects}
            // onDelete={handleDelete}
          />
        )}

        {/* General Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
              <p className="text-center text-gray-800 mb-4">{modalMessage}</p>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Add New Project Modal */}
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Category */}
            <div>
              <label className="block text-gray-700 mb-2 font-medium">
                Service Type
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
                required
              >
                <option value="">Select Type</option>
                <option value="Forestation">Forestation</option>
                <option value="Water">Water</option>
                <option value="Soil">Soil</option>
                <option value="re-cycle">Re-Cycle</option>
                <option value="Animal">Animal</option>
              </select>
            </div>

            {/* Project Name */}
            <div>
              <label className="block text-gray-700 mb-2 font-medium">
                Project Name
              </label>
              <input
                type="text"
                value={programName}
                onChange={(e) => setProgramName(e.target.value)}
                className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
                required
              />
            </div>

            {/* Carbon Credits */}
            <div>
              <label className="block text-gray-700 mb-2 font-medium">
                Carbon Credits
              </label>
              <input
                type="number"
                value={carbonCredits}
                onChange={(e) => setCarbonCredits(e.target.value)}
                className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
                required
              />
            </div>

            {/* Start Date */}
            <div>
              <label className="block text-gray-700 mb-2 font-medium">
                Project Start Date
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
                required
              />
            </div>

            {/* Completion Date */}
            <div>
              <label className="block text-gray-700 mb-2 font-medium">
                Estimated Completion Date
              </label>
              <input
                type="date"
                value={completionDate}
                min={getMinCompletionDate()}
                onChange={(e) => setCompletionDate(e.target.value)}
                className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
                required
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-gray-700 mb-2 font-medium">
                Project Location
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
                required
              />
            </div>

            {/* Remarks */}
            <div>
              <label className="block text-gray-700 mb-2 font-medium">
                Remarks
              </label>
              <textarea
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                className={`w-full bg-gray-50 border-2 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-200 resize-none ${
                  isRemarkValid ? "border-gray-200" : "border-red-500"
                }`}
                required
              />
              <span className="text-xs text-gray-500">
                Remarks must be between 20 and 250 characters
              </span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 transition-all duration-300"
            >
              Add Service
            </button>
          </form>
        </Modal>
      </div>
    </div>
  );
};

export default Dashboard;
