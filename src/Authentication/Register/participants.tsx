import React, { useEffect, useState } from "react";
import axios from "axios";
import { backend_url } from "../../backend_route";

interface ParticipantFormProps {
  formData: {
    dob?: string;
    gender?: string;
    college?: string;
  };
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}

const ParticipantForm: React.FC<ParticipantFormProps> = ({
  formData,
  setFormData,
}) => {
  const [collegeOptions, setCollegeOptions] = useState<
    { id: number; college_name: string }[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const response = await axios.get(`${backend_url}/college/college-list`);
        setCollegeOptions(response.data.colleges || []);
      } catch (err: any) {
        console.error("Error fetching colleges:", err.message);
        setError("Failed to load colleges.");
      } finally {
        setLoading(false);
      }
    };

    fetchColleges();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date of Birth
          </label>
          <input
            type="date"
            name="dob"
            max="2009-12-31"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={formData.dob}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Gender
          </label>
          <select
            name="gender"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={formData.gender}
            onChange={handleInputChange}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          College (Optional)
        </label>
        <select
          name="college"
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={formData.college}
          onChange={handleInputChange}
        >
          <option value="">Select College</option>
          {loading ? (
            <option disabled>Loading...</option>
          ) : error ? (
            <option disabled>{error}</option>
          ) : (
            collegeOptions.map((college) => (
              <option key={college.id} value={college.college_name}>
                {college.college_name}
              </option>
            ))
          )}
        </select>
      </div>
    </div>
  );
};

export default ParticipantForm;
