import React, { useState } from "react";
import Header from "./Header";
import ActionButton from "./ActionButton";
import NavigationButton from "./NavigationButton";
import ProgramsGrid from "./Program";
import DetailModal from "./DetailModal";
import Modal from "./Modal";

const Dashboard: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<any>(null);
const [programs, ] = useState([
    { id: 1, name: "Forest Restoration Initiative", category: "Forestation", credits: 2500, status: "Active" },
    { id: 2, name: "Clean Water Conservation", category: "Water", credits: 1800, status: "Pending" },
    { id: 3, name: "Soil Enrichment Program", category: "Soil", credits: 3200, status: "Completed" },
    { id: 4, name: "Wildlife Protection Drive", category: "Animal", credits: 1500, status: "Pending" },  // 
    { id: 5, name: "E-Waste Recycling Initiative", category: "E-Waste", credits: 2800, status: "Completed" } 
  ]);

  // Form States
  const [selectedCategory, setSelectedCategory] = useState("");
  const [programName, setProgramName] = useState("");
  const [carbonCredits, setCarbonCredits] = useState("");
  const [remarks, setRemarks] = useState("");
  const [startDate, setStartDate] = useState("");
  const [completionDate, setCompletionDate] = useState("");

  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      programName,
      selectedCategory,
      carbonCredits,
      remarks,
    });
    setIsModalOpen(false);
  };

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-br from-green-50 to-blue-50 font-['SF Pro Text']">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 transition-all duration-300">
        {/* Header Section */}
        <Header />

        {/* Action Buttons */}
        <ActionButton setIsModalOpen={setIsModalOpen} />

        {/* Navigation Button */}
        <NavigationButton onClick={() => console.log("Navigating to Enrolled Participants...")} />

        {/* Programs Grid */}
        <ProgramsGrid programs={programs} setSelectedProgram={setSelectedProgram} setIsDetailModalOpen={setIsDetailModalOpen} />

        {/* Detail Modal */}
        <DetailModal isOpen={isDetailModalOpen} program={selectedProgram} onClose={() => setIsDetailModalOpen(false)} />

        {/* Add New Service Modal */}
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Service Category */}
            <div>
              <label className="block text-gray-700 mb-2 font-medium">Service Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
                required
              >
                <option value="">Select Category</option>
                <option value="Forestation">Forestation</option>
                <option value="Water">Water</option>
                <option value="Soil">Soil</option>
                <option value="E-Waste">E-Waste</option>
                <option value="Animal">Animal</option>
              </select>
            </div>

            {/* Program Name */}
            <div>
              <label className="block text-gray-700 mb-2 font-medium">Program Name</label>
              <input
                type="text"
                value={programName}
                onChange={(e) => setProgramName(e.target.value)}
                className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
                required
              />
            </div>

            {/* Carbon Credits */}
            <div>
              <label className="block text-gray-700 mb-2 font-medium">Carbon Credits</label>
              <input
                type="number"
                value={carbonCredits}
                onChange={(e) => setCarbonCredits(e.target.value)}
                className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
                required
              />
            </div>

            {/* Program Start Date */}
            <div>
              <label className="block text-gray-700 mb-2 font-medium">Program Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
                required
              />
            </div>

            {/* Estimated Completion Date */}
            <div>
              <label className="block text-gray-700 mb-2 font-medium">Estimated Completion Date</label>
              <input
                type="date"
                value={completionDate}
                onChange={(e) => setCompletionDate(e.target.value)}
                className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
                required
              />
            </div>

            {/* Remarks */}
            <div>
              <label className="block text-gray-700 mb-2 font-medium">Remarks</label>
              <textarea
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 resize-none"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 transition-all duration-300"
            >
              Add Service
            </button>
          </form>
        </Modal>

      </div>
    </div>
  );
};

export default Dashboard;
