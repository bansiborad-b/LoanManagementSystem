import { User } from "../models/User.js";
// 🔹 Apply for Manager
export const applyForManager = async (req, res) => {
    try {
        if (!req.user) {
            res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
            return;
        }
        const user = (await User.findById(req.user.id));
        if (!user) {
            res.status(404).json({
                success: false,
                message: "User not found",
            });
            return;
        }
        if (user.managerRequest.status !== "none") {
            res.status(400).json({
                success: false,
                message: "Already applied or in process",
            });
            return;
        }
        user.managerRequest.status = "pending";
        await user.save();
        res.json({
            success: true,
            message: "Request sent to admin",
        });
    }
    catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};
