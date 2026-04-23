import API from "./axios";

// ✅ Register API
export const registerUser = (data) => {
  return API.post("/auth/register", data);
};

// ✅ Login API
export const loginUser = (data) => {
  return API.post("/auth/login", data);
};

// Logout API
export const logoutUser = () => {
  return API.post("/auth/logout");
};

// 🔐 FORGOT PASSWORD
export const forgotPassword = (email) => {
  return API.post("/auth/forgot-password", { email });
};

// 🔐 RESET PASSWORD
export const resetPassword = (token, password) => {
  return API.post(`/auth/reset-password/${token}`, { password });
};

// 🔄 REFRESH TOKEN (optional helper)
export const refreshToken = () => {
  return API.post("/auth/refresh");
};

// ✅ Send OTP
export const sendOTP = (mobile) => {
  return API.post("/auth/send-otp", { mobile });
};

// ✅ Verify OTP
export const verifyOTP = (data) => {
  return API.post("/auth/verify-otp", data);
};


