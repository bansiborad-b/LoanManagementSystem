import { Router } from "express";

import {
  registerUser,
  loginUser,
  logoutUser,
  refreshToken,
  forceLogout,
  forgotPassword,
  resetPassword,
  googleAuth,
  sendOTP,
  verifyOTP,
} from "../controllers/authController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = Router();

// 🔹 Public Routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/refresh", refreshToken);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

// 🔹 Protected Routes
router.post("/logout", protect, logoutUser);

// 🔹 Utility
router.post("/force-logout", forceLogout);

// 🔹 Google OAuth
router.post("/google", googleAuth);

// 🔹 OTP Auth
router.post("/send-otp", sendOTP);
router.post("/verify-otp", verifyOTP);

export default router;
