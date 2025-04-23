import React, { useState } from "react";

interface CommonFieldsProps {
  formData: {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
  };
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  userRole: string;
}

const CommonFields: React.FC<CommonFieldsProps> = ({
  formData,
  setFormData,
  userRole,
}) => {
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(true);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev: any) => {
      const updatedForm = { ...prev, [name]: value };

      // ✅ Password must be 8-15 chars with upper, lower, number, special
      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,15}$/;

      if (name === "password") {
        setIsPasswordValid(passwordRegex.test(value));
      }

      if (name === "confirmPassword" || name === "password") {
        setPasswordMatch(
          updatedForm.password === updatedForm.confirmPassword
        );
      }

      return updatedForm;
    });
  };

  return (
    <div className="space-y-6">
      {/* Name Fields */}
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            First Name
          </label>
          <input
            type="text"
            name="first_name"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={formData.first_name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Last Name
          </label>
          <input
            type="text"
            name="last_name"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={formData.last_name}
            onChange={handleInputChange}
          />
        </div>
      </div>

      {/* Email & Phone Fields */}
      <div className={`grid ${userRole === "admin" ? "md:grid-cols" : "md:grid-cols-2"} gap-6`}>
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
        {userRole === "admin" ? (
          <div></div>
        ) : (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mobile Number
            </label>
            <input
              type="tel"
              name="phone"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={formData.phone}
              onChange={handleInputChange}
            />
          </div>
        )}
      </div>

      {/* Password Fields */}
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
              className={`w-full px-4 py-2 rounded-lg border ${
                isPasswordValid ? "border-gray-300" : "border-red-500"
              } focus:ring-2 ${
                isPasswordValid ? "focus:ring-blue-500" : "focus:ring-red-500"
              } focus:border-transparent`}
              value={formData.password}
              onChange={handleInputChange}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              <i className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`} />
            </button>
          </div>
          {!isPasswordValid && (
            <p className="text-red-500 text-xs mt-1">
              8–15 chars, must include uppercase, lowercase, number & special character
            </p>
          )}
        </div>

        {/* Confirm Password Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            className={`w-full px-4 py-2 rounded-lg border ${
              passwordMatch ? "border-gray-300" : "border-red-500"
            } focus:ring-2 ${
              passwordMatch ? "focus:ring-blue-500" : "focus:ring-red-500"
            } focus:border-transparent`}
            value={formData.confirmPassword}
            onChange={handleInputChange}
          />
          {!passwordMatch && (
            <p className="text-red-500 text-xs mt-1">Passwords do not match</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommonFields;
