import { User } from "../models/User.js";

// 🔹 Apply for Manager
export const applyForManager = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.managerRequest.status !== "none") {
      return res.status(400).json({
        success: false,
        message: "Already applied or in process",
      });
    }

    user.managerRequest.status = "pending";

    await user.save();

    res.json({
      success: true,
      message: "Request sent to admin",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};