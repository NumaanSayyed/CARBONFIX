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
    position: 0,
  });
  const [name, setName] = useState();
  const [lastname, setLastname] = useState();
  // @ts-ignore
  const [title, setTitle] = useState("Environmental Sustainability Lead");

  const navigate = useNavigate();
  const chartRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (chartRef.current) {
        const chart = echarts.init(chartRef.current);
        const option = {
            animation: false,
            tooltip: {
                trigger: 'item'
            },
            color: ['#10B981', '#6366F1', '#9CA3AF'],
            series: [
                {
                    name: 'Project Status',
                    type: 'pie',
                    radius: ['60%', '80%'],
                    avoidLabelOverlap: false,
                    label: {
                        show: false
                    },
                    emphasis: {
                        label: {
                            show: false
                        }
                    },
                    labelLine: {
                        show: false
                    },
                    data: [
                        { value: projectStats.completed, name: 'Completed' },
                        { value: projectStats.pending, name: 'Pending' },
                        { value: projectStats.enrolled - (projectStats.completed + projectStats.pending), name: 'In Progress' }
                    ] }  ] };
        chart.setOption(option);
        const handleResize = () => {
            chart.resize();
        };
        window.addEventListener('resize', handleResize);
        return () => {
            chart.dispose();
            window.removeEventListener('resize', handleResize);
        }; }
}, [projectStats]);

  const getBadgeInfo = (creditAmount: number) => {
    if (creditAmount >= 100000) {
      return {
        type: 'Diamond',
        color: 'bg-blue-500',
        icon: 'fa-gem',
        requirement: 100000,
        nextLevel: '∞'
      };
    } else if (creditAmount >= 10000) {
      return {
        type: 'Gold',
        color: 'bg-yellow-400',
        icon: 'fa-crown',
        requirement: 10000,
        nextLevel: 100000
      };
    } else if (creditAmount >= 1000) {
      return {
        type: 'Silver',
        color: 'bg-gray-300',
        icon: 'fa-medal',
        requirement: 1000,
        nextLevel: 10000
      };
    } else {
      return {
        type: 'Bronze',
        color: 'bg-orange-400',
        icon: 'fa-award',
        requirement: 0,
        nextLevel: 1000
      };
    }
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
        position,
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
        position: position,
      });
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
  }, [projectStats]);

  return (
    <div
      className={`min-h-screen ${
        isDarkMode
          ? "bg-gray-900"
          : "bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50"
      } transition-colors duration-300 pt-8`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div
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
                "url(https://readdy.ai/api/search-image?query=modern abstract background with gradient colors in blue and green tones creating a professional and clean atmosphere perfect for profile hero section minimal design style&width=1440&height=256&orientation=landscape&flag=3e0d953fe3a6c3b30b65c232) ",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black opacity-30"></div>
            <div className="absolute bottom-0 left-8 p-4 text-white z-20 mb-5">
              <h2 className="text-4xl font-bold">{name + " " + lastname}</h2>
              <p>{title}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 p-5 text-center mt-4 text-xs">
            <div className="stats-info">
              <p className="text-lg">Total Credits</p>
              <h3 className="font-semibold">{credits}</h3>
            </div>
            <div className="stats-info">
              <p className="text-lg">Position</p>
              <h3 className="font-semibold">{projectStats.position}</h3>
            </div>
            <div className="stats-info">
              <p className="text-lg">Projects</p>
              <h3 className="font-semibold">{projectStats.enrolled}</h3>
            </div>
          </div>
          <div className="my-5 w-full">
            <Swiper slidesPerView={1} spaceBetween={10} loop={true}>
              <SwiperSlide>
                <div className="bg-white p-5 rounded-xl shadow-md">
                  <div
                    ref={chartRef}
                    className="w-full h-64 md:h-96 rounded-xl"
                  />
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
