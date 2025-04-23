import React from "react";

interface ServiceProviderFormProps {
  formData: {
    org_name?: string;
    org_type?: string[];
  };
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}

const serviceOptions = ["Forest", "Water", "Soil", "Animal", "Recycle"];

const ServiceProviderForm: React.FC<ServiceProviderFormProps> = ({
  formData,
  setFormData,
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (value: string) => {
    setFormData((prev: any) => {
      const current = prev.org_type || [];
      const isSelected = current.includes(value);

      const updated = isSelected
        ? current.filter((item: string) => item !== value)
        : [...current, value];

      return { ...prev, org_type: updated };
    });
  };

  return (
    <div className="space-y-6">
      {/* Organization Name */}
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

      {/* Service Type */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Service Type (Select all that apply)
        </label>
        <div className="flex flex-wrap gap-4">
          {serviceOptions.map((option) => (
            <label key={option} className="flex items-center space-x-2">
              <input
                type="checkbox"
                value={option}
                checked={formData.org_type?.includes(option) || false}
                onChange={() => handleCheckboxChange(option)}
                className="rounded text-blue-500 focus:ring-blue-400"
              />
              <span className="text-gray-700 text-sm">{option}</span>
            </label>
          ))}
        </div>
      </div>
    </div> // 👈 This was missing!
  );
};

export default ServiceProviderForm;
