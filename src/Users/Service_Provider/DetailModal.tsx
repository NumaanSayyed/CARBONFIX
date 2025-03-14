import React from "react";

interface Program {
    id: number;
    name: string;
    category: string;
    credits: number;
    status: string;
}

interface DetailModalProps {
    isOpen: boolean;
    program: Program | null;
    onClose: () => void;
}

const DetailModal: React.FC<DetailModalProps> = ({ isOpen, program, onClose }) => {
    if (!isOpen || !program) return null;

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
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
            <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6 sm:p-8 w-full max-w-2xl mx-4 animate-scaleIn shadow-2xl border border-white/50">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">Program Details</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors duration-300"
                    >
                        <i className="fas fa-times"></i>
                    </button>
                </div>

                <div className="space-y-6">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center shadow-lg">
                            <i className={`fas ${getCategoryIcon(program.category)} text-3xl text-green-600`}></i>
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-gray-800">{program.name}</h3>
                            <p className="text-gray-600">{program.category}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="bg-gray-50 rounded-lg p-4">
                            <p className="text-sm text-gray-600 mb-1">Status</p>
                            <p className="text-lg font-semibold text-gray-800">{program.status}</p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4">
                            <p className="text-sm text-gray-600 mb-1">Carbon Credits</p>
                            <p className="text-lg font-semibold text-gray-800">{program.credits.toLocaleString()}</p>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <h4 className="font-semibold text-gray-800">Program Timeline</h4>
                        <div className="relative pl-8 pb-8 border-l-2 border-green-200">
                            <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-green-500"></div>
                            <p className="text-sm text-gray-600">Program Started</p>
                            <p className="text-gray-800">March 1, 2025</p>
                        </div>
                       
                        <div className="relative pl-8">
                            <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-green-500"></div>
                            <p className="text-sm text-gray-600">Estimated Completion</p>
                            <p className="text-gray-800">December 1, 2025</p>
                        </div>
                    </div>

                    {/* <button className="!rounded-button w-full bg-green-600 text-white py-3 flex items-center justify-center gap-2 hover:bg-green-700 transition-colors duration-300">
                        <i className="fas fa-chart-line"></i>
                        View Detailed Analytics
                    </button> */}
                </div>
            </div>
        </div>
    );
};

export default DetailModal;
