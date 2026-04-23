import { Router } from "express";
import { applyForManager } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = Router();
// 🔐 User routes
router.post("/apply-manager", protect, applyForManager);
export default router;
