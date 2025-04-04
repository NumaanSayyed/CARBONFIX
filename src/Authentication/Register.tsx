import React, { useState } from "react";
import CommonFields from "./Register/commonFields";
import ParticipantForm from "./Register/participants";
import CollegeForm from "./Register/college";
import ServiceProviderForm from "./Register/serviceProvider";
import axios from "axios";

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
  first_name: string;
  last_name: string;
  phone: string;
  dob?: string;
  gender?: string;
  college?: string;
  address: string;
  org_name?: string;
  org_type?: string; // (needs to change the org_typ to service_type in backend)
  collegeName?: string;
  principalName?: string;
  deputyName?: string;
  licenseNumber?: string;
  // serviceType?: string;
}

interface ValidationState {
  isValid: boolean;
  message: string;
}

interface FormValidation {
  [key: string]: ValidationState;
}

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

const Register: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    confirmPassword: "",
    first_name: "",
    last_name: "",
    phone: "",
    dob: "",
    gender: "",
    address: "",
    college: "",
    org_name: "",
    collegeName: "",
    principalName: "",
    deputyName: "",
    licenseNumber: "",
    // serviceType: "", // service Type in backend it is synced with org_type ( needs to change the org_typ to ser_type in backend )
    org_type: "",
  });

  const [validation, setValidation] = useState<FormValidation>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const validateField = (name: string, value: string) => {
    const newValidation = { ...validation };

    const setValidationState = (isValid: boolean, message: string) => {
      newValidation[name] = { isValid, message };
    };

    switch (name) {
      case "email":
        setValidationState(
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
          "Please enter a valid email address"
        );
        break;
      case "password":
        setValidationState(
          value.length >= 8,
          "Password must be at least 8 characters"
        );
        break;
      case "confirmPassword":
        setValidationState(
          value === formData.password,
          "Passwords do not match"
        );
        break;
      case "phone":
        setValidationState(
          /^\+?[\d\s-]{10,}$/.test(value),
          "Please enter a valid phone number"
        );
        break;
      default:
        setValidationState(value.length > 0, "This field is required");
    }

    setValidation(newValidation);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let isValid = true;
    const requiredFields = [
      "email",
      "password",
      "first_name",
      "last_name",
      "phone",
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

    let endpoint = "";
    if (selectedRole === "participant") {
      endpoint = "http://localhost:5000/participants/register";
    } else if (selectedRole === "college") {
      endpoint = "http://localhost:5000/colleges/register";
    } else if (selectedRole === "provider") {
      endpoint = "http://localhost:5000/serviceProviders/register";
    }

    const { confirmPassword, ...filteredFormData } = formData;
    const cleanedFormData = Object.fromEntries(
      Object.entries(filteredFormData).filter(
        ([_, value]) => value && value.toString().trim().length > 0
      )
    );

    try {
      const response = await axios.post(endpoint, cleanedFormData, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      setModalMessage("Account created successfully! Redirecting...");
      setIsModalOpen(true);

      if (selectedRole === "participant") {
        window.location.href = "/profile";
      } else if (selectedRole === "provider") {
        window.location.href = "/dashboard/service_provider";
      }

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userType", selectedRole);
        localStorage.setItem("user", JSON.stringify(response.data));
      }
    } catch (error: any) {
      if (error.response) {
        setModalMessage(
          error.response.data.error ||
            (error.response.status === 500
              ? "Internal server error. Please try again later."
              : "Something went wrong.")
        );
      } else if (error.request) {
        setModalMessage("Network error. Please check your connection.");
      } else {
        setModalMessage("An unexpected error occurred.");
      }
      setIsModalOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-20 px-4">
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
            {/* Wrap each form section inside a div with space-y-6 */}
            <div className="space-y-6">
              <CommonFields formData={formData} setFormData={setFormData} />

              {selectedRole === "participant" && (
                <ParticipantForm
                  formData={formData}
                  setFormData={setFormData}
                />
              )}

              {selectedRole === "college" && (
                <CollegeForm formData={formData} setFormData={setFormData} />
              )}

              {selectedRole === "provider" && (
                <ServiceProviderForm
                  formData={formData}
                  setFormData={setFormData}
                />
              )}
            </div>

            <button
              type="submit"
              className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
            >
              Create Account
            </button>
          </form>
        )}

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

export default Register;
