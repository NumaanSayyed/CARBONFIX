import React from "react";

const Header: React.FC = () => {
  return (
    <header className="py-8">
      <div className="flex justify-between items-center">
        <div className="animate-fadeIn">
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
            Stanford University
          </h1>
          <p className="text-gray-600 mt-2 text-lg tracking-wide">
            sustainability@stanford.edu
          </p>
        </div>

        <div className="flex items-center gap-4">
          <button className="px-4 py-2 text-sm text-gray-600 bg-white border border-gray-200 !rounded-button whitespace-nowrap hover:bg-gray-50">
            <i className="fas fa-download mr-2"></i>Export Data
          </button>
          <button className="px-4 py-2 text-sm text-white bg-blue-600 !rounded-button whitespace-nowrap hover:bg-blue-700">
            <i className="fas fa-plus mr-2"></i>New Project
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
