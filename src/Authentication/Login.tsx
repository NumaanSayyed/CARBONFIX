// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.

import React, { useState } from 'react';
import { Link } from 'react-router';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [showForgotModal, setShowForgotModal] = useState(false);
    const [forgotEmail, setForgotEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [resetSuccess, setResetSuccess] = useState(false);
    const [] = useState('Participant');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Simulating API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        setLoading(false);
    };

    const handleForgotPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 2000));
        setResetSuccess(true);
        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-teal-50 relative overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://public.readdy.ai/ai/img_res/7adeee5f9502334729e316b7049d3d6f.jpg"
                    className="w-full h-full object-cover"
                    alt="background"
                />
            </div>

            {/* Main Container */}
            <div className="max-w-6xl w-full mx-auto flex gap-8 p-8 z-10">
                {/* Left Section */}
                <div className="flex-1 hidden lg:flex flex-col justify-center">
                    <img
                        src="https://public.readdy.ai/ai/img_res/4cefce50b85b07455771eedec7fa7387.jpg"
                        alt="eco illustration"
                        className="w-full h-auto rounded-2xl"
                    />
                </div>

                {/* Right Section - Login Form */}
                <div className="w-full lg:w-[480px] bg-white/90 backdrop-blur-lg rounded-2xl p-8 shadow-xl">
                    <div className="mb-8 text-center">
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h1>
                        <p className="text-gray-600">Sign in to continue to your account</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        {/* USER TYPE DROPDOWN  */}
                       
                        <div>
                            
                            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
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
                            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                            <div className="relative">
                                <i className="fas fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                                <input
                                    type={showPassword ? 'text' : 'password'}
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
                                    <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                    className="w-4 h-4 text-emerald-500 border-gray-300 rounded focus:ring-emerald-500"
                                />
                                <span className="ml-2 text-sm text-gray-600">Remember me</span>
                            </label>
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
                            <p className='text-center'>Don't have an account ? 
                                <Link to='/register' className='text-emerald-500'> Register</Link>
                            </p>
                      
                    </form>
                </div>
            </div>

            {/* Forgot Password Modal */}
            {showForgotModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-gray-800">Reset Password</h3>
                            <button
                                onClick={() => {
                                    setShowForgotModal(false);
                                    setResetSuccess(false);
                                }}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <i className="fas fa-times"></i>
                            </button>
                        </div>

                        {!resetSuccess ? (
                            <form onSubmit={handleForgotPassword}>
                                <p className="text-gray-600 mb-6">
                                    Enter your email address and we'll send you instructions to reset your password.
                                </p>
                                <div className="mb-6">
                                    <input
                                        type="email"
                                        value={forgotEmail}
                                        onChange={(e) => setForgotEmail(e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                        placeholder="Enter your email"
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="!rounded-button w-full bg-emerald-500 text-white py-3 px-4 font-medium hover:bg-emerald-600 transition-colors flex items-center justify-center"
                                >
                                    {loading ? (
                                        <i className="fas fa-circle-notch fa-spin"></i>
                                    ) : (
                                        'Send Reset Instructions'
                                    )}
                                </button>
                            </form>
                        ) : (
                            <div className="text-center">
                                <div className="text-emerald-500 text-5xl mb-4">
                                    <i className="fas fa-check-circle"></i>
                                </div>
                                <h4 className="text-xl font-bold text-gray-800 mb-2">Check Your Email</h4>
                                <p className="text-gray-600">
                                    We've sent password reset instructions to your email address.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Login;

