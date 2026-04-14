import { Link } from "react-router-dom";
import { FaFacebook, FaLinkedin } from "react-icons/fa";
import { X } from "lucide-react";

const Footer = ({ theme = "dark"}) => {

    const isDark = theme === "dark"

    const service = [
    { name: "Government Schemes", path: "/schemes" },
    { name: "Financial Consultancy", path: "/consultancy" },
    { name: "Budget Planning", path: "/budgeting" },
    { name: "Loan Management", path: "/loan-hub" },
  ];

  const contact = [
    { name: "+91 1234567890", path: "tel:+911234567890" },
    { name: "bansiborad@gmail.com", path: "mailto:bansiborad@gmail.com" },
    {
      name: "LDCE, University Area, Ahmedabad, 380009",
      path: "https://www.google.com/maps?q=LD+College+of+Engineering+Ahmedabad",
    },
  ];


  return (
    <div>

            {/* FOOTER MAIN */}
      <section
        className={`${isDark ? "bg-gray-50 text-black" : "bg-white text-black"} px-6 md:px-20 md:py-6 mb-10`}
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">

          {/* LEFT */}
          <div className="py-3">
            <h2 className="text-3xl sm:text-4xl font-semibold mb-5">
              Fintech Services
            </h2>

            <p
              className={`${isDark ? "text-gray-400" : "text-gray-600"} text-sm sm:text-base mb-6 max-w-md`}
            >
              Empowering your financial journey with innovative solutions and
              expert guidance.
            </p>

            <div className="flex gap-5">
              <a href="https://facebook.com" target="_blank" rel="noreferrer">
                <FaFacebook className="w-6 h-6 hover:scale-105 transition-transform duration-200" />
              </a>
              <a href="https://x.com" target="_blank" rel="noreferrer">
                <X className="w-6 h-6 hover:scale-105 transition-transform duration-200" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer">
                <FaLinkedin className="w-6 h-6 hover:scale-105 transition-transform duration-200" />
              </a>
            </div>
          </div>

          {/* RIGHT */}
          <div className="grid grid-cols-2 gap-10">

            <div className="py-3">
              <h3 className="text-xl font-semibold mb-4">
                Explore Our Services
              </h3>

              {service.map((item, i) => (
                <Link
                  key={i}
                  to={item.path}
                  className={`py-3  ${isDark ? "text-gray-500 hover:text-black" : "text-gray-600 hover:text-black"} block transition`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            <div className="py-2">
              <h3 className="text-xl font-semibold mb-4">Contact</h3>

              {contact.map((item, i) => (
                <Link
                  key={i}
                  to={item.path}
                  className={`py-2 ${isDark ? "text-gray-500 hover:text-black" : "text-gray-600 hover:text-black"} block transition`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* BOTTOM */}
      <footer
        className={`${isDark ? "border-gray-800 text-gray-400" : "border-gray-200 text-gray-600"} border-t px-6 py-12 text-center`}
      >
        © {new Date().getFullYear()} FinTech Services. All rights reserved.
      </footer>

    </div>
  )
}

export default Footer