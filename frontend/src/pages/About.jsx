import React from "react";
import Navbar from "../components/Navbar";
import toast from "react-hot-toast";
import Footer from "../components/Footer";

const About = () => {
  return (
    <div className="overflow-y-auto no-scrollbar h-screen bg-gray-50">
      <Navbar />
      <div className="flex justify-center items-center h-[80vh]">
        <h1 className="text-black text-2xl">About</h1>
      </div>
      <Footer />
    </div>
  );
};

export default About;
