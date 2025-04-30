import React from "react";

interface HeaderProps {
  collegeName: string;
  clgEmail:string;
}

const Header: React.FC<HeaderProps> = ({ collegeName , clgEmail}) => {
  return (
    <header className="py-8">
      <div className="flex justify-between items-center flex-col sm:flex-row gap-4 sm:gap-0">
        <div className="animate-fadeIn text-center sm:text-left">
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
            {collegeName || "Loading..."}
          </h1>
          <p className="text-gray-600 mt-2 text-lg tracking-wide">
            {clgEmail}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-4 w-full sm:w-auto">
          <button className="px-4 py-2 text-sm text-gray-600 bg-white border border-gray-200 !rounded-button whitespace-nowrap hover:bg-gray-50 w-full sm:w-auto">
            <i className="fas fa-download mr-2"></i>Export Data
          </button>
          <button className="px-4 py-2 text-sm text-white bg-blue-600 !rounded-button whitespace-nowrap hover:bg-blue-700 w-full sm:w-auto">
            <i className="fas fa-plus mr-2"></i>New Project
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
