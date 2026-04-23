import { User } from "../models/User.js";

// 🔹 Get all users
export const getAllUsers = async (req, res) => {
  try {
    const { role } = req.query;

    const filter = {};

    if (role && typeof role === "string") {
      filter.role = role;
    }

    const users = await User.find(filter).select(
      "-password -refreshToken"
    );

    res.status(200).json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// 🔹 Get manager requests it will get only the requested manager list
export const getManagerRequests = async (req, res) => {
  try {
    const users = await User.find({
      "managerRequest.status": {
        $in: ["pending", "interview_scheduled"],
      },
    }).select("-password");

    res.json({
      success: true,
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};


// 🔹 Schedule interview
export const scheduleInterview = async (req, res) => {
  try {
    const { videoLink, interviewTime } = req.body;

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.managerRequest.status = "interview_scheduled";
    user.managerRequest.videoLink = videoLink;
    user.managerRequest.interviewTime = interviewTime;

    await user.save();

    res.json({
      success: true,
      message: "Interview scheduled",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

// 🔹 Approve/Reject manager request
export const handleManagerRequest = async (req, res) => {
  try {
    const { status } = req.body;

    // Validate status
    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status",
      });
    }

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Update request status
    user.managerRequest.status = status;

    // If approved → promote to Manager
    if (status === "approved") {
      user.role = "Manager";
    }

    await user.save();

    res.status(200).json({
      success: true,
      message:
        status === "approved"
          ? "User promoted to Manager"
          : "Manager request rejected",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};


// get all managers data
export const getAllManagers = async (req, res) => {
  try {
    const managers = await User.find({ role: "Manager" });

    res.status(200).json({
      success: true,
      count: managers.length,
      managers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};