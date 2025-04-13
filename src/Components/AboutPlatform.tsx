import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AboutPlatform: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const features = [
    {
      title: "Support Eco Initiatives",
      description:
        "Contribute to global sustainability efforts by participating in eco-friendly projects that drive real environmental change.",
      image:
        "https://public.readdy.ai/ai/img_res/7c54135574d5d414b389d93c1a7b7890.jpg",
      icon: "fa-leaf",
    },
    {
      title: "Join Sustainability Projects",
      description:
        "Explore and enroll in impactful eco-projects, from tree planting to renewable energy initiatives, tailored to your interests.",
      image:
        "https://public.readdy.ai/ai/img_res/e4e3dce6013e68f999ad1b10d2bbb542.jpg",
      icon: "fas fa-seedling",
    },
    {
      title: "See Your Positive Impact",
      description:
        "Track your progress with live updates, view carbon credits earned, and celebrate milestones in your sustainability journey.",
      image:
        "https://public.readdy.ai/ai/img_res/4fecc3a1bae14359b3058538f439cc6a.jpg",
      icon: "fa-globe",
    },
  ];

  const highlights = [
    "Monitoring and reporting of environmental impact",
    "Transparent and verified carbon offsetting",
    "Direct connection with local environmental projects",
    "Regular updates and progress reports from project sites",
  ];

  return (
    <div className="container mx-auto px-4 sm:px-6 md:px-8 py-16 sm:py-20 md:py-24 bg-gradient-to-b from-white to-green-50">
      <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-12 sm:mb-16 text-center">
        How Our Platform Works
      </h2>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12">
        {features.map((item, index) => (
          <FeatureCard
            key={index}
            item={item}
            index={index}
            scrollY={scrollY}
          />
        ))}
      </div>

      {/* Overview Section */}
      <div className="mt-16 sm:mt-24 bg-white rounded-2xl shadow-xl p-6 sm:p-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          <div className="relative">
            <img
              src="https://public.readdy.ai/ai/img_res/975bf8b5f40b88f0fa7ac03df5feae26.jpg"
              alt="Platform Overview"
              className="rounded-xl shadow-lg w-full h-auto"
            />
            <div className="absolute -bottom-4 sm:-bottom-6 -right-4 sm:-right-6 bg-green-500 text-white p-4 sm:p-6 rounded-xl shadow-lg">
              <div className="text-xl sm:text-3xl font-bold mb-1">100%</div>
              <div className="text-xs sm:text-sm opacity-90">
                Verified Projects
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-6">
              Transparent & Verified Carbon Compensation
            </h3>

            <div className="space-y-3 sm:space-y-4">
              {highlights.map((point, index) => (
                <Highlight key={index} text={point} />
              ))}
            </div>

            <button className="mt-6 sm:mt-8 bg-green-500 hover:bg-green-600 text-white px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center group">
              <Link to="/project">Start Compensating</Link>
              <i className="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Feature Card Component
const FeatureCard: React.FC<{ item: any; index: number; scrollY: number }> = ({
  item,
  index,
  scrollY,
}) => (
  <div
    className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 transform transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
    style={{
      opacity: scrollY > 1200 ? 1 : 0,
      transform: `translateY(${scrollY > 1200 ? "0" : "20px"})`,
      transition: "all 0.6s ease-out",
      transitionDelay: `${index * 0.2}s`,
    }}
  >
    <div className="h-40 sm:h-48 rounded-xl overflow-hidden mb-4 sm:mb-6">
      <img
        src={item.image}
        alt={item.title}
        className="w-full h-full object-cover transform transition-transform duration-700 hover:scale-110"
      />
    </div>
    <div className="flex items-center mb-3 sm:mb-4">
      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">
        <i className={`fas ${item.icon} text-lg sm:text-xl`}></i>
      </div>
      <h3 className="text-lg sm:text-xl font-bold text-gray-800 ml-3 sm:ml-4">
        {item.title}
      </h3>
    </div>
    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
      {item.description}
    </p>
    {/* <div className="mt-4 sm:mt-6 flex items-center text-green-600 font-semibold cursor-pointer group">
            <span className="text-sm sm:text-base">Learn more</span>
            <i className="fas fa-arrow-right ml-2 transform transition-transform group-hover:translate-x-2"></i>
        </div> */}
  </div>
);

// Highlight Item Component
const Highlight: React.FC<{ text: string }> = ({ text }) => (
  <div className="flex items-start">
    <div className="w-5 h-5 sm:w-6 sm:h-6 bg-green-100 rounded-full flex items-center justify-center mt-1">
      <i className="fas fa-check text-green-600 text-xs sm:text-sm"></i>
    </div>
    <p className="ml-3 sm:ml-4 text-sm sm:text-base text-gray-600">{text}</p>
  </div>
);

export default AboutPlatform;
