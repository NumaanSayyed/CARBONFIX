import React, { useState, useEffect, useRef } from "react";
import * as echarts from "echarts";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
// import 'swiper/css';
// import 'swiper/css/pagination';
import axios from "axios";
import "swiper/swiper-bundle.css";
import { backend_url } from "../../backend_route";
import { useNavigate } from "react-router-dom";
import { getWithExpirationCheck } from "../../Helpers/Helpers";

const swiperModules = [Pagination, Autoplay];
const Profile: React.FC = () => {
  const [credits, setCredits] = useState(0);
  const [, setShowTooltip] = useState(false);
  const [badgeAnimation, setBadgeAnimation] = useState(false);
  const [, setPreviousBadgeType] = useState("");
  // @ts-ignore
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showLevelUpModal, setShowLevelUpModal] = useState(false);
  //@ts-ignore
  const [isMobile, setIsMobile] = useState(false);
  // @ts-ignore
  const [projectStats, setprojectstats] = useState({
    enrolled: 0,
    completed: 0,
    pending: 0,
    completion_rate: 0,
  });
  const [name, setName] = useState();
  const [lastname, setLastname] = useState();
  // @ts-ignore
  const [title, setTitle] = useState("Environmental Sustainability Lead");

  const navigate = useNavigate();
  const chartRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   const handleResize = () => {
  //     setIsMobile(window.innerWidth < 768);
  //   };
  //   handleResize();
  //   window.addEventListener("resize", handleResize);
  //   return () => window.removeEventListener("resize", handleResize);
  // }, []);

  useEffect(() => {
    if (chartRef.current) {
      const chart = echarts.init(chartRef.current);
      const option = {
        animation: false,
        tooltip: {
          trigger: "item",
        },
        color: ["#10B981", "#6366F1", "#9CA3AF"],
        series: [
          {
            name: "Project Status",
            type: "pie",
            radius: ["60%", "80%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
            },
            emphasis: {
              label: {
                show: false,
              },
            },
            labelLine: {
              show: false,
            },
            data: [
              { value: projectStats.completed, name: "Completed" },
              { value: projectStats.pending, name: "Pending" },
              {
                value:
                  projectStats.enrolled -
                  (projectStats.completed + projectStats.pending),
                name: "In Progress",
              },
            ],
          },
        ],
      };
      chart.setOption(option);
      const handleResize = () => {
        chart.resize();
      };
      window.addEventListener("resize", handleResize);
      return () => {
        chart.dispose();
        window.removeEventListener("resize", handleResize);
      };
    }
  }, [projectStats]);

  // const getBadgeInfo = (creditAmount: number) => {
  //   if (creditAmount >= 2500) {
  //     return {
  //       type: "Gold",
  //       color: "bg-yellow-400",
  //       icon: "fa-crown",
  //       requirement: 501,
  //       nextLevel: "∞",
  //     };
  //   } else if (creditAmount >= 800) {
  //     return {
  //       type: "Silver",
  //       color: "bg-gray-300",
  //       icon: "fa-medal",
  //       requirement: 101,
  //       nextLevel: 501,
  //     };
  //   } else if (creditAmount >= 4000) {
  //     return {
  //       type: "Diamond",
  //       color: "bg-blue-400",
  //       icon: "fa-gem",
  //       requirement: 501,
  //       nextLevel: "∞",
  //     };
  //   }
  //   return {
  //     type: "Bronze",
  //     color: "bg-orange-400",
  //     icon: "fa-award",
  //     requirement: 0,
  //     nextLevel: 101,
  //   };
  // };
  const getBadgeInfo = (creditAmount: number) => {
    if (creditAmount >= 501) {
      return {
        type: "Gold",
        color: "bg-yellow-400",
        icon: "fa-crown",
        requirement: 501,
        nextLevel: "∞",
      };
    } else if (creditAmount >= 101) {
      return {
        type: "Silver",
        color: "bg-gray-300",
        icon: "fa-medal",
        requirement: 101,
        nextLevel: 501,
      };
    }
    return {
      type: "Bronze",
      color: "bg-orange-400",
      icon: "fa-award",
      requirement: 0,
      nextLevel: 101,
    };
  };

  const badgeInfo = getBadgeInfo(credits);
  //@ts-ignore
  const addCredits = () => {
    const previousBadge = getBadgeInfo(credits).type;
    const newCredits = credits + 50;
    const newBadge = getBadgeInfo(newCredits).type;
    if (previousBadge !== newBadge) {
      setPreviousBadgeType(previousBadge);
      setBadgeAnimation(true);
      setShowLevelUpModal(true);
      const startValue = credits;
      const endValue = newCredits;
      const duration = 2000;
      const steps = 60;
      const stepValue = (endValue - startValue) / steps;
      let currentStep = 0;
      const timer = setInterval(() => {
        if (currentStep < steps) {
          setCredits(Math.round(startValue + stepValue * currentStep));
          currentStep++;
        } else {
          setCredits(endValue);
          clearInterval(timer);
        }
      }, duration / steps);
      setTimeout(() => {
        setBadgeAnimation(false);
        setShowLevelUpModal(false);
      }, 2000);
    } else {
      setCredits(newCredits);
    }
  };

  const token = getWithExpirationCheck("token");

  const fetchProfileData = async () => {
    try {
      const res = await axios.get(`${backend_url}/participants/authenticate`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Backend Response:", res.data);

      const {
        participant,
        total_enrolled_projects,
        total_completed_projects,
        total_pending_projects,
        total_credits,
        completion_rate,
      } = res.data;

      if (participant.first_name) setName(participant.first_name);
      if (participant.last_name) setLastname(participant.last_name);
      if (participant.title) setTitle(participant.title);
      if (total_credits) setCredits(total_credits);

      // Update project stats
      setprojectstats({
        enrolled: total_enrolled_projects,
        completed: total_completed_projects,
        pending: total_pending_projects,
        completion_rate: completion_rate,
      });

      console.log("profile data for stats");
      console.log("compted", total_completed_projects);
      console.log(projectStats.completed);
      console.log("total enrolled", total_enrolled_projects);
      console.log(projectStats.enrolled);
      console.log("pending", total_pending_projects);
      console.log(projectStats.pending);

      // Log or use the completion rate
      console.log("Completion Rate:", completion_rate);
      console.log("Credits State:", credits);
    } catch (error) {
      console.error("Failed to fetch profile data:", error);
    }
  };
  useEffect(() => {
    fetchProfileData();
  }, []);

  useEffect(() => {
    console.log("Updated project stats:", projectStats);
  }, [projectStats]);

  useEffect(() => {
    if (chartRef.current) {
      const chart = echarts.init(chartRef.current);

      const enrolledTotal = projectStats.enrolled || 0;
      const completed = projectStats.completed || 0;
      const pending = projectStats.pending || 0;
      //   @ts-ignore
      const inProgress = Math.max(enrolledTotal - (completed + pending), 0);

      const option = {
        animation: false,
        tooltip: {
          trigger: "item",
        },
        // color: ["#10B981", "blue#6366f1", "#9CA3AF"],
        // color: ["#9CA3AF", "#9CA3AF", "#6366f1"],
        color: ["#6366f1", "#9CA3AF", "#10B981", "#FBBF24"], // blue, gray, green, yellow

        series: [
          {
            name: "Project Status",
            type: "pie",
            radius: ["60%", "80%"],
            avoidLabelOverlap: false,
            label: { show: false },
            emphasis: {
              label: {
                show: false,
              },
            },
            labelLine: { show: false },
            data: [
              { value: projectStats.completed || 0, name: "Completed" },
              { value: projectStats.pending || 0, name: "Pending" },
              { value: projectStats.enrolled || 0, name: "Enrolled" },
              {
                value: Math.max(
                  0,
                  (projectStats.enrolled || 0) -
                    ((projectStats.completed || 0) +
                      (projectStats.pending || 0))
                ),
                name: "In Progress",
              },
            ],
          },
        ],
      };

      chart.setOption(option);

      const resizeHandler = () => chart.resize();
      window.addEventListener("resize", resizeHandler);

      return () => {
        window.removeEventListener("resize", resizeHandler);
        chart.dispose();
      };
    }
  }, [projectStats]); // This ensures re-rendering happens on update

  return (
    <div
    className={`min-h-screen ${
      isDarkMode
        ? "bg-gray-900"
        : "bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50"
    } transition-colors duration-300 pt-8`}
  >
    <div className={`max-w-7xl px-4 sm:px-6 lg:px-8 py-12 mx-auto`}>
        <div
          // style={{paddingTop:"40px"}}
          className={`${
            isDarkMode ? "bg-gray-800/90" : "bg-white/90"
          } rounded-xl backdrop-blur-lg shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] overflow-hidden transition-colors duration-300 border border-opacity-20 ${
            isDarkMode ? "border-white" : "border-gray-200"
          }`}
        >
          <div
            className="relative  h-48 md:h-64 bg-cover bg-center"
            style={{
              backgroundImage:
                "url(https://readdy.ai/api/search-image?query=modern abstract background with gradient colors in blue and green tones creating a professional and clean atmosphere perfect for profile hero section minimal design style&width=1440&height=256&orientation=landscape&flag=3e0d1346fe0c29377e5867ccf4d9a0a0)",
            }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-30"></div>
            <div className="relative h-full flex  md:flex-row items-center justify-center md:justify-start px-4 md:px-8 space-y-4 md:space-y-0 md:space-x-8 text-center md:text-left">
              {/* <div className="relative h-full flex flex-col md:flex-row items-center justify-center md:justify-start px-4 md:px-8 space-y-4 md:space-y-0 md:space-x-8"> */}
              <div className="relative group ">
                <div
                  className={`w-24 h-24 md:w-32 md:h-32  [@media(max-width:770px)]:h-20 [@media(max-width:770px)]:w-20  rounded-full border-4 ${
                    badgeInfo.color
                  } overflow-hidden transition-all duration-300 group-hover:scale-105 relative ${
                    badgeAnimation ? "animate-pulse" : ""
                  }`}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <i
                      className={`fas ${
                        badgeInfo.icon
                      } text-4xl md:text-5xl text-white drop-shadow-lg ${
                        badgeAnimation ? "animate-bounce" : ""
                      }`}
                    ></i>
                  </div>
                  <div className="absolute -bottom-1 left-0 right-0 h-1/3 bg-gradient-to-t from-black/30 to-transparent"></div>
                </div>{" "}
              </div>
              {/* <div className="text-center md:text-left text-white"> */}
              <div className="text-white w-full md:w-auto flex flex-col items-center md:items-start space-y-2">
                <div className="flex flex-col md:flex-row items-center md:space-x-4">
                  <h1 className="text-2xl md:text-3xl font-bold break-words [@media(max-width:770px)]:text-xl">
                    {name} {lastname}
                  </h1>

                  <div
                    className={`mt-2 md:mt-0 ${
                      badgeInfo.color
                    } px-6 py-2 rounded-full flex items-center space-x-3 transition-all duration-300 transform hover:scale-105 ${
                      badgeAnimation
                        ? "animate-pulse shadow-lg shadow-current"
                        : ""
                    }`}
                    onMouseEnter={() => setShowTooltip(true)}
                    onMouseLeave={() => setShowTooltip(false)}
                  >
                    <i
                      className={`fas ${badgeInfo.icon} text-xl ${
                        badgeAnimation ? "animate-spin" : ""
                      }`}
                    ></i>
                    <span className="font-bold text-lg tracking-wide  [@media(max-width:770px)]:text-sm">
                      {badgeInfo.type}
                    </span>
                    <span className="text-sm opacity-75">Level</span>
                  </div>
                </div>
                <p className="text-black-600  mt-2  [@media(max-width:770px)]:text-sm pb-2 ">
                  {credits >= 4000
                    ? "A True Guardian of the Planet: Pioneering a Greener Tomorrow!"
                    : credits >= 2500
                    ? "Leading the Change: A Champion for a Sustainable Future!"
                    : credits >= 800
                    ? "Making an Impact: Growing Greener, One Action at a Time!"
                    : "Every Step Counts: The Journey to Sustainability Begins Here!"}
                  {/* Environmental Sustainability Lead */}
                </p>
              </div>{" "}
            </div>{" "}
          </div>
          <div className="px-4 md:px-8 py-6">
            {isMobile ? (
              <Swiper
                modules={swiperModules}
                spaceBetween={20}
                slidesPerView={1.2}
                centeredSlides={true}
                pagination={{ clickable: false }}
                autoplay={{ delay: 3000 }}
                className="mb-8"
              >
                <SwiperSlide>
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6">
                    <div className="text-4xl font-bold text-green-600 mb-2">
                      {credits}
                    </div>
                    <p className="text-gray-600">Total Carbon Credits</p>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="bg-white/30 backdrop-blur-md rounded-xl p-6 shadow-[inset_-5px_-5px_10px_rgba(255,255,255,0.8),inset_5px_5px_10px_rgba(0,0,0,0.1)]">
                    <div className="text-4xl font-bold text-blue-600 mb-2">
                      {projectStats.completed}
                    </div>
                    <p className="text-gray-600">Projects Contributed</p>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="bg-white/30 backdrop-blur-md rounded-xl p-6 shadow-[inset_-5px_-5px_10px_rgba(255,255,255,0.8),inset_5px_5px_10px_rgba(0,0,0,0.1)]">
                    <div className="text-4xl font-bold text-purple-600 mb-2">
                      {projectStats.completion_rate}
                    </div>
                    <p className="text-gray-600">Sustainability Score</p>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div
                    className="bg-white/30 backdrop-blur-md rounded-xl p-6 shadow-[inset_-5px_-5px_10px_rgba(255,255,255,0.8),inset_5px_5px_10px_rgba(0,0,0,0.1)]"
                    onClick={() => navigate("/participant/project")}
                  >
                    <div className="text-4xl font-bold text-purple-600 mb-2"></div>
                    <p className="text-gray-600 text-3xl font-bold text-purple-600">
                      My projects
                    </p>
                  </div>
                </SwiperSlide>
              </Swiper>
            ) : (
              <div className="grid  grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div
                  className="bg-gradient-to-br from-emerald-50 to-green-100 backdrop-blur-md rounded-xl p-6 cursor-pointer relative overflow-hidden group transition-all duration-300"
                  // onClick={addCredits}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-emerald-500/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
                  <div className="relative z-10">
                    <div className="flex items-baseline space-x-2">
                      <div className="text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent animate-pulse">
                        {credits}
                      </div>
                      <div className="text-lg text-green-600 font-medium">
                        credits
                      </div>
                    </div>
                    <p className="text-gray-600 mt-2 group-hover:text-green-700 transition-colors duration-300">
                      Total Carbon Credits
                    </p>
                  </div>{" "}
                  <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-gradient-to-br from-green-200 to-emerald-300 rounded-full opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                </div>
                <div className="bg-white/30 backdrop-blur-md rounded-xl p-6 shadow-[inset_-5px_-5px_10px_rgba(255,255,255,0.8),inset_5px_5px_10px_rgba(0,0,0,0.1)]">
                  <div className="text-4xl font-bold text-blue-600 mb-2">
                    {projectStats.completed}
                  </div>
                  <p className="text-gray-600">Projects Contributed</p>
                </div>
                <div className="bg-white/30 backdrop-blur-md rounded-xl p-6 shadow-[inset_-5px_-5px_10px_rgba(255,255,255,0.8),inset_5px_5px_10px_rgba(0,0,0,0.1)]">
                  <div className="text-4xl font-bold text-purple-600 mb-2">
                    {projectStats.completion_rate}
                  </div>
                  <p className="text-gray-600">Sustainability Score</p>
                </div>
                <div
                  className="flex items-baseline space-x-2 p-6  shadow-[inset_-5px_-5px_10px_rgba(255,255,255,0.8),inset_5px_5px_10px_rgba(0,0,0,0.1)]"
                  onClick={() => navigate("/participant/project")}
                >
                  {/* <div className="text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent animate-pulse">{credits}</div> */}
                  <div className="text-3xl font-bold text-purple-600">
                    My Projects
                  </div>
                </div>{" "}
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-6">
                <div className="bg-white/40 backdrop-blur-md rounded-lg p-5 shadow-[5px_5px_15px_rgba(0,0,0,0.1),-5px_-5px_15px_rgba(255,255,255,0.8)] transition-all duration-300">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">
                      Projects Overview
                    </h3>
                    <button className="text-emerald-600 hover:text-emerald-700">
                      <i className="fas fa-sync-alt"></i>
                    </button>
                  </div>
                  <div className="space-y-4">
                    {" "}
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Enrolled Projects</span>
                      <span className="text-2xl font-bold text-emerald-600">
                        {projectStats.enrolled}
                      </span>
                    </div>{" "}
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Completed</span>
                      <span className="text-2xl font-bold text-indigo-600">
                        {projectStats.completed}
                      </span>
                    </div>{" "}
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">
                        Project Approval Pending
                      </span>
                      <span className="text-2xl font-bold text-gray-400">
                        {projectStats.pending}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="bg-white/40 backdrop-blur-md rounded-lg p-5 shadow-[5px_5px_15px_rgba(0,0,0,0.1),-5px_-5px_15px_rgba(255,255,255,0.8)] transition-all duration-300">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Completion Rate
                  </h3>
                  <div className="relative pt-1">
                    <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-indigo-100">
                      <div
                        style={{
                          width: `${
                            (projectStats.completed / projectStats.enrolled) *
                            100
                          }%`,
                        }}
                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-500"
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs font-semibold">
                      {" "}
                      <span className="text-indigo-600">Progress</span>
                      <span className="text-indigo-600">
                        {Math.round(
                          (projectStats.completed / projectStats.enrolled) * 100
                        )}
                        %
                      </span>{" "}
                    </div>{" "}
                  </div>{" "}
                </div>{" "}
              </div>
              <div className="bg-white/40 backdrop-blur-md rounded-lg p-5 shadow-[5px_5px_15px_rgba(0,0,0,0.1),-5px_-5px_15px_rgba(255,255,255,0.8)] transition-all duration-300">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Project Distribution
                </h3>
                {/* <div ref={chartRef} className="w-full h-64"></div> */}
                <div
                  ref={chartRef}
                  className="w-full h-64 md:h-80 sm:h-72 xs:h-60"
                  style={{ minHeight: "16rem" }} // ensures consistent height even on very small devices
                ></div>
              </div>
            </div>
            <div className="mt-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Recent Achievements
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-4 bg-white/30 backdrop-blur-md rounded-lg p-4 shadow-[3px_3px_10px_rgba(0,0,0,0.1),-3px_-3px_10px_rgba(255,255,255,0.8)] hover:shadow-[inset_3px_3px_10px_rgba(0,0,0,0.1),inset_-3px_-3px_10px_rgba(255,255,255,0.8)] transition-all duration-300 cursor-pointer">
                  <i className="fas fa-tree text-2xl text-green-500"></i>
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      Forest Conservation Pioneer
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Contributed to saving 100 acres of rainforest
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 bg-white/30 backdrop-blur-md rounded-lg p-4 shadow-[3px_3px_10px_rgba(0,0,0,0.1),-3px_-3px_10px_rgba(255,255,255,0.8)] hover:shadow-[inset_3px_3px_10px_rgba(0,0,0,0.1),inset_-3px_-3px_10px_rgba(255,255,255,0.8)] transition-all duration-300 cursor-pointer">
                  <i className="fas fa-solar-panel text-2xl text-yellow-500"></i>
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      Solar Energy Advocate
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Supported 5 community solar projects
                    </p>
                  </div>{" "}
                </div>{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
        </div>
        -{" "}
      </div>
      {showLevelUpModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>
          <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-xl p-8 transform scale-100 animate-bounce-in shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] border border-white border-opacity-20">
            <div className="text-center">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-2xl font-bold mb-4">Level Up!</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Congratulations! You've reached {badgeInfo.type} status!
              </p>
              <button
                onClick={() => setShowLevelUpModal(false)}
                className="px-6 py-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-full hover:from-purple-600 hover:to-indigo-600 transition-all duration-300"
              >
                {" "}
                Continue{" "}
              </button>{" "}
            </div>{" "}
          </div>{" "}
        </div>
      )}{" "}
    </div>
  );
};
export default Profile;