import React from "react";
import { Link } from "react-router-dom";

interface NavigationButtonProps {
  onClick: () => void;
}

const NavigationButton: React.FC<NavigationButtonProps> = ({ onClick }) => {
  // Function to handle button click animation
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;
    button.classList.add("animate-click");
    setTimeout(() => {
      button.classList.remove("animate-click");
      onClick();
    }, 300);
  };

  return (
    <div className="mb-8">
      <button
        className="!rounded-button group bg-white/90 backdrop-blur-sm w-full py-6 px-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-purple-100 relative overflow-hidden"
        onClick={handleClick}
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
            <Link
              to="/dashboard/participant_manage"
              className="text-sm font-medium"
            >
              View Details
            </Link>
            <i className="fas fa-arrow-right"></i>
          </div>
        </div>
      </button>

      {/* Styles for animations */}
      <style>{`
        .animate-click {
          animation: clickEffect 0.3s ease-out;
        }
        @keyframes clickEffect {
          0% { transform: scale(1); }
          50% { transform: scale(0.98); }
          100% { transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

export default NavigationButton;
