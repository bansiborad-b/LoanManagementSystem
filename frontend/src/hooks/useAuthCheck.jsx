import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import API from "../api/axios";

const useAuthCheck = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    const publicRoutes = ["/", "/login", "/register", "/forgot", "/about", "/reset-password", "/mobile-login"];
    
    const isPublicRoute = location.pathname.startsWith("/reset-password") || publicRoutes.includes(location.pathname);

    // ✅ Skip public routes completely
    if (isPublicRoute) return;

    // ❌ If auth broken
    if (!token || !user) {
      // 🔥 Fire and forget (don’t block UI)
      if (token) {
        API.post("/auth/force-logout", {
          accessToken: token,
        }).catch(() => {});
      }

      // 🧹 Clear storage
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      // 🔁 Redirect safely
      navigate("/login", { replace: true });
    }
  }, [location.pathname]);
};

export default useAuthCheck;
