import React from "react";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
            <div className="bg-white rounded-xl w-full max-w-[600px] mx-auto shadow-lg transform transition-all duration-300 max-h-[80vh] overflow-hidden">
                {/* Modal Header */}
                <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-gray-800">Add New Service</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <i className="fas fa-times text-xl"></i>
                    </button>
                </div>

                {/* Scrollable Modal Content */}
                <div className="p-6 overflow-y-auto max-h-[70vh]">{children}</div>
            </div>
        </div>
    );
};

export default Modal;
