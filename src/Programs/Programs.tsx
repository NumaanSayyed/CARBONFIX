import React, { useState, useEffect } from "react";
// import * as echarts from 'echarts';
import axios from "axios";

const App: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isJoining, setIsJoining] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);
  const [projects, setProjects] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Declare categories BEFORE using it
  const categories = [
    { name: "Forestation", icon: "fa-tree" },
    { name: "Water", icon: "fa-tint" },
    { name: "Soil", icon: "fa-leaf" },
    { name: "Re-Cycle", icon: "fa-recycle" },
    { name: "Animal", icon: "fa-paw" },
  ];

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get("http://localhost:5000/serviceProviders/allProjects");
        setProjects(response.data.projects);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    fetchProjects();
  }, []);

  const handleJoinProject = async () => {
    try {
      //user data from localStorage
      const storedUser = localStorage.getItem("user");
  
      if (!storedUser) {
        setMessage("User not logged in.");
        setIsModalOpen(true);
        return;
      }
      // Parse JSON and extract participant ID
      const userData = JSON.parse(storedUser);
      const participantId = userData?.participant?.id;
  
      if (!participantId || !selectedProject?.id) {
        setMessage("Missing participant or project details.");
        setIsModalOpen(true);
        return;
      }
  
      setIsJoining(true);
      console.log("API Request: Joining project", selectedProject.id);
      // Send API request
      const response = await axios.post("http://localhost:5000/enroll/request", {
        participant_id: participantId,
        project_id: selectedProject.id,
      });

      console.log(participantId);
  
      setMessage(response.data.message || "Enrollment request submitted!");
      setIsModalOpen(true);
      console.log("Submitted req to join humaira");
      setSelectedProject(null)
    } catch (error: any) {
      setMessage(error.response?.data?.error || "Failed to submit request.");
      setIsModalOpen(true);
    } finally {
      setIsJoining(false);
    }
  };
  // Apply filtering AFTER declaring categories
  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  /*
  const projects = [
    {
      id: 1,
      title: "Amazon Rainforest Restoration",
      category: "Forestation",
      description:
        "Join our initiative to restore and protect the Amazon rainforest through sustainable planting and community engagement.",
      progress: 75,
      participants: 2834,
      imageUrl:
        "https://public.readdy.ai/ai/img_res/67843d2d14547996180132db1e768704.jpg",
      provider: "BlueWave Initiatives",
      carbonCredits: "750 credits",
      startDate: "2025-05-10",
      endDate: "2025-11-15",
    },
    {
      id: 2,
      title: "Ocean Cleanup Innovation",
      category: "Water",
      description:
        "Innovative technologies and community efforts to remove plastic waste from our oceans and protect marine ecosystems.",
      progress: 60,
      participants: 1956,
      imageUrl:
        "https://public.readdy.ai/ai/img_res/360162775bfd838963f21d4d213dbef1.jpg",
      provider: "OceanGuard Solutions",
      carbonCredits: "500 credits",
      startDate: "2025-06-01",
      endDate: "2025-12-20",
    },
    {
      id: 3,
      title: "Sustainable Agriculture",
      category: "Soil",
      description:
        "Implementing regenerative farming practices to improve soil health and promote sustainable food production.",
      progress: 85,
      participants: 3421,
      imageUrl:
        "https://public.readdy.ai/ai/img_res/6abf801a75ad5fee23a95ca764a4cf34.jpg",
      provider: "AgriGreen Alliance",
      carbonCredits: "620 credits",
      startDate: "2025-04-15",
      endDate: "2025-10-30",
    },
    {
      id: 4,
      title: "re-cycle Recovery",
      category: "re-cycle",
      description:
        "Transforming electronic waste into valuable resources through innovative recycling and upcycling processes.",
      progress: 45,
      participants: 1243,
      imageUrl:
        "https://public.readdy.ai/ai/img_res/a86a5d9bd78a933da2be1d249b523709.jpg",
      provider: "EcoCycle Innovations",
      carbonCredits: "400 credits",
      startDate: "2025-07-10",
      endDate: "2025-12-01",
    },
    {
      id: 5,
      title: "Wildlife Protection",
      category: "Animal",
      description:
        "Protecting endangered species through habitat preservation and anti-poaching initiatives.",
      progress: 65,
      participants: 2156,
      imageUrl:
        "https://public.readdy.ai/ai/img_res/b211efe60d5975f7c0687abc3889202c.jpg",
      provider: "WildEarth Trust",
      carbonCredits: "800 credits",
      startDate: "2025-03-20",
      endDate: "2025-09-10",
    },
    {
      id: 6,
      title: "Urban Forest Initiative",
      category: "Forestation",
      description:
        "Creating green spaces in urban areas to improve air quality and community well-being.",
      progress: 90,
      participants: 4532,
      imageUrl:
        "https://public.readdy.ai/ai/img_res/a63c1d101d792ba7b8c58bb98fb6f4bf.jpg",
      provider: "GreenCity Foundation",
      carbonCredits: "900 credits",
      startDate: "2025-05-05",
      endDate: "2025-11-25",
    },
  ];
  */
  

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Search and Categories */}
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
            {filteredCategories.map((category) => (
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

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects
            .filter(
              (project) =>
                selectedCategory === "All" ||
                project.category === selectedCategory
            )
            .map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-xl shadow-sm overflow-hidden transform transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.imageUrl || 'https://public.readdy.ai/ai/img_res/a86a5d9bd78a933da2be1d249b523709.jpg'}
                    alt={project.project_category}
                    className="w-full h-full object-cover object-center transform transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 px-3 py-1 rounded-full text-sm font-medium text-gray-700">
                      {project.project_category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {project.project_name}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {/* {project.remark} //should be description */}
                    {project.remark}
                  </p>
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-500 mb-1">
                      <span>Progress</span>
                      <span>{project.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-600 rounded-full h-2 transition-all duration-300"
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      <i className="fas fa-users mr-2"></i>
                      {project.participants} participants
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
            ))}
        </div>
      </main>

      {/* Back to Top Button */}
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
              src={selectedProject.imageUrl || 'https://public.readdy.ai/ai/img_res/a86a5d9bd78a933da2be1d249b523709.jpg'}
              alt={selectedProject.project_name}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <p className="text-gray-600 mb-2">
              <strong>Service Provider:</strong> {selectedProject.service_provider}
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Carbon Credits:</strong> {selectedProject.carbon_credits}
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Start Date:</strong> {formatStandardDate(selectedProject.start_date)}
            </p>
            <p className="text-gray-600 mb-4">
              <strong>Completion Date:</strong> {formatStandardDate(selectedProject.end_date)}
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

       {/* Modal */}
       {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
              <p className="text-center text-gray-800 mb-4">{message}</p>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300 !rounded-button whitespace-nowrap"
              >
                Close
              </button>
            </div>
          </div>
        )}


    </div>
  );
};

export default App;
