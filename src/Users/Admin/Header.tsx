import React from "react";

const Header: React.FC = () => {
  return (
    <header className="mb-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-800 mb-3">
            Welcome, James Anderson! <span className="wave">👋</span>
          </h1>
          <p className="text-lg text-gray-600">Manage & Verify Proofs for Carbon Credit Programs</p>
        </div>
        <div className="flex items-center gap-4">
          <button className="!rounded-button bg-white border border-gray-200 px-4 py-2 flex items-center gap-2 hover:bg-gray-50">
            <i className="fas fa-bell text-gray-600"></i> <span className="text-sm font-medium">Notifications</span>
          </button>
          <button className="!rounded-button bg-emerald-500 text-white px-4 py-2 flex items-center gap-2 hover:bg-emerald-600">
            <i className="fas fa-plus"></i> <span className="text-sm font-medium">New Verification</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
