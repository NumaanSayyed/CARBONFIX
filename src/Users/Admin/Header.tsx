import React from "react";

const Header: React.FC = () => {
  return (
    <header className="mb-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-800 mb-3">
            Welcome, James Anderson! <span className="wave">👋</span>
          </h1>
          <p className="text-lg text-gray-600">Manage & Verify Proofs for Carbon Credit Projects</p>
        </div>
      </div>
    </header>
  );
};

export default Header;