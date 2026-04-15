import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { applyForManager } from "../controllers/userController.js";

const router = express.Router();

// 🔐 User routes
router.post("/apply-manager", protect, applyForManager);

export default router;