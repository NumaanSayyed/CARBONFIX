import React, { useState } from "react";
import CommonFields from "./Register/commonFields";
import ParticipantForm from "./Register/participants";
import CollegeForm from "./Register/college";
import ServiceProviderForm from "./Register/serviceProvider";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { backend_url } from "../backend_route";
import { useAuth } from "../Helpers/authContext";

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
  org_type?: string[];
  collegeName?: string;
  principalName?: string;
  deputyName?: string;
  licenseNumber?: string;
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
  }
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
    org_name: "",
    org_type: [],
    collegeName: "",
    principalName: "",
    deputyName: "",
    licenseNumber: "",
  });

  const [validation, setValidation] = useState<FormValidation>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  //@ts-ignore
  const [disclaimerAccepted, setDisclaimerAccepted] = useState(false); // Track if user accepted the disclaimer
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false); // Modal to show disclaimer
  const navigate = useNavigate();
  const { login } = useAuth();

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
        if (selectedRole !== "admin") {
          setValidationState(
            /^\+?[\d\s-]{10,}$/.test(value),
            "Please enter a valid phone number"
          );
        } else {
          setValidationState(true, "");
        }
        break;
      default:
        setValidationState(value.length > 0, "This field is required");
    }

    setValidation(newValidation);
  };

  const submitRegistration = async () => {
    let isValid = true;
    const requiredFields = ["email", "password", "first_name", "last_name"];

    if (selectedRole !== "admin") {
      requiredFields.push("phone");
    }

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
      endpoint = `${backend_url}/participants/register`;
    } else if (selectedRole === "college") {
      endpoint = `${backend_url}/colleges/register`;
    } else if (selectedRole === "provider") {
      endpoint = `${backend_url}/serviceProviders/register`;
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

      if (response.data.token) {
        const formattedRole =
          selectedRole === "participant"
            ? "Participant"
            : selectedRole === "provider"
            ? "Service Provider"
            : selectedRole === "college"
            ? "College"
            : "admin";

        const route = await login(formData.email, formData.password, formattedRole);
        navigate(route);
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

  const handleDisclaimerAccept = () => {
    setDisclaimerAccepted(true);
    setIsInfoModalOpen(false);
    submitRegistration(); // Proceed with form submission after accepting the disclaimer
  };

  const handleDisclaimerReject = () => {
    setDisclaimerAccepted(false);
    setIsInfoModalOpen(false); // Don't proceed with the registration
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-20 px-3">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Create Your Account
        </h1>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {roles.map((role) => (
            <div
              key={role.id}
              onClick={() => {
                setSelectedRole(role.id);
              }}
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

        <button className="border border-gray-500 px-6 py-3 rounded-md text-white bg-green-600 hover:bg-green-700 transition-all"
        onClick={() =>
          navigate("/admin/login")
        }
        >Admin Login</button>

        {selectedRole && (
          <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
            <CommonFields
              formData={formData}
              userRole={selectedRole}
              setFormData={setFormData}
            />
            {selectedRole === "participant" && (
              <ParticipantForm formData={formData} setFormData={setFormData} />
            )}
            {selectedRole === "college" && (
              <CollegeForm formData={formData} setFormData={setFormData} />
            )}
            {selectedRole === "provider" && (
              <ServiceProviderForm formData={formData} setFormData={setFormData} />
            )}

            <button
              type="submit"
              onClick={ () =>
                selectedRole == "participant" ? 
                 setIsInfoModalOpen(true) : submitRegistration()
              }
              className="w-full bg-blue-500 text-white font-semibold py-3 rounded-lg"
            >
              Register
            </button>
          </form>
        )}

        {/* Disclaimer Modal */}
        {isInfoModalOpen && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-60 flex justify-center items-center transition-opacity">
            <div className="bg-gradient-to-br mr-2 ml-2 from-indigo-600 to-blue-600 p-8 rounded-xl max-w-lg w-full shadow-2xl">
              <h3 className="text-2xl font-bold text-white mb-4">Heads Up! 🚨</h3>
              <p className="text-white text-lg mb-6">
                This event is virtual. The credit you earn is virtual and not physical—there are no tangible rewards or benefits. But hey, you still get to be part of something cool!
              </p>
              <div className="flex justify-center gap-6">
                <button
                  onClick={handleDisclaimerAccept}
                  className="bg-blue-500 text-white py-2 px-6 rounded-lg text-lg font-semibold transition-all hover:bg-blue-600"
                >
                  I Agree 👍
                </button>
                <button
                  onClick={handleDisclaimerReject}
                  className="bg-gray-400 text-white py-2 px-6 rounded-lg text-lg font-semibold hover:bg-gray-500"
                >
                  Disagree 👎
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal for Form Status */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg max-w-sm mx-auto">
              <p>{modalMessage}</p>
              <button
                onClick={() => setIsModalOpen(false)}
                className="mt-4 w-full bg-blue-500 text-white font-semibold py-2 rounded-lg"
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
