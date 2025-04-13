import React from "react";

interface Program {
  id: number;
  name: string;
  category: string;
  credits: number;
  status: string;
}

interface ProgramsGridProps {
  programs: Program[];
  setSelectedProgram: React.Dispatch<React.SetStateAction<Program | null>>;
  setIsDetailModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Program: React.FC<ProgramsGridProps> = ({
  programs,
  setSelectedProgram,
  setIsDetailModalOpen,
}) => {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Forestation":
        return "fa-tree";
      case "Water":
        return "fa-water";
      case "Soil":
        return "fa-seedling";
      case "re-cycle":
        return "fa-recycle";
      case "Animal":
        return "fa-paw";
      default:
        return "fa-leaf";
    }
  };

  return (
    <div className="grid stats-section grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
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
               
                <p className="text-2xl font-bold relative flex items-center gap-2 group-hover:scale-105 transition-transform duration-300">
  {/* <p className="text-2xl font-bold relative flex items-center gap-2 group-hover:scale-105 transition-transform duration-300"> */}
  <i className="fas fa-leaf text-green-500 group-hover:rotate-12 transition-transform duration-300"></i>
  <span className="screenshot-hide bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">
    {program.credits.toLocaleString()}
  </span>
  <span className="screenshot-only hidden text-green-600">
    {program.credits.toLocaleString()}
  </span>
</p>


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
  );
};

export default Program;