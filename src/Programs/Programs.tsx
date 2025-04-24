import React, { useState, useEffect } from "react";
import axios from "axios";
import { backend_url } from "../backend_route";
import { useAuth } from "../Helpers/authContext";
//@ts-ignore
import { apiResponse, getWithExpirationCheck } from "../Helpers/Helpers";
import { useNavigate } from "react-router-dom";

const Project: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedProject, setSelectedProject] = useState<any>(null);
  // @ts-ignore
  const [isJoining, setIsJoining] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);
  const [projects, setProjects] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // @ts-ignore
  const { user, userType } = useAuth();

  const categories = [
    { name: "Forestation", icon: "fa-tree" },
    { name: "Water", icon: "fa-tint" },
    { name: "Soil", icon: "fa-leaf" },
    { name: "Re-Cycle", icon: "fa-recycle" },
    { name: "Animal", icon: "fa-paw" },
  ];

  const navigate = useNavigate();

  useEffect(() => {
    console.log("User data in another page:", user); // Debug
  }, [user]);

  const fetchProjects = async () => {
    try {
      const response = await axios.get(
        `${backend_url}/serviceProviders/allProjects`
      );
      setProjects(response.data.projects);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleJoinProject = async () => {
    try {
      const storedUser = getWithExpirationCheck("user");
      if (!storedUser && !user) {
        setMessage("User not logged in.");
        setIsModalOpen(true);
        return;
      }

      const participantId =
        user?.participant?.id || storedUser?.participant?.id;

      if (!participantId || !selectedProject?.id) {
        setMessage("Missing participant or project details.");
        setIsModalOpen(true);
        return;
      }

      setIsJoining(true);

      const response = await axios.post(`${backend_url}/enroll/request`, {
        participant_id: participantId,
        project_id: selectedProject.id,
      });

      if (
        response.data.message === "Enrollment request submitted successfully"
      ) {
        setMessage(
          "Woohoo! Your request to join this project is in the works. We'll let you know soon!"
        );
        setIsModalOpen(true);
      } else if (
        response.data.message === "Enrollment request already exists"
      ) {
        setMessage(
          "Looks like you're already on the list! Hang tight, you're almost there!"
        );
        setIsModalOpen(true);
      }

      fetchProjects();
      setSelectedProject(null);
    } catch (error: any) {
      if (error.response?.data?.error === "Enrollment request already exists") {
        setMessage(
          "Looks like you're already on the list! Hang tight, you're almost there!"
        );
        setIsModalOpen(true);
      }
    } finally {
      setIsJoining(false);
    }
  };

  const closeModals = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const formatStandardDate = (dateString: string) => {
    return new Date(dateString).toISOString().split("T")[0];
  };

  const filteredProjects = projects.filter((project) => {
    const matchCategory =
      selectedCategory === "All" ||
      project.project_category?.toLowerCase() ===
        selectedCategory.toLowerCase();

    const matchSearch =
      searchQuery.trim() === "" ||
      project.project_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.project_category
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase());

    return matchCategory && matchSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="relative mb-6">
            <input
              type="text"
              className="w-full pl-10 pr-4 py-3 border-none bg-white rounded-lg shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => setSelectedCategory(category.name)}
                className={`!rounded-button whitespace-nowrap px-4 py-2 rounded-full flex items-center space-x-2 transition-all duration-200 ${
                  selectedCategory === category.name
                    ? "bg-green-600 text-white"
                    : "bg-white text-gray-600 hover:bg-gray-100"
                }`}
              >
                <i className={`fas ${category.icon}`}></i>
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => {
            const participants = project.total_participants || 0;
            let progress = 0;
            if (participants > 75) progress = 100;
            else if (participants > 50) progress = 80;
            else if (participants > 25) progress = 60;
            else if (participants > 10) progress = 40;
            else if (participants > 0) progress = 20;

            return (
              <div
                key={project.id}
                className="bg-white rounded-xl shadow-sm overflow-hidden transform transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={
                      project.imageUrl ||
                      (project.project_category?.toLowerCase() === "forestation"
                        ? "https://public.readdy.ai/ai/img_res/67843d2d14547996180132db1e768704.jpg"
                        : project.project_category?.toLowerCase() === "water"
                        ? "https://public.readdy.ai/ai/img_res/360162775bfd838963f21d4d213dbef1.jpg"
                        : project.project_category?.toLowerCase() === "soil"
                        ? "https://public.readdy.ai/ai/img_res/6abf801a75ad5fee23a95ca764a4cf34.jpg"
                        : project.project_category?.toLowerCase() ===
                            "re-cycle" ||
                          project.project_category?.toLowerCase() === "recycle"
                        ? "https://images.unsplash.com/photo-1612311533219-3687fcf1ee78?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGUlMjB3YXN0ZSUyMGltYWdlfGVufDB8fDB8fHww"
                        : project.project_category?.toLowerCase() === "animal"
                        ? "https://public.readdy.ai/ai/img_res/b211efe60d5975f7c0687abc3889202c.jpg"
                        : "https://public.readdy.ai/ai/img_res/a86a5d9bd78a933da2be1d249b523709.jpg")
                    }
                    alt={project.project_category}
                    className="w-full h-full object-cover object-center transform transition-transform duration-300 hover:scale-105"
                  />

                  <div className="absolute top-4 left-4 space-y-1">
                    <span className="bg-white/90 px-3 py-1 rounded-full text-sm font-medium text-gray-700">
                      {project.project_category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xl font-semibold text-gray-800">
                      {project.project_name}
                    </span>
                    <span className="flex items-center text-green-600 font-semibold bg-green-100 px-2 py-1 rounded-lg">
                      {project.carbon_credits}
                      <span className="ml-1 text-sm text-gray-600">CC</span>
                    </span>
                  </div>

                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {project.remark}
                  </p>
                  <p className="mb-2">
                    {project.location && (
                      <span className=" bg-white/90 py-1 rounded-full text-sm font-medium text-gray-700">
                        📍 {project.location}
                      </span>
                    )}
                  </p>
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-500 mb-1">
                      <span>Progress</span>
                      <span>{progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`rounded-full h-2 transition-all duration-300 ${
                          progress === 100 ? "bg-emerald-500" : "bg-green-600"
                        }`}
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>

                    {/* 👇 Date Section - Added */}
                    <div className="flex mt-3 justify-between items-center text-sm text-gray-600 mb-4">
                      <div className="flex items-center space-x-1">
                        <i className="fas fa-calendar-alt text-green-500"></i>
                        <span>
                          <strong></strong>{" "}
                          {formatStandardDate(project.start_date)}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <i className="fas fa-calendar-check text-blue-500"></i>
                        <span>
                          <strong></strong>{" "}
                          {formatStandardDate(project.end_date)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      <i className="fas fa-users mr-2"></i>
                      {project.total_participants} participants
                    </span>
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200"
                    >
                      Join Project
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {isScrolled && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="!rounded-button fixed bottom-6 left-6 bg-white text-gray-600 p-3 rounded-full shadow-lg hover:bg-gray-50 transition-all duration-200"
        >
          <i className="fas fa-arrow-up"></i>
        </button>
      )}

      {selectedProject && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full relative">
            <h2 className="text-2xl font-bold mb-4 text-green-700">
              {selectedProject.project_name}
            </h2>
            <img
              src={
                selectedProject.imageUrl ||
                (selectedProject.project_category?.toLowerCase() ===
                "forestation"
                  ? "https://public.readdy.ai/ai/img_res/67843d2d14547996180132db1e768704.jpg"
                  : selectedProject.project_category?.toLowerCase() === "water"
                  ? "https://public.readdy.ai/ai/img_res/360162775bfd838963f21d4d213dbef1.jpg"
                  : selectedProject.project_category?.toLowerCase() === "soil"
                  ? "https://public.readdy.ai/ai/img_res/6abf801a75ad5fee23a95ca764a4cf34.jpg"
                  : selectedProject.project_category?.toLowerCase() ===
                      "re-cycle" ||
                    selectedProject.project_category?.toLowerCase() ===
                      "recycle"
                  ? "https://images.unsplash.com/photo-1612311533219-3687fcf1ee78?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGUlMjB3YXN0ZSUyMGltYWdlfGVufDB8fDB8fHww"
                  : selectedProject.project_category?.toLowerCase() === "animal"
                  ? "https://public.readdy.ai/ai/img_res/b211efe60d5975f7c0687abc3889202c.jpg"
                  : "https://public.readdy.ai/ai/img_res/a86a5d9bd78a933da2be1d249b523709.jpg") // default fallback
              }
              alt={selectedProject.project_name}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <p className="text-gray-600 mb-2">
              <strong>Service Provider:</strong>{" "}
              {selectedProject.service_provider}
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Carbon Credits:</strong> {selectedProject.carbon_credits}
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Start Date:</strong>{" "}
              {formatStandardDate(selectedProject.start_date)}
            </p>
            <p className="text-gray-600 mb-4">
              <strong>Completion Date:</strong>{" "}
              {formatStandardDate(selectedProject.end_date)}
            </p>
            <button
              onClick={() => handleJoinProject()}
              className="bg-green-600 text-white mb-3 px-4 py-2 rounded-lg w-full hover:bg-green-700"
            >
              Join Project
            </button>
            <button
              onClick={() => setSelectedProject(null)}
              className="bg-red-600 text-white px-4 py-2 rounded-lg w-full hover:bg-red-700"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
            <p className="text-center text-gray-800 mb-4">{message}</p>

            <div className="flex space-x-4">
              <button
                onClick={() => {
                  closeModals();
                }}
                className="flex-1 bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-300"
              >
                Join Other Project
              </button>

              <button
                onClick={() => {
                  closeModals();
                  user ? navigate("/profile") : navigate("/login");
                }}
                className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300"
              >
                Go to Dashboard
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Project;
