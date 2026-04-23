import { Router } from "express";

import {
  getManagerRequests,
  scheduleInterview,
  handleManagerRequest,
  getAllUsers,
  getAllManagers,
} from "../controllers/adminController.js";

import {
  authorizeRoles,
  protect,
} from "../middleware/authMiddleware.js";

const router = Router();

// 🔹 Get all users
router.get(
  "/users",
  protect,
  authorizeRoles("Admin"),
  getAllUsers
);

// 🔹 Get all manager requests
router.get(
  "/requests",
  protect,
  authorizeRoles("Admin"),
  getManagerRequests
);

// 🔹 Schedule interview
router.post(
  "/schedule/:id",
  protect,
  authorizeRoles("Admin"),
  scheduleInterview
);

// 🔹 Approve manager
router.patch(
  "/manager-request/:id",
  protect,
  authorizeRoles("Admin"),
  handleManagerRequest
);

// 🔹 Get all managers
router.get(
  "/managers",
  protect,
  authorizeRoles("Admin"),
  getAllManagers
);

export default router;