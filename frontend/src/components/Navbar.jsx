import React, { useState } from "react";
import logo from "../assets/preview.jpg";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { logoutUser } from "../api/authApi";
import toast from "react-hot-toast";

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logoutUser();

      localStorage.removeItem("token");
      localStorage.removeItem("user");

      toast.success("Logout Successful");

      navigate("/");

    } catch (err) {
      toast.error("Logout Failed");
      console.log(err);
    }
  };

  const menuItems = user
    ? [
        { name: "Schemes", path: "/schemes" },
        { name: "Consultancy", path: "/consultancy" },
        { name: "Budgeting", path: "/budgeting" },
        { name: "Loan Hub", path: "/loan-hub" },
        { name: "About Us", path: "/about" },
      ]
    : [
        { name: "Home", path: "/" },
        { name: "Schemes", path: "/schemes" },
        { name: "Consultancy", path: "/consultancy" },
        { name: "Budgeting", path: "/budgeting" },
        { name: "Loan Hub", path: "/loan-hub" },
        { name: "About Us", path: "/about" },
      ];

  return (
    <nav className="sticky top-0 z-50 bg-black text-white border-b border-gray-800">
      <div className="max-w-8xl mx-auto px-4 md:px-14 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3 hover:scale-105 transition-transform duration-200">
          <img
            src={logo}
            alt="FinTech"
            className="h-10 w-auto object-contain rounded-xl"
          />
          <h1 className="text-xl font-semibold tracking-wide">FinTech</h1>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden xl:flex space-x-[60px] text-base relative">
          {menuItems.map((item) => (
            <NavLink key={item.name} to={item.path} className="relative group hover:scale-105 transition-transform duration-200">
              {({ isActive }) => (
                <>
                  <span
                    className={` hover:scale-105 transition-transform duration-200 ${
                      isActive ? "text-white" : "text-gray-300"
                    }`}
                  >
                    {item.name}
                  </span>

                  {/* Animated Underline */}
                  <span
                    className={`absolute left-0 -bottom-1 h-[2px] bg-white transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  ></span>
                </>
              )}
            </NavLink>
          ))}
        </div>
        {/* Desktop Buttons */}
        <div className="hidden xl:flex space-x-4">
          {user ? (
            <button
              onClick={handleLogout}
              className="bg-white text-black px-4 py-1 rounded hover:bg-gray-200 transition"
            >
              Logout
            </button>
          ) : (
            <>
              <Link to="/login">
                <button className="border border-white px-4 py-1 rounded hover:bg-white hover:text-black transition">
                  Login
                </button>
              </Link>
              <Link to="/register">
                <button className="bg-white text-black px-4 py-1 rounded hover:bg-gray-200 transition">
                  Register
                </button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="xl:hidden text-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="xl:hidden bg-black border-t border-gray-800 px-4 py-4 space-y-4 text-center">
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `block ${
                  isActive ? "text-white font-semibold" : "text-gray-400"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}

          {user ? (
            <button
              onClick={handleLogout}
              className="w-full bg-white text-black py-2 rounded hover:bg-gray-200 transition"
            >
              Logout
            </button>
          ) : (
            <>
              <Link to="/login">
                <button className="w-full border border-white py-2 my-4 rounded hover:bg-white hover:text-black transition">
                  Login
                </button>
              </Link>
              <Link to="/register">
                <button className="w-full bg-white text-black py-2 rounded hover:bg-gray-200 transition">
                  Register
                </button>
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
