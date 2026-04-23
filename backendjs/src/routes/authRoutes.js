import { Router } from "express";

import {
  registerUser,
  loginUser,
  logoutUser,
  refreshToken,
  forceLogout,
  forgotPassword,
  resetPassword,
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

export default router;