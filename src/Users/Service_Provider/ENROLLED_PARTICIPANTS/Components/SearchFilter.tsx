import React from "react";

interface ParticipantSearchFilterProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  showFilterPanel: boolean;
  setShowFilterPanel: (value: boolean) => void;
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;
  selectedFilters: {
    status: string;
    serviceType: string;
    location: string;
    dateRange: string;
  };
  setSelectedFilters: React.Dispatch<
    React.SetStateAction<{
      status: string;
      serviceType: string;
      location: string;
      dateRange: string;
    }>
  >;
}

const SearchFilter: React.FC<ParticipantSearchFilterProps> = ({
  searchTerm,
  setSearchTerm,
  showFilterPanel,
  setShowFilterPanel,
  viewMode,
  setViewMode,
  selectedFilters,
  setSelectedFilters,
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          {/* Search Input */}
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search participants..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
          </div>

          {/* Filter Button */}
          <button
            onClick={() => setShowFilterPanel(!showFilterPanel)}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2 !rounded-button"
          >
            <i className="fas fa-filter"></i>
            Filters
          </button>

          {/* View Mode Selector */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-lg transition-colors !rounded-button ${
                viewMode === "grid"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              <i className="fas fa-th-large"></i>
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-lg transition-colors !rounded-button ${
                viewMode === "list"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              <i className="fas fa-list"></i>
            </button>
          </div>
        </div>

        {/* Filter Panel */}
        {showFilterPanel && (
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div>
              <label>Status</label>
              <select
                value={selectedFilters.status}
                onChange={(e) =>
                  setSelectedFilters((prev) => ({
                    ...prev,
                    status: e.target.value,
                  }))
                }
                className="w-full py-2 px-3 border border-gray-300 rounded-lg"
              >
                <option value="All">All</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
                <option value="Completed">Completed</option>
                <option value="proof-submitted">Proof-Submitted</option>
              </select>
            </div>

            <div>
              <label>Service Type</label>
              <select
                value={selectedFilters.location}
                onChange={(e) =>
                  setSelectedFilters((prev) => ({
                    ...prev,
                    location: e.target.value,
                  }))
                }
                className="w-full py-2 px-3 border border-gray-300 rounded-lg"
              >
                <option value="All">All</option>
                <option value="Forestation">Forestation</option>
                <option value="Water">Water</option>
                <option value="Soil">Soil</option>
                <option value="re-cycle">re-cycle</option>
                <option value="Animal">Animal</option>
              </select>
            </div>

            <div>
              <label>Date Range</label>
              <input
                type="date"
                value={selectedFilters.dateRange}
                onChange={(e) =>
                  setSelectedFilters((prev) => ({
                    ...prev,
                    dateRange: e.target.value,
                  }))
                }
                className="w-full py-2 px-3 border border-gray-300 rounded-lg"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchFilter;
