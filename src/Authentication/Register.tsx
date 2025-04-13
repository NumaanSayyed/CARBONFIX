import React, { useState } from "react";
import CommonFields from "./Register/commonFields";
import ParticipantForm from "./Register/participants";
import CollegeForm from "./Register/college";
import ServiceProviderForm from "./Register/serviceProvider";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { backend_url } from "../backend_route";

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
  {
    id: "admin",
    title: "Admin",
    icon: "fa-building",
    description: "Register as a admin",
    bgImage:
      "https://images.unsplash.com/photo-1556157382-97eda2d62296?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
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

  const navigate = useNavigate();

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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
    } else if (selectedRole == "admin") {
      endpoint = `${backend_url}/admin/register`;
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

      const storeWithExpiration = (
        key: string,
        value: any,
        expirationDays: number
      ) => {
        const expirationTime =
          new Date().getTime() + expirationDays * 24 * 60 * 60 * 1000; // Calculate expiration timestamp (in milliseconds)
        const data = {
          value,
          expirationTime,
        };
        localStorage.setItem(key, JSON.stringify(data));
      };

      if (response.data.token) {
        storeWithExpiration("token", response.data.token, 7);
      }

      if (selectedRole === "participant") {
        storeWithExpiration("userType", "Participant", 7);
        storeWithExpiration(
          "user",
          JSON.stringify(response.data.participant),
          7
        );
        console.log("regiered and now navigating to profile");
        navigate("/profile");
      } else if (selectedRole === "provider") {
        storeWithExpiration("userType", "Service Provider", 7);
        storeWithExpiration(
          "user",
          JSON.stringify(response.data.serviceProvider),
          7
        );
        navigate("/dashboard/service_provider");
      } else if (selectedRole == "admin") {
        storeWithExpiration("userType", "admin", 7);
        navigate("/admin");
        // window.location.href = "/admin";
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

        <div className="grid md:grid-cols-4 gap-6 mb-12">
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
            <div className="space-y-6">
              <CommonFields
                formData={formData}
                userRole={selectedRole}
                setFormData={setFormData}
              />

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
