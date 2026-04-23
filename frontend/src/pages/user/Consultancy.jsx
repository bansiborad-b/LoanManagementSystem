import React, { useEffect, useRef, useState } from "react";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Footer from "../../components/Footer";

const Consultancy = () => {
  const navigate = useNavigate();
  const hasRun = useRef(false);

  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  const users = [
    {
      id: 1,
      name: "John Doe",
      designation: "Investment Specialist",
      skills: ["Finance", "Investment", "Tax"],
      description:
        "Expert in financial planning and investment strategies.Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsa, nemo.",
    },
    {
      id: 2,
      name: "Priya Sharma",
      designation: "Tax Planning Expert",
      skills: ["Startup", "Marketing"],
      description:
        "Helping startups grow with smart marketing strategies.Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsa, nemo.",
    },
    {
      id: 3,
      name: "Amit Patel",
      designation: "Investment Specialist",
      skills: ["Agriculture", "Sustainability"],
      description:
        "Guiding farmers toward sustainable farming practices.Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsa, nemo.",
    },
    {
      id: 4,
      name: "Neha Singh",
      designation: "Tax Planning Expert",
      skills: ["Education", "Career"],
      description:
        "Career mentor for students and professionals.Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsa, nemo.",
    },
    {
      id: 5,
      name: "Rahul Mehta",
      designation: "Investment Specialist",
      skills: ["Finance"],
      description:
        "Helping clients manage wealth.Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsa, nemo.",
    },
    {
      id: 6,
      name: "Sneha Patel",
      designation: "Loan Specialist",
      skills: ["HR", "Career"],
      description:
        "Career consultant.Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsa, nemo.",
    },
    {
      id: 7,
      name: "Aarti Shah",
      designation: "Investment Specialist",
      skills: ["Business"],
      description:
        "Startup advisor.Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsa, nemo.",
    },
    {
      id: 8,
      name: "Aarti Shah",
      designation: "Investment Specialist",
      skills: ["Business"],
      description:
        "Startup advisor.Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsa, nemo.",
    },
    {
      id: 9,
      name: "Aarti Shah",
      designation: "Investment Specialist",
      skills: ["Business"],
      description:
        "Startup advisor.Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsa, nemo.",
    },
    {
      id: 10,
      name: "Aarti Shah",
      designation: "Investment Specialist",
      skills: ["Business"],
      description:
        "Startup advisor.Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsa, nemo.",
    },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const getInitials = (name) => {
    const words = name.split(" ");
    const first = words[0]?.[0] || "";
    const last = words[1]?.[0] || "";
    return (first + last).toUpperCase();
  };

  const visibleUsers = showAll ? users : users.slice(0, 9);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      toast.error("Please login to access Consultancy!");
      setTimeout(() => navigate("/"), 1000);
    } else {
      setLoading(false);
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

      <div className="flex flex-col gap-3 items-center text-center px-10 py-10">
        <h1 className="text-black text-2xl md:text-4xl font-extrabold">
          Financial Consultancy
        </h1>
        <p className="text-md md:text-xl">
          Book a session with our expert financial consultants.
        </p>
      </div>

      <div className="w-full xl:px-14 p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleUsers.map((user) => (
            <div
              key={user.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-5 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center h-20 gap-4 mb-4">
                  {/* Initial Avatar */}
                  <div className="w-14 h-14 rounded-full bg-black text-white flex items-center justify-center font-semibold text-xl">
                    {getInitials(user.name)}
                  </div>

                  <div>
                    <h2 className="text-lg font-semibold">{user.name}</h2>
                    <h2 className="text-[12px] font-semibold text-gray-600">
                      {user.designation}
                    </h2>
                  </div>
                </div>

                {/* Skills */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {user.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="text-xs bg-gray-200 px-2 py-1 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Description */}
                <p className="text-sm text-gray-600">{user.description}</p>
              </div>

              <button
                onClick={() => {
                  setSelectedUser(user);
                  setIsModalOpen(true);
                }}
                className="mt-4 bg-black text-white py-2 rounded-xl text-sm hover:bg-gray-800 transition"
              >
                Book Consultation
              </button>
            </div>
          ))}
        </div>

        {/* View More */}
        {users.length > 9 && (
          <div className="text-center mt-6 mb-8">
            <button
              onClick={() => setShowAll(!showAll)}
              className="text-black font-semibold hover:underline"
            >
              {showAll ? "Show Less" : "View More"}
            </button>
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed  inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white w-full overflow-y-auto no-scrollbar h-[60vh] max-w-md rounded-2xl px-6 pb-6">
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="sticky top-6 ml-auto block text-gray-500 hover:text-black"
            >
              ✕
            </button>

            <h2 className="text-lg">
              Book Appointment With:{" "}
              <span className="font-extrabold text-sm">{selectedUser?.name}</span>
            </h2>

            {/* Selected User */}
            <p className="text-sm text-gray-600 mb-4">
              <span className="text-[13px]">{selectedUser?.designation}</span>
            </p>

            {/* Form */}
            <form className="flex flex-col gap-5">
              <div className="flex flex-col gap-1">
                <label className="font-semibold text-sm" htmlFor="name">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  className="border p-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-semibold text-sm" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  className="border p-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-semibold text-sm" htmlFor="number">
                  Phone Number
                </label>
                <input
                  type="number"
                  name="number"
                  placeholder="Your Phone"
                  className="border p-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-semibold text-sm" htmlFor="number">
                  Preferred Date
                </label>
                <input
                  type="date"
                  className="border p-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-semibold text-sm" htmlFor="number">
                  Preferred Time
                </label>
                <input
                  type="time"
                  className="border p-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-semibold text-sm" htmlFor="number">
                  Additional Notes
                </label>
                <textarea
                  placeholder="Message"
                  rows="3"
                  className="border p-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
                />
              </div>

              <button
                type="submit"
                className="bg-black text-white py-2 rounded-lg mt-2 hover:bg-gray-800"
              >
                Book Appointment
              </button>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Consultancy;
