import React, { useState } from "react";

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  dateOfBirth?: string;
  gender?: string;
  college?: string;
  address: string;
  organizationName?: string;
  organizationType?: string;
  collegeName?: string;
  principalName?: string;
  deputyName?: string;
  licenseNumber?: string;
  serviceType?: string;
}

interface ValidationState {
  isValid: boolean;
  message: string;
}

interface FormValidation {
  [key: string]: ValidationState;
}

const Register: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    dateOfBirth: "",
    gender: "",
    address: "",
    college: "",
    organizationName: "",
    organizationType: "",
    collegeName: "",
    principalName: "",
    deputyName: "",
    licenseNumber: "",
    serviceType: "",
  });

  const [validation] = useState<FormValidation>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);

  const roles = [
    {
      id: "participant",
      title: "Participant",
      icon: "fa-user",
      description: "Join as an individual participant",
      bgImage:
        "https://public.readdy.ai/ai/img_res/3107fc536b948261e7b284a139f19fe7.jpg",
    },
    {
      id: "college",
      title: "College",
      icon: "fa-university",
      description: "Register as an educational institution",
      bgImage:
        "https://public.readdy.ai/ai/img_res/73797788cf92429214913353b38b2dc8.jpg",
    },
    {
      id: "provider",
      title: "Service Provider",
      icon: "fa-building",
      description: "Register as a service provider",
      bgImage:
        "https://public.readdy.ai/ai/img_res/ef2d258638c75e806ecee1043adf2c5b.jpg",
    },
  ];

  const collegeOptions = [
    "Harvard University",
    "Stanford University",
    "MIT",
    "Oxford University",
    "Cambridge University",
    "Yale University",
    "Princeton University",
    "Columbia University",
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "confirmPassword") {
      setPasswordMatch(value === formData.password);
    }

    validateField(name, value);
  };

  const validateField = (name: string, value: string) => {
    const newValidation = { ...validation };

    const setValidation = (isValid: boolean, message: string) => {
      newValidation[name] = { isValid, message };
    };

    switch (name) {
      case "email":
        setValidation(
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
          "Please enter a valid email address"
        );
        break;
      case "password":
        setValidation(
          value.length >= 8,
          "Password must be at least 8 characters"
        );
        break;
      case "confirmPassword":
        setValidation(value === formData.password, "Passwords do not match");
        break;
      case "phoneNumber":
        setValidation(
          /^\+?[\d\s-]{10,}$/.test(value),
          "Please enter a valid phone number"
        );
        break;
      default:
        setValidation(value.length > 0, "This field is required");
    }

    // setValidation(newValidation);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let isValid = true;
    const requiredFields = [
      "email",
      "password",
      "firstName",
      "lastName",
      "phoneNumber",
    ];

    requiredFields.forEach((field) => {
      if (!formData[field as keyof FormData]) {
        isValid = false;
        validateField(field, "");
      }
    });

    if (!isValid) {
      setModalMessage("Please fill in all required fields correctly.");
      setIsModalOpen(true);
      return;
    }

    setModalMessage("Account created successfully! Redirecting...");
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Create Your Account
        </h1>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {roles.map((role) => (
            <div
              key={role.id}
              onClick={() => setSelectedRole(role.id)}
              className={`relative cursor-pointer transform transition-all duration-300 hover:scale-105 ${
                selectedRole === role.id
                  ? "ring-2 ring-blue-500 shadow-lg"
                  : "hover:shadow-md"
              }`}
            >
              <div className="h-48 rounded-lg overflow-hidden">
                <img
                  src={role.bgImage}
                  alt={role.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
                  <div className="absolute bottom-0 p-4 text-white">
                    <i className={`fas ${role.icon} text-2xl mb-2`}></i>
                    <h3 className="text-xl font-semibold mb-1">{role.title}</h3>
                    <p className="text-sm opacity-90">{role.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedRole && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.firstName}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.lastName}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mobile Number
                </label>
                <input
                  type="phoneNumber"
                  name="phoneNumber"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300  focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Password Field */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                  {/* Eye Icon for Password */}
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <i
                      className={`fas ${
                        showPassword ? "fa-eye-slash" : "fa-eye"
                      }`}
                    ></i>
                  </button>
                </div>
              </div>

              {/* Confirm Password Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    name="confirmPassword"
                    className={`w-full px-4 py-2 rounded-lg border ${
                      passwordMatch ? "border-gray-300" : "border-red-500"
                    } focus:ring-2 ${
                      passwordMatch
                        ? "focus:ring-blue-500"
                        : "focus:ring-red-500"
                    } focus:border-transparent`}
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                  />
                  {!passwordMatch && (
                    <p className="text-red-500 text-xs mt-1">
                      Passwords do not match
                    </p>
                  )}
                </div>
              </div>
            </div>

            {selectedRole === "participant" && (
              <>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      name="dateOfBirth"
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={formData.dateOfBirth}
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
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
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
                    {collegeOptions.map((college) => (
                      <option key={college} value={college}>
                        {college}
                      </option>
                    ))}
                  </select>
                </div>
              </>
            )}

            {selectedRole === "college" && (
              <>
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
              </>
            )}

            {selectedRole === "provider" && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Organization Name
                  </label>
                  <input
                    type="text"
                    name="organizationName"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.organizationName}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Service Type
                  </label>
                  <input
                    type="text"
                    name="serviceType"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.serviceType}
                    onChange={handleInputChange}
                  />
                </div>
              </>
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300 !rounded-button whitespace-nowrap"
            >
              Create Account
            </button>
          </form>
        )}

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

export default Register;
