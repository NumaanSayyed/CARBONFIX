import React, { useState, useEffect } from "react";
import axios from "axios";

interface Program {
  id: number;
  name: string;
  category: string;
  credits: number;
  status: string;
  start_date: string;
  end_date: string;
  remark: string;
}

interface EditModalProps {
  isOpen: boolean;
  program: Program | null;
  onClose: () => void;
  onUpdate: (updatedProgram: Program) => void;
}

const EditModal: React.FC<EditModalProps> = ({ isOpen, program, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    project_name: "",
    project_category: "",
    carbon_credits: 0,
    status: "",
    start_date: "",
    end_date: "",
    remark: ""
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const getWithExpirationCheck = (key: string) => {
    const dataString = localStorage.getItem(key);
    if (!dataString) return null;
  
    const data = JSON.parse(dataString);
    const currentTime = new Date().getTime();
  
    if (currentTime > data.expirationTime) {
      localStorage.removeItem(key); // Remove expired item
      return null; // Item expired
    }
  
    return data.value; // Item is still valid
  };

  // Populate form when modal opens
  useEffect(() => {
    if (program) {
      setFormData({
        project_name: program.name,
        project_category: program.category,
        carbon_credits: program.credits,
        status: program.status,
        start_date: program.start_date,
        end_date: program.end_date,
        remark : program.remark,
      });
    }
  }, [program]);

  console.log("hmaira this is program remark",program?.remark);

  if (!isOpen || !program) return null; // Prevent rendering if no data

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    onClose();
    e.preventDefault();
  
    const { status, ...dataToSend } = formData;
  
    try {
      const response = await axios.put(
        `https://carbonfix-backend-5y3e.onrender.com/serviceProviders/projects/${program.id}`,
        dataToSend,
        {
          headers: {
            Authorization: `Bearer ${getWithExpirationCheck("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
  
      setModalMessage("Project updated successfully!");
      setIsModalOpen(true);
      
      onUpdate(response.data);
      
      onClose();
      console.log("Before calling onClose()");
      onClose();
      console.log("After calling onClose()");
      

    } catch (error) {
      console.error("Error updating project:", error);
      setModalMessage("Failed to update project.");
      setIsModalOpen(true);
    }
  };

  const formatStandardDate = (dateString: string) => {
    return new Date(dateString).toISOString().split("T")[0];
  };

  
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4">Edit Project</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Project Name</label>
            <input
              type="text"
              name="project_name"
              value={formData.project_name}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700">Category</label>
            <select
              name="project_category"
              value={formData.project_category}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
              required
            >
              <option value="Forestation">Forestation</option>
              <option value="Water">Water</option>
              <option value="Soil">Soil</option>
              <option value="re-cycle">Recycle</option>
              <option value="Animal">Animal</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700">Carbon Credits</label>
            <input
              type="number"
              name="carbon_credits"
              value={formData.carbon_credits}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700">Status</label>
            <input
              type="text"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700">Start Date</label>
            <input
              type="date"
              name="start_date"
              value={formatStandardDate(program.start_date)}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700">End Date</label>
            <input
              type="date"
              name="end_date"
              value={formatStandardDate(program.end_date)}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 ">Remark</label>
            <input
            type="text"
            name="remark"
            value={formData.remark}
            onChange={handleChange}
            className="w-full border rounded-lg pt-2"
            required
            />
          </div>

          <div className="flex justify-between">
            <button type="submit" className="bg-green-700 text-white px-4 py-2 rounded-lg">
              Save Changes
            </button>
            <button onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded-lg">
              Cancel
            </button>
          </div>
        </form>

         {/* Modal */}
         {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
              <p className="text-center text-gray-800 mb-4">{modalMessage}</p>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300 !rounded-button whitespace-nowrap"
              >
                Close
              </button>
            </div>
          </div>
        )}
        
      </div>
    </div>
  );
};

export default EditModal;
