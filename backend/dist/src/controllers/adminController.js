import { User } from "../models/User.js";
// 🔹 Get all users
export const getAllUsers = async (req, res) => {
    try {
        const { role } = req.query;
        const filter = {};
        if (role && typeof role === "string") {
            filter.role = role;
        }
        const users = await User.find(filter).select("-password -refreshToken");
        res.status(200).json({
            success: true,
            count: users.length,
            data: users,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};
// 🔹 Get manager requests
export const getManagerRequests = async (req, res) => {
    try {
        const users = await User.find({
            "managerRequest.status": { $in: ["pending", "interview_scheduled"] },
        }).select("-password");
        res.json({
            success: true,
            data: users,
        });
    }
    catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};
// 🔹 Schedule interview
export const scheduleInterview = async (req, res) => {
    try {
        const { videoLink, interviewTime } = req.body;
        const user = await User.findById(req.params.id);
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        user.managerRequest.status = "interview_scheduled";
        user.managerRequest.videoLink = videoLink;
        user.managerRequest.interviewTime = interviewTime;
        await user.save();
        res.json({
            success: true,
            message: "Interview scheduled",
        });
    }
    catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};
// 🔹 Approve manager
export const approveManager = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        user.role = "Manager";
        user.managerRequest.status = "approved";
        await user.save();
        res.json({
            success: true,
            message: "User promoted to Manager",
        });
    }
    catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};
// 🔹 Reject manager
export const rejectManager = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        user.managerRequest.status = "rejected";
        await user.save();
        res.json({
            success: true,
            message: "Request rejected",
        });
    }
    catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};
