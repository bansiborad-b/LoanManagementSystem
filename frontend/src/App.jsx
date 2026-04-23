import React from "react";
import { Toaster } from "react-hot-toast";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Schemes from "./pages/user/Schemes";

import Consultancy from "./pages/user/Consultancy";
import LoanHub from "./pages/user/LoanHub";
import Budgeting from "./pages/user/Budgeting";
import About from "./pages/About";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

import AuthRoute from "./routes/AuthRoute";
import ProtectedRoute from "./routes/ProtectRoute";
import useAuthCheck from "./hooks/useAuthCheck";
import useLastPage from "./hooks/useLastPage";
import SmartRedirect from "./routes/smartRedirect";
import UserPanel from "./pages/user/UserPanel";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManagerDashboard from "./pages/manager/ManagerDashboard";
import MobileLogin from "./pages/MobileLogin";

function App() {
  console.log("Auth Check Running");
  useLastPage();
  useAuthCheck();
  return (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          style: {
            background: "#000",
            color: "#fff",
            border: "1px solid #444",
            zIndex: 9999,
          },
        }}
      />

      <Routes>
        {/* Public page */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />

        {/* Auth pages (blocked after login) */}
        <Route
          path="/login"
          element={
            <AuthRoute>
              <Login />
            </AuthRoute>
          }
        />

        <Route
          path="/mobile-login"
          element={<MobileLogin />}
        />

        <Route
          path="/register"
          element={
            <AuthRoute>
              <Register />
            </AuthRoute>
          }
        />

        <Route
          path="/forgot"
          element={
            <AuthRoute>
              <ForgotPassword />
            </AuthRoute>
          }
        />

        <Route path="/reset-password/:token" element={<ResetPassword />} />

        {/* Protected pages (only after login) */}
        <Route
          path="/user"
          element={
            <ProtectedRoute allowedRoles={["User"]}>
              <UserPanel />
            </ProtectedRoute>
          }
        />

        <Route
          path="/schemes"
          element={
            <ProtectedRoute allowedRoles={["User"]}>
              <Schemes />
            </ProtectedRoute>
          }
        />

        <Route
          path="/consultancy"
          element={
            <ProtectedRoute allowedRoles={["User"]}>
              <Consultancy />
            </ProtectedRoute>
          }
        />

        <Route
          path="/loan-hub"
          element={
            <ProtectedRoute allowedRoles={["User"]}>
              <LoanHub />
            </ProtectedRoute>
          }
        />

        <Route
          path="/budgeting"
          element={
            <ProtectedRoute allowedRoles={["User"]}>
              <Budgeting />
            </ProtectedRoute>
          }
        />

        {/* ADMIN ROUTES */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["Admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* MANAGER ROUTES */}
        <Route
          path="/manager"
          element={
            <ProtectedRoute allowedRoles={["Manager"]}>
              <ManagerDashboard />
            </ProtectedRoute>
          }
        />

        {/* FALLBACK */}
        <Route path="*" element={<SmartRedirect />} />
      </Routes>
    </>
  );
}

export default App;
