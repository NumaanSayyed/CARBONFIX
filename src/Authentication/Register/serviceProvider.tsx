import React from "react";

interface ServiceProviderFormProps {
  formData: {
    org_name?: string;
    org_type?: string;
  };
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}

const ServiceProviderForm: React.FC<ServiceProviderFormProps> = ({
  formData,
  setFormData,
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Organization Name
        </label>
        <input
          type="text"
          name="org_name"
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={formData.org_name}
          onChange={handleInputChange}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Service Type
        </label>
        <input
          type="text"
          name="org_type"
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={formData.org_type}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
};

export default ServiceProviderForm;
