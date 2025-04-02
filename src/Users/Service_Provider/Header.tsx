import React, { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const Header: React.FC = () => {
  const chartRef = useRef<HTMLDivElement>(null);
  const [serviceProvider, setServiceProvider] = useState<any>(null);
  //Func to extract email from token
  const getEmailFromToken = () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return null;

      const decoded: any = jwtDecode(token);
      return decoded.email || null;
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  };

  //Fetch Service Provider Details
  useEffect(() => {
    const fetchServiceProviderDetails = async () => {
      const token = localStorage.getItem("token");
      const email = getEmailFromToken();

      if (!token || !email) {
        console.error("Unauthorized! Missing credentials.");
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:5000/serviceProviders/details/${email}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setServiceProvider(response.data);
      } catch (error) {
        console.error("Error fetching service provider details:", error);
      }
    };

    fetchServiceProviderDetails();
  }, []);

  useEffect(() => {
    if (chartRef.current) {
      const myChart = echarts.init(chartRef.current);
      const option = {
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

      // Resize chart on window resize
      window.addEventListener("resize", () => myChart.resize());

      // Cleanup event listener on component unmount
      return () => {
        window.removeEventListener("resize", () => myChart.resize());
        myChart.dispose();
      };
    }
  }, []);

  return (
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
              {/* EcoGuard Solutions */}
              {serviceProvider ? serviceProvider.org_name : "Loading..."}
            </h1>
            <p className="text-gray-600 text-xl font-light tracking-wide">
              {/* Environmental Conservation Organization */}
              {serviceProvider
                ? serviceProvider.org_type
                : "Conservation Service Type"}
            </p>
            <div className="absolute -top-4 -left-4 w-12 h-12 bg-green-400/20 rounded-full animate-ping"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mt-8 sm:mt-12">
            <StatCard
              title="Committed Credits"
              value="8,500"
              bgColor="green"
              iconClass="fa-leaf"
              progressWidth="w-3/4"
            />

            <StatCard
              title="Generated Credits"
              value="7,500"
              bgColor="blue"
              iconClass="fa-chart-line"
              progressWidth="w-2/3"
            />

            <StatCard
              title="Enrolled Participant"
              value="245"
              bgColor="purple"
              iconClass="fa-users"
              progressWidth="w-1/2"
            />
          </div>
        </div>

        {/* Chart Container */}
        <div className="w-80 h-80 bg-white/90 rounded-xl p-4 shadow-lg">
          <div ref={chartRef} className="w-full h-full"></div>
        </div>
      </div>
    </div>
  );
};

// Reusable Statistic Card Component
const StatCard: React.FC<{
  title: string;
  value: string;
  bgColor: string;
  iconClass: string;
  progressWidth: string;
}> = ({ title, value, bgColor, iconClass, progressWidth }) => {
  return (
    <div
      className={`bg-white/95 rounded-2xl p-8 transform transition-all duration-500 hover:scale-105 hover:shadow-xl border border-${bgColor}-100 group relative overflow-hidden`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <p className="text-sm text-gray-600 mb-3 uppercase tracking-wider font-medium">
        {title}
      </p>
      <p
        className={`text-4xl font-bold bg-gradient-to-r text-${bgColor}-500 bg-clip-text animate-pulse`}
        // className={`text-4xl font-bold bg-gradient-to-r from-${txtColor}-500 to-${txtColor}-600 bg-clip-text text-transparent animate-pulse`}
      >
        {value}
      </p>
      <div
        className={`absolute top-2 right-2 w-8 h-8 bg-${bgColor}-100 rounded-full flex items-center justify-center transform rotate-12 group-hover:rotate-45 transition-transform duration-500`}
      >
        <i className={`fas ${iconClass} text-${bgColor}-500`}></i>
      </div>
      <div className="mt-2 w-full h-1 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`${progressWidth} h-full bg-${bgColor}-500 rounded-full animate-pulse`}
        ></div>
      </div>
    </div>
  );
};

export default Header;
