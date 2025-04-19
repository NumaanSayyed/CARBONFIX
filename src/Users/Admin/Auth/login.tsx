import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../Helpers/authContext";
// @ts-ignore
import axios from "axios";
// @ts-ignore
import { backend_url } from "../../../backend_route";

interface FormData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  
  // @ts-ignore 

  const { login, profileRoute } = useAuth();

  // @ts-ignore
  const [validationMessages, setValidationMessages] = useState<{
    [key: string]: string;
  }>({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Login immediately after successful registration
      const { email, password } = formData;
      const userType = "admin";

      const route = await login(email, password, userType);
      navigate(route);
    } catch (error: any) {
      if (error.response) {
        alert(error.response.data.error || "Invalid email or password.");
      } else if (error.request) {
        alert("Network error. Please check your connection.");
      } else {
        alert("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-20 px-4">
      <div className="max-w-4xl mt-9 mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Create Admin Account
        </h1>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-6">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-gray-700 font-semibold"
              >
                Email Address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Email Address"
              />
              {validationMessages.email && (
                <p className="text-red-500 text-xs">
                  {validationMessages.email}
                </p>
              )}
            </div>

            {/* Password */}
            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-gray-700 font-semibold"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 pr-10 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Password"
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer text-sm"
                >
                  <i
                    className={`fas ${
                      showPassword ? "fa-eye-slash" : "fa-eye"
                    }`}
                  ></i>
                </span>
              </div>
              {validationMessages.password && (
                <p className="text-red-500 text-xs">
                  {validationMessages.password}
                </p>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full mt-4 text-white py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 bg-emerald-500 hover:bg-emerald-600"
            >
              Sign in
            </button>
          </div>
        </form>
        <p className="text-center mt-2">
          Already have an account?{" "}
          <Link to="/admin/register" className="text-emerald-500">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
