// import React from "react";
// import html2canvas from "html2canvas";


// interface ActionButtonsProps {
//   setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
// }



// const ActionButton: React.FC<ActionButtonsProps> = ({ setIsModalOpen }) => {
//   // Function to take a screenshot and download it
//   const handleDownloadClick = async (
//     e: React.MouseEvent<HTMLButtonElement>
//   ) => {
//     // Ripple effect
//     const rect = e.currentTarget.getBoundingClientRect();
//     const x = e.clientX - rect.left;
//     const y = e.clientY - rect.top;
//     const ripple = document.createElement("span");
//     ripple.style.left = `${x}px`;
//     ripple.style.top = `${y}px`;
//     ripple.className = "absolute rounded-full bg-white/30 animate-ripple";
//     e.currentTarget.appendChild(ripple);
//     setTimeout(() => ripple.remove(), 1000);

//     // Screenshot
//     // const canvas = await html2canvas(document.getElementsByClassName("/stats-section")); // Change to specific element if needed
//     const element = document.getElementsByClassName("stats-section")[0];
// const canvas = await html2canvas(element);

//     const image = canvas.toDataURL("image/png");
//     const link = document.createElement("a");
//     link.href = image;
//     link.download = "statistics.png";
//     link.click();
//   };

//   // Function to trigger modal opening with scale effect
//   const handleProvideServiceClick = (
//     e: React.MouseEvent<HTMLButtonElement>
//   ) => {
//     const button = e.currentTarget;
//     button.classList.add("scale-effect");
//     setTimeout(() => {
//       button.classList.remove("scale-effect");
//       setIsModalOpen(true);
//     }, 200);
//   };

//   return (
//     <div className="flex flex-col sm:flex-row justify-between mb-8 gap-4">
//       {/* Download Report Button */}
//       <button
//         className="!rounded-button relative overflow-hidden bg-gradient-to-r from-[#1976D2] to-[#1565C0] text-white px-8 py-4 flex items-center gap-3 hover:translate-y-[-2px] hover:shadow-lg hover:from-[#1565C0] hover:to-[#0D47A1] transition-all duration-300 group"
//         onClick={handleDownloadClick}
//       >
//         <i className="fas fa-download transform group-hover:rotate-12 transition-transform duration-300"></i>
//         <span className="font-semibold whitespace-nowrap">
//           Download Project Report
//         </span>
//       </button>

//       {/* Provide Service Button */}
//       <button
//         onClick={handleProvideServiceClick}
//         className="!rounded-button relative overflow-hidden bg-gradient-to-r from-[#2E7D32] to-[#1B5E20] text-white px-8 py-4 flex items-center gap-3 hover:translate-y-[-2px] hover:shadow-lg hover:from-[#1B5E20] hover:to-[#0A3D0A] transition-all duration-300 group animate-glow"
//       >
//         <i className="fas fa-plus transform group-hover:rotate-90 transition-transform duration-300 animate-pulse"></i>
//         <span className="font-semibold whitespace-nowrap">Provide Service</span>
//       </button>

//       {/* Styles for animations */}
//       <style>{`
//         .animate-ripple {
//           width: 10px;
//           height: 10px;
//           transform: scale(0);
//           animation: ripple 1s linear;
//         }
//         @keyframes ripple {
//           to {
//             transform: scale(40);
//             opacity: 0;
//           }
//         }
//         .animate-glow {
//           animation: glow 2s infinite;
//         }
//         @keyframes glow {
//           0%, 100% {
//             box-shadow: 0 0 5px rgba(34, 197, 94, 0.2);
//           }
//           50% {
//             box-shadow: 0 0 20px rgba(34, 197, 94, 0.4);
//           }
//         }
//         .scale-effect {
//           animation: scale 0.2s ease-in-out;
//         }
//         @keyframes scale {
//           0% { transform: scale(1); }
//           50% { transform: scale(0.95); }
//           100% { transform: scale(1); }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default ActionButton;

import React from "react";
import html2canvas from "html2canvas";

interface ActionButtonsProps {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}


const ActionButton: React.FC<ActionButtonsProps> = ({ setIsModalOpen }) => {
  // Function to take a screenshot and download it
  // const handleDownloadClick = async (
  //   e: React.MouseEvent<HTMLButtonElement>
  // ) => {
  //   // Ripple effect
  //   const rect = e.currentTarget.getBoundingClientRect();
  //   const x = e.clientX - rect.left;
  //   const y = e.clientY - rect.top;
  //   const ripple = document.createElement("span");
  //   ripple.style.left = `${x}px`;
  //   ripple.style.top = `${y}px`;
  //   ripple.className = "absolute rounded-full bg-white/30 animate-ripple";
  //   e.currentTarget.appendChild(ripple);
  //   setTimeout(() => ripple.remove(), 1000);

  //   // Screenshot
  //   const element = document.getElementsByClassName("stats-section")[0] as HTMLElement;
  //   if (!element) {
  //     console.error("Element with class 'stats-section' not found.");
  //     return;
  //   }

  //   const canvas = await html2canvas(element);
  //   const image = canvas.toDataURL("image/png");
  //   const link = document.createElement("a");
  //   link.href = image;
  //   link.download = "statistics.png";
  //   link.click();
  // };

  // In your handleDownloadClick function
const handleDownloadClick = async (
  e: React.MouseEvent<HTMLButtonElement>
) => {
  // Ripple effect (unchanged)
  const rect = e.currentTarget.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const ripple = document.createElement("span");
  ripple.style.left = `${x}px`;
  ripple.style.top = `${y}px`;
  ripple.className = "absolute rounded-full bg-white/30 animate-ripple";
  e.currentTarget.appendChild(ripple);
  setTimeout(() => ripple.remove(), 1000);

  // Disable hover effects
  const elements = Array.from(document.getElementsByClassName("stats-section"));
  elements.forEach((el) => {
    el.classList.add("pointer-events-none", "transform-none");
  });

  // Temporarily replace gradient text with solid color text for screenshot
  document.querySelectorAll(".screenshot-only").forEach((el) => el.classList.remove("hidden"));
  document.querySelectorAll(".screenshot-hide").forEach((el) => el.classList.add("hidden"));

  // Capture all .stats-section elements
  const wrapper = document.createElement("div");
  wrapper.style.background = "white";
  wrapper.style.padding = "20px";
  wrapper.style.display = "flex";
  wrapper.style.flexDirection = "column";
  wrapper.style.gap = "20px";

  // Clone each stats-section and append to wrapper
  elements.forEach((el) => {
    const clone = el.cloneNode(true) as HTMLElement;
    clone.style.margin = "0 auto"; // center it
    wrapper.appendChild(clone);
  });

  // Append wrapper to body temporarily
  document.body.appendChild(wrapper);

  // Screenshot the wrapper
  const canvas = await html2canvas(wrapper, {
    useCORS: true,
    scale: 2,
  });

  // Remove the temporary wrapper
  document.body.removeChild(wrapper);

  // Download the image
  const image = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.href = image;
  link.download = "statistics.png";
  link.click();

  // Revert text back to original gradient after screenshot
  document.querySelectorAll(".screenshot-only").forEach((el) => el.classList.add("hidden"));
  document.querySelectorAll(".screenshot-hide").forEach((el) => el.classList.remove("hidden"));

  // Re-enable hover styles
  elements.forEach((el) => {
    el.classList.remove("pointer-events-none", "transform-none");
  });
};


//  const handleDownloadClick = async (
//   e: React.MouseEvent<HTMLButtonElement>
// ) => {
//   // Ripple effect
//   const rect = e.currentTarget.getBoundingClientRect();
//   const x = e.clientX - rect.left;
//   const y = e.clientY - rect.top;
//   const ripple = document.createElement("span");
//   ripple.style.left = `${x}px`;
//   ripple.style.top = `${y}px`;
//   ripple.className = "absolute rounded-full bg-white/30 animate-ripple";
//   e.currentTarget.appendChild(ripple);
//   setTimeout(() => ripple.remove(), 1000);

//   // Capture all .stats-section elements
//   const elements = Array.from(document.getElementsByClassName("stats-section"));

//   // Create a wrapper to hold all cloned elements
//   const wrapper = document.createElement("div");
//   wrapper.style.background = "white";
//   wrapper.style.padding = "20px";
//   wrapper.style.display = "flex";
//   wrapper.style.flexDirection = "column";
//   wrapper.style.gap = "20px";

//   // Clone each stats-section and append to wrapper
//   elements.forEach((el) => {
//     const clone = el.cloneNode(true) as HTMLElement;
//     clone.style.margin = "0 auto"; // center it
//     wrapper.appendChild(clone);
//   });

//   // Append wrapper to body temporarily
//   document.body.appendChild(wrapper);

//   // Screenshot the wrapper
//   const canvas = await html2canvas(wrapper, {
//     useCORS: true,
//     scale: 2,
//   });

//   // Remove the temporary wrapper
//   document.body.removeChild(wrapper);

//   // Download the image
//   const image = canvas.toDataURL("image/png");
//   const link = document.createElement("a");
//   link.href = image;
//   link.download = "all-statistics.png";
//   link.click();
// };

  

  // Function to trigger modal opening with scale effect
  const handleProvideServiceClick = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
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
