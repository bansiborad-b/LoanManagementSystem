import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.jpg";
import { loginUser } from "../api/authApi";
import { useState, useEffect } from "react";
import toast from "react-hot-toast"

const Login = () => {

  const navigate = useNavigate()

  
    useEffect(() => {
      const user = JSON.parse(localStorage.getItem("user"))
  
      if(user){
        navigate("/schemes")
      }
    }, [])

  const [formData, setFormData ] = useState({
    email : "",
    password : ""
  })

  const handleChange = (e) => {
    setFormData({
      ...formData, 
      [e.target.name] : e.target.value
    })
  }

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await loginUser(formData);

    localStorage.setItem("token", res.data.accessToken);
    localStorage.setItem("user", JSON.stringify(res.data.user));

    toast.success("Login Successful")
    navigate("/schemes");
  } catch (err) {
    toast.error(err.response?.data?.message || "Login Failed");
  }
};


  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4 sm:px-6 lg:px-8 ">
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
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-center mb-6">
          Welcome Back
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
          {/* Email */}
          <div>
            <label className="text-xs sm:text-sm text-gray-400">Email</label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              placeholder="Enter your email"
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

          {/* Password */}
          <div>
            <label className="text-xs sm:text-sm text-gray-400">Password</label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              placeholder="Enter your password"
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

          {/* Forgot Password */}
          <Link to="/forgot" className="flex justify-end text-xs sm:text-sm">
            <span className="text-gray-400 hover:text-white cursor-pointer">
              Forgot password?
            </span>
          </Link>

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
            Login
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

        {/* Register */}
        <p className="text-center text-xs sm:text-sm text-gray-400">
          Don’t have an account?{" "}
          <Link to="/register" className="text-white hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
