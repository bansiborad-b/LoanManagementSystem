import React from "react";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useRef } from "react";
import Footer from "../components/Footer";

const LoanHub = () => {
  const navigate = useNavigate();
  const hasRun = useRef(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      toast.error("Please login to access LoanHub!");

      setTimeout(() => {
        navigate("/");
      }, 1000);
    } else {
      setLoading(false); // allow page render
    }
  }, []);
  if (loading) {
    return (
      <div className="h-screen bg-black flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="overflow-y-auto no-scrollbar h-screen bg-gray-50">
      <Navbar />
      <div className="flex justify-center items-center h-[80vh]">
        <h1 className="text-black text-2xl">LoanHub</h1>
      </div>

      <Footer />
    </div>
  );
};

export default LoanHub;
