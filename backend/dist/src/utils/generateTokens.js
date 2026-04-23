import jwt from "jsonwebtoken";
// 🔹 Access Token
export const generateAccessToken = (user) => {
    return jwt.sign({ id: user._id, role: user.role }, process.env.ACCESS_SECRET, // ✅ fix
    { expiresIn: "15m" });
};
// 🔹 Refresh Token
export const generateRefreshToken = (user) => {
    return jwt.sign({ id: user._id }, process.env.REFRESH_SECRET, // ✅ fix
    { expiresIn: "7d" });
};
