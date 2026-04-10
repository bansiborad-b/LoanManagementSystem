import React, { useEffect, useState, useRef } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Footer from "../components/Footer";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Pie,
  PieChart,
  Legend,
  Cell,
} from "recharts";

const Budgeting = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const income = 114000;
  const expense = 13567;
  const balance = income - expense;

  const data = [
    { name: "Income", value: income },
    { name: "Expense", value: expense },
    { name: "Balance", value: balance },
  ];

  const monthlyData = [
    { month: "Jan", income: 40000, expense: 15000, balance: 25000 },
    { month: "Feb", income: 30000, expense: 12000, balance: 18000 },
    { month: "Mar", income: 45000, expense: 20000, balance: 25000 },
    { month: "Apr", income: 38000, expense: 14000, balance: 24000 },
    { month: "May", income: 50000, expense: 25000, balance: 25000 },
    { month: "Jun", income: 42000, expense: 18000, balance: 24000 },
    { month: "Jul", income: 47000, expense: 21000, balance: 26000 },
    { month: "Aug", income: 52000, expense: 26000, balance: 26000 },
    { month: "Sep", income: 48000, expense: 20000, balance: 28000 },
    { month: "Oct", income: 55000, expense: 30000, balance: 25000 },
    { month: "Nov", income: 60000, expense: 35000, balance: 25000 },
    { month: "Dec", income: 65000, expense: 40000, balance: 25000 },
  ];

  const COLORS = ["#4b5563", "#9ca3af", "#271f27"];

  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      toast.error("Please login to access Budgeting!");

      setTimeout(() => {
        navigate("/");
      }, 1000);
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
    <div className="overflow-y-auto no-scrollbar min-h-screen bg-gray-50">
      <Navbar />

      {/* HEADER */}
      <div className="flex flex-col gap-2 items-center text-center px-4 md:px-10 py-6 md:py-10">
        <h1 className="text-xl sm:text-2xl md:text-4xl font-extrabold">
          Budget Planner
        </h1>
        <p className="text-sm sm:text-md md:text-xl">
          Track your expenses and plan your finances effectively.
        </p>
      </div>

      <div className="w-full px-4 md:px-8 lg:px-10 py-6 md:py-10 space-y-8">
        {/* TOP GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* FORM */}
          <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-md w-full">
            <h2 className="text-lg font-bold mb-4">Add Transaction</h2>

            <form className="flex flex-col gap-4 sm:gap-5">
              <div>
                <label className="font-semibold text-sm">Type</label>
                <select className="border p-2 bg-white rounded-lg w-full">
                  <option>Income</option>
                  <option>Expense</option>
                  <option>Loan</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-sm">Category</label>
                <select className="border p-2 bg-white rounded-lg w-full">
                  <option>Select Category</option>
                  <option>Expense</option>
                  <option>Loan</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-sm">Amount</label>
                <input
                  type="text"
                  placeholder="₹ 0.00"
                  className="border p-2 rounded-lg w-full"
                />
              </div>

              <div>
                <label className="font-semibold text-sm">Date</label>
                <input type="date" className="border p-2 rounded-lg w-full" />
              </div>

              <div>
                <label className="font-semibold text-sm">Description</label>
                <input
                  type="text"
                  placeholder="Optional Description"
                  className="border p-2 rounded-lg w-full"
                />
              </div>

              <button className="bg-black text-white py-2 rounded-lg w-full">
                Add Transaction
              </button>
            </form>
          </div>

          {/* RIGHT SIDE */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            {/* CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-md">
                <p className="text-sm">Total Income</p>
                <h3 className="text-xl sm:text-2xl lg:text-[22px] text-gray-600 font-extrabold">
                  ₹ 1,14,000.00
                </h3>
              </div>

              <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-md">
                <p className="text-sm">Total Expenses</p>
                <h3 className="text-xl sm:text-2xl lg:text-[22px] text-gray-400 font-extrabold">
                  ₹ 13,567.00
                </h3>
              </div>

              <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-md">
                <p className="text-sm">Balance</p>
                <h3 className="text-xl sm:text-2xl lg:text-[22px] text-gray-900 font-extrabold">
                  ₹ 1,00,433.00
                </h3>
              </div>
            </div>

            {/* CHARTS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* PIE */}
              <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-lg h-[300px] lg:h-[450px]  sm:h-[350px] md:h-[400px]">
                <h3 className="text-lg sm:text-xl font-semibold mb-2">
                  Expense Distribution
                </h3>

                <ResponsiveContainer width="100%" height="85%">
                  <PieChart>
                    <Pie
                      data={data}
                      dataKey="value"
                      innerRadius={50}
                      outerRadius={90}
                      paddingAngle={2}
                    >
                      {data.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>

                    <Tooltip />
                    <Legend verticalAlign="bottom" height={36} />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* BAR */}
              <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-lg lg:h-[450px] h-[300px] sm:h-[350px] md:h-[400px]">
                <h3 className="text-lg sm:text-xl font-semibold mb-2">
                  Monthly Overview
                </h3>

                <ResponsiveContainer width="100%" height="85%">
                  <BarChart data={monthlyData}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />

                    <Bar
                      dataKey="income"
                      fill="#4b5563"
                      radius={[6, 6, 0, 0]}
                    />
                    <Bar
                      dataKey="expense"
                      fill="#9ca3af"
                      radius={[6, 6, 0, 0]}
                    />
                    <Bar
                      dataKey="balance"
                      fill="#271f27"
                      radius={[6, 6, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Budgeting;
