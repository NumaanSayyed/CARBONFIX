import React from "react";

interface ParticipantSearchFilterProps {
    searchTerm: string;
    setSearchTerm: (value: string) => void;
    showFilterPanel: boolean;
    setShowFilterPanel: (value: boolean) => void;
    viewMode: "grid" | "list";
    setViewMode: (mode: "grid" | "list") => void;
}

const SearchFilter: React.FC<ParticipantSearchFilterProps> = ({
    searchTerm,
    setSearchTerm,
    showFilterPanel,
    setShowFilterPanel,
    viewMode,
    setViewMode,
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

                    {/* View Mode Toggle */}
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setViewMode("grid")}
                            className={`p-2 rounded-lg transition-colors !rounded-button ${viewMode === "grid"
                                    ? "bg-blue-500 text-white"
                                    : "bg-gray-100 text-gray-700"
                                }`}
                        >
                            <i className="fas fa-th-large"></i>
                        </button>
                        <button
                            onClick={() => setViewMode("list")}
                            className={`p-2 rounded-lg transition-colors !rounded-button ${viewMode === "list"
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
                    <div className="mt-4 p-4 border-t border-gray-200">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {/* Status Filter */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Status
                                </label>
                                <select className="w-full p-2 border border-gray-300 rounded-lg">
                                    <option>All</option>
                                    <option>Active</option>
                                    <option>Pending</option>
                                    <option>Inactive</option>
                                </select>
                            </div>

                            {/* Service Type Filter */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Service Type
                                </label>
                                <select className="w-full p-2 border border-gray-300 rounded-lg">
                                    <option>All</option>
                                    <option>Physical Therapy</option>
                                    <option>Occupational Therapy</option>
                                    <option>Speech Therapy</option>
                                </select>
                            </div>

                            {/* Location Filter */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Location
                                </label>
                                <select className="w-full p-2 border border-gray-300 rounded-lg">
                                    <option>All</option>
                                    <option>New York</option>
                                    <option>Los Angeles</option>
                                    <option>Chicago</option>
                                </select>
                            </div>

                            {/* Date Range Filter */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Date Range
                                </label>
                                <input
                                    type="date"
                                    className="w-full p-2 border border-gray-300 rounded-lg"
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchFilter;
