import React, { useState } from "react";
import axios from "axios";
import { backend_url } from "../../backend_route";

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
  otpVerified: boolean;
  setOtpVerified: React.Dispatch<React.SetStateAction<boolean>>;
}

const CommonFields: React.FC<CommonFieldsProps> = ({
  formData,
  setFormData,
  userRole,
  otpVerified,
  setOtpVerified,
}) => {
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(true);

  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpMessage, setOtpMessage] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev: any) => {
      const updatedForm = { ...prev, [name]: value };

      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,15}$/;

      if (name === "password") {
        setIsPasswordValid(passwordRegex.test(value));
      }

      if (name === "confirmPassword" || name === "password") {
        setPasswordMatch(updatedForm.password === updatedForm.confirmPassword);
      }

      return updatedForm;
    });
  };

  const sendOtp = async () => {
    setOtpLoading(true);
    setOtpMessage("");

    const mappedRole =
      userRole === "participant"
        ? "participant"
        : userRole === "provider"
        ? "service_provider"
        : userRole === "college"
        ? "college"
        : userRole;

    try {
      await axios.post(`${backend_url}/email-verification/generate-otp`, {
        email: formData.email,
        role: mappedRole,
      });

      console.log("Humaira sending these in email api user role", mappedRole);
      console.log(
        "Humaira sending these in email api user email",
        formData.email
      );

      setOtpSent(true);
      setOtpMessage("✅ OTP has been sent to your email.");
    } catch {
      setOtpMessage("❌ Failed to send OTP. Please try again.");
    }

    setOtpLoading(false);
  };

  const verifyOtp = async () => {
    try {
      const mappedRole =
        userRole === "participant"
          ? "participant"
          : userRole === "provider"
          ? "service_provider"
          : userRole === "college"
          ? "college"
          : userRole;

      setOtpLoading(true);
      //@ts-ignore
      const res = await axios.post(
        `${backend_url}/email-verification/verify-otp`,
        {
          email: formData.email,
          role: mappedRole,
          otp,
        }
      );
      setOtpVerified(true);
      setOtpMessage("✅ Email verified successfully.");
    } catch (err: any) {
      setOtpMessage(
        err.response?.data?.message || "❌ OTP verification failed."
      );
      setOtpVerified(false);
    } finally {
      setOtpLoading(false);
    }
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
      <div
        className={`grid ${
          userRole === "admin" ? "md:grid-cols" : "md:grid-cols-2"
        } gap-6`}
      >
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
          {!otpSent ? (
            <button
              type="button"
              onClick={sendOtp}
              className={`mt-2 inline-flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium transition-colors duration-300 shadow-md
              ${
                formData.email && !otpLoading
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
              disabled={!formData.email || otpLoading}
            >
              {otpLoading ? (
                <>
                  <svg
                    className="animate-spin h-4 w-4 mr-2 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4l3.5-3.5L12 0v4a8 8 0 11-8 8z"
                    />
                  </svg>
                  Sending...
                </>
              ) : (
                "Send OTP"
              )}
            </button>
          ) : !otpVerified ? (
            <>
              <input
                type="text"
                className="mt-2 w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              <button
                type="button"
                onClick={verifyOtp}
                className={`mt-2 inline-flex items-center px-4 py-2 rounded-md text-sm font-medium text-white bg-green-600 hover:bg-green-700 transition duration-300 shadow`}
                disabled={otpLoading}
              >
                {otpLoading ? (
                  <>
                    <svg
                      className="animate-spin h-4 w-4 mr-2 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4l3.5-3.5L12 0v4a8 8 0 11-8 8z"
                      />
                    </svg>
                    Verifying...
                  </>
                ) : (
                  "Verify OTP"
                )}
              </button>
            </>
          ) : (
            <p className="text-green-600 text-sm mt-2 font-medium">
              ✅ OTP Verified
            </p>
          )}

          {otpMessage && (
            <p
              className={`text-sm mt-1 font-medium ${
                otpMessage.startsWith("✅") ? "text-green-600" : "text-red-500"
              }`}
            >
              {otpMessage}
            </p>
          )}
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
              <i
                className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
              />
            </button>
          </div>
          {!isPasswordValid && (
            <p className="text-red-500 text-xs mt-1">
              8–15 chars, must include uppercase, lowercase, number & special
              character
            </p>
          )}
        </div>

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
