import jwt from "jsonwebtoken";
import User from "../models/User.js"

// 🔐 Protect Route (Authentication)
export const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Check token exists
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(401).json({
      success: false,
      message: "No token, authorization denied",
    });
  }

  try {
    // Extract token
    const token = authHeader.split(" ")[1];

    // Verify token
    const decoded = jwt.verify(token, process.env.ACCESS_SECRET);

    // 🔥 Check user exists in DB
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found (maybe deleted)",
      });
    }

    // Attach fresh user data
    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};
// 🔐 Role-Based Authorization
export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      return res.status(401).json({
        success: false,
        message: "Not authorized",
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    next();
  };
};