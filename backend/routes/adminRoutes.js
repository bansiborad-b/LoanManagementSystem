import express from "express";
import {
  getManagerRequests,
  scheduleInterview,
  approveManager,
  rejectManager,
  getAllUsers
} from "../controllers/adminController.js";

import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get(
  "/users",
  protect,
  authorizeRoles("Admin"),
  getAllUsers
);

// 🔐 Admin-only routes

// Get all manager requests
router.get(
  "/requests",
  protect,
  authorizeRoles("Admin"),
  getManagerRequests
);

// Schedule interview
router.post(
  "/schedule/:id",
  protect,
  authorizeRoles("Admin"),
  scheduleInterview
);

// Approve manager
router.post(
  "/approve/:id",
  protect,
  authorizeRoles("Admin"),
  approveManager
);

// Reject manager
router.post(
  "/reject/:id",
  protect,
  authorizeRoles("Admin"),
  rejectManager
);

export default router;