import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Helpers/authContext";
import axios from "axios";
import { backend_url } from "../backend_route";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotRole, setForgotRole] = useState("participant");
  const [forgotOtp, setForgotOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);
  const [userType, setUserType] = useState("Participant");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const navigate = useNavigate();
  // @ts-ignore
  const { login, profileRoute } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const route = await login(email, password, userType);
      navigate(route); // 👈 Navigate after login
    } catch (error: any) {
      if (error.response) {
        setModalMessage(
          error.response.data.error || "Invalid email or password."
        );
      } else if (error.request) {
        setModalMessage("Network error. Please check your connection.");
      } else {
        setModalMessage("An unexpected error occurred.");
      }
      setIsModalOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const sendResetOTP = async () => {
    try {
      setLoading(true);
      console.log("genereate email : ", forgotEmail);
      console.log("generate role : ", forgotRole);

      //@ts-ignore
      const res = await axios.post(
        `${backend_url}/password-reset/generate-otp`,
        {
          email: forgotEmail,
          role: forgotRole,
        }
      );

      console.log("genereate email : ", forgotEmail);
      console.log("generate role : ", forgotRole);

      setOtpSent(true);
    } catch (err: any) {
      setModalMessage(err.response?.data?.error || "Failed to send OTP");
      setIsModalOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const verifyOTP = async () => {
    try {
      setLoading(true);
      const res = await axios.post(`${backend_url}/password-reset/verify-otp`, {
        email: forgotEmail,
        role: forgotRole,
        otp: forgotOtp,
      });

      console.log("verify-otp email :", forgotEmail);
      console.log("verify otp role :", forgotRole);
      console.log("verify otp otp : ", forgotOtp);

      setOtpVerified(true);
      setResetToken(res.data.resetToken);
      setModalMessage(res.data.message);
      setIsModalOpen(true);
    } catch (err: any) {
      setModalMessage(err.response?.data?.error || "OTP verification failed");
      setIsModalOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setModalMessage("Passwords do not match.");
      setIsModalOpen(true);
      return;
    }

    try {
      setLoading(true);
      await axios.post(`${backend_url}/password-reset/reset`, {
        token: resetToken,
        newPassword,
      });
      setResetSuccess(true);
    } catch (err: any) {
      setModalMessage(err.response?.data?.error || "Password reset failed");
      setIsModalOpen(true);
    } finally {
      setLoading(false);
    }
  };

  //@ts-ignore
  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setResetSuccess(true);
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-teal-50 relative overflow-hidden pt-8">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://img.freepik.com/free-photo/five-leaves-copyspace-left_23-2147793403.jpg?uid=R193405541&ga=GA1.1.1919688627.1703764224&semt=ais_hybrid"
          className="w-full h-full object-cover"
          alt="background"
        />
      </div>

      <div className="max-w-6xl w-full mx-auto flex gap-8 p-8 z-10">
        {/* Left Section */}
        <div className="flex-1 hidden lg:flex flex-col justify-center">
          <img
            src="https://img.freepik.com/free-vector/illustration-with-save-planet-message_23-2148514659.jpg?t=st=1743011145~exp=1743014745~hmac=3681fa573fa119fbeabac3b2e4919930a30b21c46bc43d7be882800aa0c7722b&w=826"
            alt="eco illustration"
            className="w-full h-auto rounded-2xl"
          />
        </div>

        {/* Right Section - Login Form */}
        <div className="w-full lg:w-[480px] bg-white/90 backdrop-blur-lg rounded-2xl p-8 shadow-xl">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-600">Sign in to continue to your account</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                User Type
              </label>
              <select
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              >
                <option value="" disabled>
                  Select User Type
                </option>
                <option value="Participant">Participant</option>
                <option value="Service Provider">Service Provider</option>
                <option value="College">College</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <i className="fas fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <i className="fas fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-12 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <i
                    className={`fas ${
                      showPassword ? "fa-eye-slash" : "fa-eye"
                    }`}
                  ></i>
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center"></label>
              <button
                type="button"
                onClick={() => setShowForgotModal(true)}
                className="text-sm text-emerald-600 hover:text-emerald-700 font-medium"
              >
                Forgot Password?
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="!rounded-button w-full bg-emerald-500 text-white py-3 px-4 font-medium hover:bg-emerald-600 transition-colors flex items-center justify-center space-x-2"
            >
              {loading ? (
                <i className="fas fa-circle-notch fa-spin"></i>
              ) : (
                <>
                  <span>Sign In</span>
                  <i className="fas fa-arrow-right"></i>
                </>
              )}
            </button>
            <p className="text-center">
              Don't have an account ?
              <Link to="/register" className="text-emerald-500">
                {" "}
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>

      {showForgotModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-800">
                Reset Password
              </h3>
              <button
                onClick={() => {
                  setShowForgotModal(false);
                  setResetSuccess(false);
                  setOtpSent(false);
                  setOtpVerified(false);
                  setResetToken("");
                  setForgotOtp("");
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>

            {!resetSuccess ? (
              !otpVerified ? (
                <>
                  <p className="text-gray-600 mb-4">
                    Enter your email and select role to get an OTP.
                  </p>
                  <select
                    className="w-full mb-4 px-4 py-2 border border-gray-200 rounded-lg"
                    value={forgotRole}
                    onChange={(e) => setForgotRole(e.target.value)}
                  >
                    <option value="participant">Participant</option>
                    <option value="service_provider">Service Provider</option>
                    <option value="college">College</option>
                  </select>
                  <input
                    type="email"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="w-full px-4 py-2 mb-4 border border-gray-200 rounded-lg"
                  />
                  {!otpSent && (
                    <button
                      type="button"
                      onClick={sendResetOTP}
                      disabled={loading}
                      className="w-full mb-2 bg-emerald-500 text-white py-2 px-4 rounded-lg"
                    >
                      {loading ? "Sending OTP..." : "Generate OTP"}
                    </button>
                  )}

                  {otpSent && (
                    <>
                      <input
                        type="text"
                        value={forgotOtp}
                        onChange={(e) => setForgotOtp(e.target.value)}
                        placeholder="Enter OTP"
                        className="w-full px-4 py-2 mb-4 border border-gray-200 rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={verifyOTP}
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg"
                      >
                        Verify OTP
                      </button>
                    </>
                  )}
                </>
              ) : (
                <form onSubmit={resetPassword}>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="New Password"
                    className="w-full px-4 py-2 mb-4 border border-gray-200 rounded-lg"
                    required
                  />
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm Password"
                    className="w-full px-4 py-2 mb-4 border border-gray-200 rounded-lg"
                    required
                  />
                  <button
                    type="submit"
                    className="w-full bg-green-500 text-white py-2 px-4 rounded-lg"
                    disabled={loading}
                  >
                    {loading ? "Resetting..." : "Reset Password"}
                  </button>
                </form>
              )
            ) : (
              <div className="text-center">
                <div className="text-emerald-500 text-5xl mb-4">
                  <i className="fas fa-check-circle"></i>
                </div>
                <h4 className="text-xl font-bold text-gray-800 mb-2">
                  Password Reset Successful
                </h4>
                <p className="text-gray-600">
                  You can now log in with your new password.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Error Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
            <p className="text-center text-gray-800 mb-4">{modalMessage}</p>
            <button
              onClick={() => setIsModalOpen(false)}
              className="w-full py-2 bg-emerald-500 text-white font-semibold rounded-lg hover:bg-emerald-600 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
