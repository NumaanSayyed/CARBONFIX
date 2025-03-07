import React, { useState, useEffect } from "react";
import * as echarts from "echarts";
const Dashboard: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<any>(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [programName, setProgramName] = useState("");
  const [carbonCredits, setCarbonCredits] = useState("");
  const [remarks, setRemarks] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [programs, setPrograms] = useState([
    {
      id: 1,
      name: "Forest Restoration Initiative",
      category: "Forestation",
      credits: 2500,
      status: "Active",
    },
    {
      id: 2,
      name: "Clean Water Conservation",
      category: "Water",
      credits: 1800,
      status: "Pending",
    },
    {
      id: 3,
      name: "Soil Enrichment Program",
      category: "Soil",
      credits: 3200,
      status: "Completed",
    },
  ]);
  useEffect(() => {
    const chartDom = document.getElementById("creditsChart");
    if (chartDom) {
      const myChart = echarts.init(chartDom);
      const option = {
        animation: false,
        tooltip: {
          trigger: "item",
        },
        series: [
          {
            name: "Credits Distribution",
            type: "pie",
            radius: ["60%", "80%"],
            data: [
              { value: 8500, name: "Committed Credits" },
              { value: 7500, name: "Generated Credits" },
            ],
            label: {
              show: false,
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
        color: ["#2E7D32", "#1976D2"],
      };
      myChart.setOption(option);
    }
  }, []);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newProgram = {
      id: programs.length + 1,
      name: programName,
      category: selectedCategory,
      credits: parseInt(carbonCredits),
      status: "Pending",
    };
    setPrograms([...programs, newProgram]);
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setIsModalOpen(false);
      setProgramName("");
      setSelectedCategory("");
      setCarbonCredits("");
      setRemarks("");
    }, 1500);
  };
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Forestation":
        return "fa-tree";
      case "Water":
        return "fa-water";
      case "Soil":
        return "fa-seedling";
      case "E-Waste":
        return "fa-recycle";
      case "Animal":
        return "fa-paw";
      default:
        return "fa-leaf";
    }
  };
  return (
    <div className=" pt-20 min-h-screen bg-gradient-to-br from-green-50 to-blue-50 font-['SF Pro Text']">
      <style>{`
        @import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap");
        @import url("https://fonts.googleapis.com/css2?family=SF+Pro+Display:wght@400;500;600;700&display=swap");
        @import url("https://fonts.googleapis.com/css2?family=SF+Pro+Text:wght@400;500;600&display=swap");
      `}</style>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 transition-all duration-300">
        {/* Header Section */}
        <div
          className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-10 mb-8 transition-all duration-500 hover:shadow-2xl border border-green-100/50 relative overflow-hidden"
          style={{
            backgroundImage:
              "url(https://readdy.ai/api/search-image?query=modern abstract eco friendly dashboard background with subtle geometric patterns and organic shapes in soft green and blue gradient perfect for professional interface design high end minimal style&width=1440&height=400&orientation=landscape&flag=6162eb247c29f14588c393bed87fea5e)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundBlendMode: "soft-light",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-blue-500/10 animate-gradient"></div>
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-200 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-200 rounded-full filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
          <div className="flex justify-between items-start gap-8">
            <div className="flex-1 relative z-10">
              <div className="animate-fade-in">
                <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#2E7D32] to-[#1976D2] mb-3 font-['SF Pro Display'] tracking-tight">
                  EcoGuard Solutions
                </h1>
                <p className="text-gray-600 text-xl font-light tracking-wide">
                  Environmental Conservation Organization
                </p>
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-green-400/20 rounded-full animate-ping"></div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mt-8 sm:mt-12">
                <div className="bg-white/95 rounded-2xl p-8 transform transition-all duration-500 hover:scale-105 hover:shadow-xl border border-green-100 group relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <p className="text-sm text-gray-600 mb-3 uppercase tracking-wider font-medium">
                    Committed Credits
                  </p>
                  <p className="text-4xl font-bold bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent animate-pulse">
                    8,500
                  </p>
                  <div className="absolute top-2 right-2 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center transform rotate-12 group-hover:rotate-45 transition-transform duration-500">
                    <i className="fas fa-leaf text-green-500"></i>
                  </div>
                  <div className="mt-2 w-full h-1 bg-green-100 rounded-full overflow-hidden">
                    <div className="w-3/4 h-full bg-green-500 rounded-full animate-pulse"></div>
                  </div>
                </div>
                <div className="bg-white/95 rounded-2xl p-8 transform transition-all duration-500 hover:scale-105 hover:shadow-xl border border-blue-100 group relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <p className="text-sm text-gray-600 mb-3 uppercase tracking-wider font-medium">
                    Generated Credits
                  </p>
                  <p className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent animate-pulse">
                    7,500
                  </p>
                  <div className="absolute top-2 right-2 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center transform rotate-12 group-hover:rotate-45 transition-transform duration-500">
                    <i className="fas fa-chart-line text-blue-500"></i>
                  </div>
                  <div className="mt-2 w-full h-1 bg-blue-100 rounded-full overflow-hidden">
                    <div className="w-2/3 h-full bg-blue-500 rounded-full animate-pulse"></div>
                  </div>
                </div>
                <div className="bg-white/95 rounded-2xl p-8 transform transition-all duration-500 hover:scale-105 hover:shadow-xl border border-purple-100 group relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <p className="text-sm text-gray-600 mb-3 uppercase tracking-wider font-medium">
                    Enrolled Participants
                  </p>
                  <p className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-purple-500 bg-clip-text text-transparent animate-pulse">
                    245
                  </p>
                  <div className="absolute top-2 right-2 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center transform rotate-12 group-hover:rotate-45 transition-transform duration-500">
                    <i className="fas fa-users text-purple-500"></i>
                  </div>
                  <div className="mt-2 w-full h-1 bg-purple-100 rounded-full overflow-hidden">
                    <div className="w-1/2 h-full bg-purple-500 rounded-full animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="w-80 h-80 bg-white/90 rounded-xl p-4 shadow-lg"
              id="creditsChart"
            ></div>
          </div>
        </div>
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-between mb-8 gap-4">
          <button
            className="!rounded-button relative overflow-hidden bg-gradient-to-r from-[#1976D2] to-[#1565C0] text-white px-8 py-4 flex items-center gap-3 hover:translate-y-[-2px] hover:shadow-lg hover:from-[#1565C0] hover:to-[#0D47A1] transition-all duration-300 group"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const y = e.clientY - rect.top;
              const ripple = document.createElement("span");
              ripple.style.left = `${x}px`;
              ripple.style.top = `${y}px`;
              ripple.className =
                "absolute rounded-full bg-white/30 animate-ripple";
              e.currentTarget.appendChild(ripple);
              setTimeout(() => ripple.remove(), 1000);
            }}
          >
            <i className="fas fa-download transform group-hover:rotate-12 transition-transform duration-300"></i>
            <span className="font-semibold whitespace-nowrap">
              Download Project Report
            </span>
            <style >{`
              .animate-ripple {
                width: 10px;
                height: 10px;
                transform: scale(0);
                animation: ripple 1s linear;
              }
              @keyframes ripple {
                to {
                  transform: scale(40);
                  opacity: 0;
                }
              }
            `}</style>
          </button>
          <button
            onClick={(e) => {
              const button = e.currentTarget;
              button.classList.add("scale-effect");
              setTimeout(() => {
                button.classList.remove("scale-effect");
                setIsModalOpen(true);
              }, 200);
            }}
            className="!rounded-button relative overflow-hidden bg-gradient-to-r from-[#2E7D32] to-[#1B5E20] text-white px-8 py-4 flex items-center gap-3 hover:translate-y-[-2px] hover:shadow-lg hover:from-[#1B5E20] hover:to-[#0A3D0A] transition-all duration-300 group animate-glow"
          >
            <i className="fas fa-plus transform group-hover:rotate-90 transition-transform duration-300 animate-pulse"></i>
            <span className="font-semibold whitespace-nowrap">
              Provide Service
            </span>
            <style >{`
              .animate-glow {
                animation: glow 2s infinite;
              }
              @keyframes glow {
                0%,
                100% {
                  box-shadow: 0 0 5px rgba(34, 197, 94, 0.2);
                }
                50% {
                  box-shadow: 0 0 20px rgba(34, 197, 94, 0.4);
                }
              }
              .scale-effect {
                animation: scale 0.2s ease-in-out;
              }
              @keyframes scale {
                0% {
                  transform: scale(1);
                }
                50% {
                  transform: scale(0.95);
                }
                100% {
                  transform: scale(1);
                }
              }
            `}</style>
          </button>
        </div>
        {/* Navigation Button */}
        <div className="mb-8">
          <button
            className="!rounded-button group bg-white/90 backdrop-blur-sm w-full py-6 px-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-purple-100 relative overflow-hidden"
            onClick={(e) => {
              const button = e.currentTarget;
              button.classList.add("animate-click");
              setTimeout(() => {
                button.classList.remove("animate-click");
                // Add your navigation logic here
              }, 300);
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-50/50 via-transparent to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute -right-20 -top-20 w-40 h-40 bg-gradient-to-br from-purple-100/20 to-blue-100/20 rounded-full blur-2xl transform group-hover:scale-150 transition-transform duration-700"></div>
            <div className="flex items-center justify-between relative">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 flex items-center justify-center transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-12">
                  <i className="fas fa-users text-xl text-purple-600 group-hover:text-purple-700"></i>
                </div>
                <span className="text-xl font-semibold text-gray-800 group-hover:text-purple-700 transition-colors duration-300">
                  View Enrolled Participants
                </span>
              </div>
              <div className="flex items-center gap-3 text-purple-600 group-hover:translate-x-2 transition-transform duration-300">
                <span className="text-sm font-medium">View Details</span>
                <i className="fas fa-arrow-right"></i>
              </div>
            </div>
            <style >{`
              .animate-click {
                animation: clickEffect 0.3s ease-out;
              }
              @keyframes clickEffect {
                0% {
                  transform: scale(1);
                }
                50% {
                  transform: scale(0.98);
                }
                100% {
                  transform: scale(1);
                }
              }
            `}</style>
          </button>
        </div>
        {/* Programs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {programs.map((program) => (
            <div
              key={program.id}
              className="group bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-green-50 cursor-pointer relative overflow-hidden"
              onClick={() => {
                setSelectedProgram(program);
                setIsDetailModalOpen(true);
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#2E7D32]/5 via-transparent to-[#1976D2]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 bg-[url('https://public.readdy.ai/ai/img_res/62d864bffb18d9082f32c8945cbe0e68.jpg')] opacity-5 mix-blend-overlay"></div>
              </div>
              <div className="absolute -right-20 -top-20 w-40 h-40 bg-gradient-to-br from-green-100/20 to-blue-100/20 rounded-full blur-2xl transform group-hover:scale-150 transition-transform duration-700"></div>
              <div className="flex items-center justify-between mb-6 relative">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 shadow-lg">
                  <i
                    className={`fas ${getCategoryIcon(
                      program.category
                    )} text-2xl text-green-600 group-hover:text-green-700`}
                  ></i>
                </div>
                <span
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
                    program.status === "Active"
                      ? "bg-[#2E7D32]/10 text-[#2E7D32] border border-[#2E7D32]/20 group-hover:bg-[#2E7D32]/20 group-hover:border-[#2E7D32]/30"
                      : program.status === "Pending"
                      ? "bg-[#FFA000]/10 text-[#FFA000] border border-[#FFA000]/20 group-hover:bg-[#FFA000]/20 group-hover:border-[#FFA000]/30"
                      : "bg-[#1976D2]/10 text-[#1976D2] border border-[#1976D2]/20 group-hover:bg-[#1976D2]/20 group-hover:border-[#1976D2]/30"
                  }`}
                >
                  <i
                    className={`fas fa-circle text-xs mr-2 ${
                      program.status === "Active"
                        ? "text-green-500"
                        : program.status === "Pending"
                        ? "text-yellow-500"
                        : "text-blue-500"
                    }`}
                  ></i>
                  {program.status}
                </span>
              </div>
              <div className="space-y-4 relative">
                <h3 className="text-xl font-bold text-gray-800 group-hover:text-green-700 transition-colors duration-300">
                  {program.name}
                </h3>
                <p className="text-gray-600 flex items-center gap-2 group-hover:text-gray-700 transition-colors duration-300">
                  <i className="fas fa-tag text-green-500 group-hover:rotate-12 transition-transform duration-300"></i>
                  {program.category}
                </p>
                <div className="pt-4 border-t border-green-100">
                  <div className="flex items-center justify-between">
                    <p className="text-2xl font-bold bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300 flex items-center gap-2">
                      <i className="fas fa-leaf text-green-500 group-hover:rotate-12 transition-transform duration-300"></i>
                      {program.credits.toLocaleString()}
                    </p>
                    <span className="text-sm text-gray-500 group-hover:text-gray-700 transition-colors duration-300">
                      Carbon Credits
                    </span>
                  </div>
                  <div className="mt-2 w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full transform origin-left transition-transform duration-500 group-hover:scale-x-110"
                      style={{ width: `${(program.credits / 5000) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              </div>
            </div>
          ))}
        </div>
        {/* Detail Modal */}
        {isDetailModalOpen && selectedProgram && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
            <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6 sm:p-8 w-full max-w-2xl mx-4 animate-scaleIn shadow-2xl border border-white/50">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  Program Details
                </h2>
                <button
                  onClick={() => setIsDetailModalOpen(false)}
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
                        selectedProgram.category
                      )} text-3xl text-green-600`}
                    ></i>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">
                      {selectedProgram.name}
                    </h3>
                    <p className="text-gray-600">{selectedProgram.category}</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">Status</p>
                    <p className="text-lg font-semibold text-gray-800">
                      {selectedProgram.status}
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">Carbon Credits</p>
                    <p className="text-lg font-semibold text-gray-800">
                      {selectedProgram.credits.toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-800">
                    Program Timeline
                  </h4>
                  <div className="relative pl-8 pb-8 border-l-2 border-green-200">
                    <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-green-500"></div>
                    <p className="text-sm text-gray-600">Program Started</p>
                    <p className="text-gray-800">March 1, 2025</p>
                  </div>
                  <div className="relative pl-8 pb-8 border-l-2 border-green-200">
                    <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-green-300"></div>
                    <p className="text-sm text-gray-600">First Milestone</p>
                    <p className="text-gray-800">June 1, 2025</p>
                  </div>
                  <div className="relative pl-8">
                    <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-green-200"></div>
                    <p className="text-sm text-gray-600">
                      Estimated Completion
                    </p>
                    <p className="text-gray-800">December 1, 2025</p>
                  </div>
                </div>
                <button className="!rounded-button w-full bg-green-600 text-white py-3 flex items-center justify-center gap-2 hover:bg-green-700 transition-colors duration-300">
                  <i className="fas fa-chart-line"></i>
                  View Detailed Analytics
                </button>
              </div>
            </div>
          </div>
        )}
        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
            <style >{`
              .animate-fadeIn {
                animation: fadeIn 0.4s cubic-bezier(0.4, 0, 0.2, 1);
              }
              @media (max-width: 640px) {
                .animate-fadeIn {
                  animation-duration: 0.3s;
                }
              }
              @keyframes fadeIn {
                from {
                  opacity: 0;
                  backdrop-filter: blur(0);
                }
                to {
                  opacity: 1;
                  backdrop-filter: blur(8px);
                }
              }
            `}</style>
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 w-full max-w-md animate-scaleIn shadow-2xl border border-white/50">
              <style >{`
                .animate-scaleIn {
                  animation: scaleIn 0.3s ease-out;
                }
                @keyframes scaleIn {
                  from {
                    transform: scale(0.95);
                    opacity: 0;
                  }
                  to {
                    transform: scale(1);
                    opacity: 1;
                  }
                }
              `}</style>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  Add New Service
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label className="block text-gray-700 mb-2 font-medium">
                    Service Category
                  </label>
                  <div className="relative group">
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3 appearance-none transition-all duration-300 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 group-hover:border-green-400"
                      required
                    >
                      <option value="">Select Category</option>
                      <option value="Forestation">Forestation</option>
                      <option value="Water">Water</option>
                      <option value="Soil">Soil</option>
                      <option value="E-Waste">E-Waste</option>
                      <option value="Animal">Animal</option>
                    </select>
                    <i className="fas fa-chevron-down absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition-transform duration-300 group-hover:text-green-500 group-focus-within:text-green-500 group-focus-within:rotate-180"></i>
                  </div>
                </div>
                <div className="mb-6">
                  <label className="block text-gray-700 mb-2 font-medium">
                    Program Name
                  </label>
                  <div className="relative group">
                    <input
                      type="text"
                      value={programName}
                      onChange={(e) => setProgramName(e.target.value)}
                      className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3 transition-all duration-300 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 group-hover:border-green-400"
                      required
                    />
                    <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-500 transition-all duration-300 group-hover:w-full group-focus-within:w-full"></div>
                  </div>
                </div>
                <div className="mb-6">
                  <label className="block text-gray-700 mb-2 font-medium">
                    Carbon Credits
                  </label>
                  <div className="relative flex items-center group">
                    <button
                      type="button"
                      onClick={() =>
                        setCarbonCredits((prev) =>
                          (parseInt(prev) - 100).toString()
                        )
                      }
                      className="absolute left-0 w-12 h-full flex items-center justify-center text-gray-500 hover:text-green-600 transition-colors duration-300"
                    >
                      <i className="fas fa-minus"></i>
                    </button>
                    <input
                      type="number"
                      value={carbonCredits}
                      onChange={(e) => setCarbonCredits(e.target.value)}
                      className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl px-12 py-3 text-center transition-all duration-300 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 group-hover:border-green-400"
                      required
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setCarbonCredits((prev) =>
                          (parseInt(prev) + 100).toString()
                        )
                      }
                      className="absolute right-0 w-12 h-full flex items-center justify-center text-gray-500 hover:text-green-600 transition-colors duration-300"
                    >
                      <i className="fas fa-plus"></i>
                    </button>
                  </div>
                </div>
                <div className="mb-6">
                  <label className="block text-gray-700 mb-2 font-medium">
                    Remarks
                  </label>
                  <div className="relative group">
                    <textarea
                      value={remarks}
                      onChange={(e) => {
                        setRemarks(e.target.value);
                        e.target.style.height = "auto";
                        e.target.style.height = e.target.scrollHeight + "px";
                      }}
                      className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3 min-h-[96px] transition-all duration-300 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 group-hover:border-green-400 resize-none"
                      style={{ height: "96px" }}
                    ></textarea>
                    <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-500 transition-all duration-300 group-hover:w-full group-focus-within:w-full"></div>
                  </div>
                </div>
                <button
                  type="submit"
                  className="!rounded-button w-full bg-gradient-to-r from-green-600 to-green-500 text-white py-4 flex items-center justify-center gap-2 hover:from-green-700 hover:to-green-600 transition-all duration-300 relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-transparent transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700"></div>
                  {showSuccess ? (
                    <div className="animate-success-check">
                      <i className="fas fa-check text-xl"></i>
                    </div>
                  ) : (
                    <>
                      <i className="fas fa-plus group-hover:rotate-90 transition-transform duration-300"></i>
                      <span className="font-medium">Add Service</span>
                    </>
                  )}
                  <style >{`
                    .animate-success-check {
                      animation: successCheck 0.5s cubic-bezier(0.4, 0, 0.2, 1);
                    }
                    @keyframes successCheck {
                      0% {
                        transform: scale(0);
                        opacity: 0;
                      }
                      50% {
                        transform: scale(1.2);
                      }
                      100% {
                        transform: scale(1);
                        opacity: 1;
                      }
                    }
                  `}</style>
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Dashboard;
