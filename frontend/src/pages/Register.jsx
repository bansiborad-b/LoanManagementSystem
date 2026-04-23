import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.jpg";
import { registerUser } from "../api/authApi";
import { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
  const [shake, setShake] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      navigate("/schemes");
    }
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    role: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { password, confirmPassword } = formData;

    // 1. required fields
    if (
      !formData.name ||
      !formData.email ||
      !formData.mobile ||
      !password ||
      !confirmPassword
    ) {
      return toast.error("All fields are required");
    }
    // 2. password length check
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      setShake(true);
      setTimeout(() => {
        setShake(false);
      }, 400);
      return;
    }

    const mobileRegex = /^[0-9]{10}$/;

if (!mobileRegex.test(formData.mobile)) {
  return toast.error("Enter valid 10 digit mobile number");
}

    // 3. match validation (IMPORTANT)
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      setShake(true);
      setTimeout(() => {
        setShake(false);
      }, 400);
      return;
    }

    try {
      const res = await registerUser(formData);

      toast.success(res.data.message || "Registered Successfully!");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="min-h-screen lg:py-2 xl:py-5 bg-black text-white flex items-center justify-center px-4 sm:px-6 lg:px-8">
      {/* Card */}
      <div
        className="
        w-full 
        max-w-sm sm:max-w-md lg:max-w-lg 
        bg-black border-2 border-gray-500 
        rounded-2xl 
        p-6 sm:p-8 lg:px-10 xl:py-4 lg:py-2 
        shadow-lg
      "
      >
        {/* Logo */}
        <div className="flex items-center justify-center py-3">
          <img
            src={logo}
            alt="FinTech"
            className="h-12 w-auto object-contain rounded-md"
          />
        </div>

        {/* Heading */}
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-center mb-6">
          Create Account
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
          {/* Name */}
          <div>
            <label className="text-xs sm:text-sm text-gray-400">
              Full Name
            </label>
            <input
              onChange={handleChange}
              type="text"
              name="name"
              placeholder="Enter your name"
              className="w-full mt-1 px-3 sm:px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-white transition"
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-xs sm:text-sm text-gray-400">Email</label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full mt-1 px-3 sm:px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-white transition"
            />
          </div>

          {/* Mobile Number */}
          <div>
            <label className="text-xs sm:text-sm text-gray-400">
              Mobile Number
            </label>

            <input
              type="tel"
              max={10}
              name="mobile"
              onChange={handleChange}
              placeholder="Enter your mobile number"
              className="
      w-full mt-1 px-3 sm:px-4 py-2 
      bg-gray-900 border border-gray-700 
      rounded-lg text-sm sm:text-base
      focus:outline-none focus:ring-2 focus:ring-white 
      transition
    "
            />
          </div>

          {/* Role Dropdown */}
          <div>
            <label className="text-xs sm:text-sm text-gray-400">
              Select Role
            </label>
            <select
              name="role"
              onChange={handleChange}
              className="w-full mt-1 px-3 sm:px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-white transition"
            >
              <option value="User">User</option>
              <option value="Manager">Manager</option>
            </select>
          </div>

          {/* Password */}
          <div>
            <label className="text-xs sm:text-sm text-gray-400">Password</label>
            <div className="relative">
              <input
                name="password"
                onChange={handleChange}
                type={showPassword ? "text" : "password"}
                placeholder="Create password"
                className="w-full mt-1 px-3 sm:px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-white transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className={shake ? "shake" : ""}>
            <label className="text-xs sm:text-sm text-gray-400">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                onChange={handleChange}
                placeholder="Confirm password"
                className="w-full mt-1 px-3 sm:px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-white transition"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition"
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Button */}
          <button
            type="submit"
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
            Register
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

        {/* Login Link */}
        <p className="text-center text-xs sm:text-sm text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="text-white hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
