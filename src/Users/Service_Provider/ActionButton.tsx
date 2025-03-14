import React from "react";

interface ActionButtonsProps {
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ActionButton: React.FC<ActionButtonsProps> = ({ setIsModalOpen }) => {
    // Function for ripple effect on button click
    const handleDownloadClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const ripple = document.createElement("span");
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        ripple.className = "absolute rounded-full bg-white/30 animate-ripple";
        e.currentTarget.appendChild(ripple);
        setTimeout(() => ripple.remove(), 1000);
    };

    // Function to trigger modal opening with scale effect
    const handleProvideServiceClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        const button = e.currentTarget;
        button.classList.add("scale-effect");
        setTimeout(() => {
            button.classList.remove("scale-effect");
            setIsModalOpen(true);
        }, 200);
    };

    return (
        <div className="flex flex-col sm:flex-row justify-between mb-8 gap-4">
            {/* Download Report Button */}
            <button
                className="!rounded-button relative overflow-hidden bg-gradient-to-r from-[#1976D2] to-[#1565C0] text-white px-8 py-4 flex items-center gap-3 hover:translate-y-[-2px] hover:shadow-lg hover:from-[#1565C0] hover:to-[#0D47A1] transition-all duration-300 group"
                onClick={handleDownloadClick}
            >
                <i className="fas fa-download transform group-hover:rotate-12 transition-transform duration-300"></i>
                <span className="font-semibold whitespace-nowrap">
                    Download Project Report
                </span>
            </button>

            {/* Provide Service Button */}
            <button
                onClick={handleProvideServiceClick}
                className="!rounded-button relative overflow-hidden bg-gradient-to-r from-[#2E7D32] to-[#1B5E20] text-white px-8 py-4 flex items-center gap-3 hover:translate-y-[-2px] hover:shadow-lg hover:from-[#1B5E20] hover:to-[#0A3D0A] transition-all duration-300 group animate-glow"
            >
                <i className="fas fa-plus transform group-hover:rotate-90 transition-transform duration-300 animate-pulse"></i>
                <span className="font-semibold whitespace-nowrap">Provide Service</span>
            </button>

            {/* Styles for animations */}
            <style>{`
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
        .animate-glow {
          animation: glow 2s infinite;
        }
        @keyframes glow {
          0%, 100% {
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
          0% { transform: scale(1); }
          50% { transform: scale(0.95); }
          100% { transform: scale(1); }
        }
      `}</style>
        </div>
    );
};

export default ActionButton;
