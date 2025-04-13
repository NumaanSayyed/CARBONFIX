import React from "react";

interface CollegeFormProps {
  formData: {
    collegeName?: string;
    principalName?: string;
    deputyName?: string;
  };
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}

const CollegeForm: React.FC<CollegeFormProps> = ({ formData, setFormData }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          College Name
        </label>
        <input
          type="text"
          name="collegeName"
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={formData.collegeName}
          onChange={handleInputChange}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Principal Name
          </label>
          <input
            type="text"
            name="principalName"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={formData.principalName}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Deputy Name
          </label>
          <input
            type="text"
            name="deputyName"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={formData.deputyName}
            onChange={handleInputChange}
          />
        </div>
      </div>
    </div>
  );
};

export default CollegeForm;
