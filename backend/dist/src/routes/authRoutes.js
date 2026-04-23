import { Router } from "express";
import { registerUser, loginUser, logoutUser, refreshToken, forceLogout, } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = Router();
// 🔹 Public Routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/refresh", refreshToken);
// 🔹 Protected Routes
router.post("/logout", protect, logoutUser);
// 🔹 Utility
router.post("/force-logout", forceLogout);
export default router;
