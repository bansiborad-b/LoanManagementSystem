import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.jpg";
import toast from "react-hot-toast"
import axios from "axios";
import { useState } from "react";
import { forgotPassword } from "../api/authApi";

const ForgotPassword = () => {

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!email) {
      toast.error("Please enter your email");
      return;
    }
    
    try {
      setLoading(true);
      const response = await forgotPassword(email);

      if (response.data.success) {
        toast.success("Reset link send on your Email!");
      } else {
        toast.error("Try again later!");
      }
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };  

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4 sm:px-6 lg:px-8">
      
      {/* Card */}
      <div
        className="
        w-full 
        max-w-sm sm:max-w-md lg:max-w-lg 
        bg-black border-2 border-gray-500 
        rounded-2xl 
        p-6 sm:p-8 lg:p-10 
        shadow-lg
      "
      >
        {/* Logo */}
        <div className="flex items-center justify-center space-x-3 py-3">
          <img
            src={logo}
            alt="FinTech"
            className="h-12 w-auto object-contain rounded-md"
          />
        </div>

        {/* Heading */}
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-center mb-4">
          Forgot Password
        </h2>

        {/* Subtext */}
        <p className="text-center text-gray-400 text-xs sm:text-sm mb-6">
          Enter your email and we’ll send you a reset link
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
          
          {/* Email */}
          <div>
            <label className="text-xs sm:text-sm text-gray-400">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="
                w-full mt-1 px-3 sm:px-4 py-2 
                bg-gray-900 border border-gray-700 
                rounded-lg 
                text-sm sm:text-base
                focus:outline-none focus:ring-2 focus:ring-white 
                transition
              "
            />
          </div>

          {/* Button */}
          <button
            type="submit"
              disabled={loading}
            className="
              w-full 
              bg-white text-black 
              py-2 sm:py-3 
              rounded-lg 
              text-sm sm:text-base 
              font-medium 
              hover:bg-gray-200 
              transition
            "
          >
           {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        {/* Divider */}
        <div className="my-5 sm:my-6 flex items-center">
          <div className="flex-1 h-px bg-gray-700"></div>
          <span className="px-2 sm:px-3 text-gray-400 text-xs sm:text-sm">
            OR
          </span>
          <div className="flex-1 h-px bg-gray-700"></div>
        </div>

        {/* Back to Login */}
        <p className="text-center text-xs sm:text-sm text-gray-400">
          Remember your password?{" "}
          <Link to="/login" className="text-white hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;