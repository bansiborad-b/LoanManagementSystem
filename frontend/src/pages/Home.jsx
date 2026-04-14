import { useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import men from "../assets/image.png";
import { useEffect } from "react";
import {
  Wallet,
  FileText,
  BarChart3,
  User,
  ChevronRight,
  ChevronDown,
} from "lucide-react";
import Footer from "../components/Footer";
import toast from "react-hot-toast";

const Home = () => {
  const navigate = useNavigate();
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      navigate("/schemes");
    }
  }, []);

  const handleProtectedNavigation = (path) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    toast.error("Please login first");
    navigate("/login");
  } else {
    navigate(path);
  }
};

const handleServiceClick = (path) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    toast.error("Please login first");
    navigate("/home");
  } else {
    navigate(path);
  }
};

  const faqData = [
    {
      q: "What services does this platform provide?",
      a: "We offer loan comparison, EMI calculation, budget planning, financial consultancy, and access to government schemes in one place.",
    },
    {
      q: "How do I apply for a loan?",
      a: "Simply navigate to the Loan Hub, compare available options, calculate your EMI, and proceed with the application process.",
    },
    {
      q: "Is my personal data secure?",
      a: "Yes, we use secure authentication and encrypted data storage to protect your personal and financial information.",
    },
    {
      q: "Can I track my loan status?",
      a: "Yes, once you apply, you can track your loan application and status directly from your dashboard.",
    },
    {
      q: "Are there any hidden charges?",
      a: "No, we maintain full transparency. All charges and terms are clearly shown before you proceed.",
    },
    {
      q: "How is EMI calculated?",
      a: "EMI is calculated based on loan amount, interest rate, and tenure using a standard formula.",
    },
    {
      q: "Can I compare multiple loan options?",
      a: "Yes, our platform allows you to compare different loan providers to find the best option.",
    },
    {
      q: "What documents are required for a loan?",
      a: "Generally, ID proof, income proof, and bank details are required. Requirements may vary by lender.",
    },
    {
      q: "Can I repay my loan early?",
      a: "Yes, but some lenders may charge a prepayment fee. Check terms before applying.",
    },
    {
      q: "What is the eligibility criteria for the loan?",
      a: "Everyone eligible for the loan, but loan amount is depends on income, credit score, employment status, and lender policies.",
    },
  ];
  const handleClick = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const services = [
    {
      title: "Government Schemes",
      description:
        "Access various government financial support programs for rural students, businesswomen, and farmers.",
      action: "Learn More",
      path: "/schemes",
      icon: <FileText className="w-8 h-8 text-black" />,
    },
    {
      title: "Financial Consultancy",
      description:
        "Get expert advice from our financial consultants to make informed decisions about your investments.",
      action: "Book a Session",
       path: "/consultancy",
      icon: <Wallet className="w-8 h-8 text-black" />,
    },
    {
      title: "Budget Planning",
      description:
        "Track your expenses, set financial goals, and manage your budget effectively with our tools.",
      action: "Start Planning",
       path: "/budgeting",
      icon: <BarChart3 className="w-8 h-8 text-black" />,
    },
    {
      title: "Loan Management",
      description:
        "Explore loan options and estimate your EMIs quickly. Make smarter borrowing decisions with confidence.",
      action: "Explore Loans",
       path: "/loan-hub",
      icon: <User className="w-8 h-8 text-black" />,
    },
  ];

  return (
    <div className="overflow-y-auto no-scrollbar h-screen bg-black">
      <Navbar />

      {/* section */}
      <section className="min-h-[70vh] flex flex-col lg:flex-row items-center justify-between  px-6 md:px-16 py-10  text-white">
        {/* LEFT CONTENT */}
        <div className="lg:w-1/2 space-y-6 lg:space-y-9">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
            Your Financial
            <br />
            <span className="text-gray-500">Success Partners</span>
          </h1>

          <p className="text-gray-400 max-w-lg">
            Discover comprehensive financial solutions tailored to your needs.
            From government schemes to expert consultancy, we're here to help
            you achieve your financial goals
          </p>

          {/* BUTTONS */}
          <div className="flex gap-4">
            <button  onClick={() => handleProtectedNavigation("/loan-hub")} className="bg-white text-black px-6 py-2 rounded-lg font-medium hover:bg-gray-200  hover:scale-105 transition-transform duration-200">
              Get a Loan
            </button>

            <button  onClick={() => handleProtectedNavigation("/consultancy")} className="border border-gray-500 px-6 py-2 rounded-lg hover:border-white hover:text-white hover:scale-105 transition-transform duration-200">
              Book Consultation
            </button>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="lg:w-1/2 mt-10 lg:mt-0 flex justify-center relative">
          {/* Background Shape */}
          <div className="absolute w-[300px] h-[300px] bg-gray-800 rounded-full blur-3xl opacity-30"></div>

          <img
            src={men}
            alt="finance"
            className="relative w-[300px] sm:w-[400px] rounded-2xl shadow-lg"
          />
        </div>
      </section>

      <section className="py-12 px-6 md:px-16 text-white">
        {/* TITLE */}
        <div className="text-center max-w-[685px] mx-auto mb-12">
          <h2 className="text-gray-400 text-xl uppercase tracking-widest mb-3">
            OUR SERVICES
          </h2>

          <p className="text-3xl sm:text-4xl font-semibold mb-3">
            Everything you need for financial growth
          </p>

          <p className="text-gray-400 text-sm sm:text-base">
            Access a comprehensive suite of financial services designed to help
            you succeed.
          </p>
        </div>

        {/* GRID */}
        <div className="grid sm:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {services.map((service, index) => (
            <div
              key={index}
              onClick={() => handleServiceClick(service.path)}
              className="border border-gray-700 rounded-xl p-6 hover:border-white  group flex gap-5 hover:scale-105 transition-transform duration-200"
            >
              {/* ICON */}
              <div className="bg-white px-2 py-3 h-14 rounded-md">
                {service.icon}
              </div>

              {/* CONTENT */}
              <div className="space-y-1">
                <h3 className="text-xl font-semibold">{service.title}</h3>

                <p className="text-gray-400 text-sm">{service.description}</p>

                <div className="text-sm flex items-center font-bold group-hover:translate-x-1 transition">
                  <p>{service.action}</p>
                  <ChevronRight className="w-5 h-4 ml-1" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* GET START */}
      <section className="px-10 mt-8 py-10 bg-white">
        <div className="mx-auto flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          {/* TEXT */}
          <div>
            <h2 className="text-2xl sm:text-4xl font-semibold">
              Ready to get started?
            </h2>

            <h2 className="mt-4 text-gray-400 text-2xl sm:text-4xl font-extrabold">
              Take control of your financial future today.
            </h2>
          </div>

          {/* BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
            onClick={() => handleProtectedNavigation("/home")}
              className="bg-black text-white px-10 py-3 rounded-lg font-medium 
    
    active:scale-95 
    hover:scale-105 transition-transform duration-200"
            >
              Get Started
            </button>

            <button
              className="border border-black px-10 py-3 rounded-lg font-medium 
    hover:bg-black hover:text-white 
    active:scale-95 
    hover:scale-105 transition-transform duration-200"
            >
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* 🔹 FAQ */}
      <section className="lg:px-20 px-5 py-16 max-w-full mx-auto">
        <h2 className="text-2xl sm:text-3xl text-white font-semibold  mb-8">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {faqData.map((faq, i) => (
            <div
              key={i}
              onClick={() => handleClick(i)}
              className={` ${openIndex === i ? "border border-white" : ""} border border-gray-700 rounded-lg p-4 cursor-pointer group transition-all duration-300 hover:border-white lg:py-7`}
            >
              {/* QUESTION */}
              <div className="flex justify-between items-center">
                <h4 className="text-white font-medium text-lg">{faq.q}</h4>

                <ChevronDown
                  className={`w-5 h-5 text-white transition-transform duration-300 
                ${openIndex === i ? "rotate-180" : ""}`}
                />
              </div>

              {/* ANSWER */}
              <div
                className={`
                overflow-hidden transition-all duration-300
                ${openIndex === i ? "max-h-40 mt-3" : "max-h-0"}
                group-hover:max-h-40 group-hover:mt-3
              `}
              >
                <p className="text-gray-400 text-medium">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* footer */}
      <Footer />
    </div>
  );
};

export default Home;
