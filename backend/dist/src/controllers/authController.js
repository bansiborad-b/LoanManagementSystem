import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import Token from "../models/Token.js";
// 🔹 Generate Tokens
const generateAccessToken = (user) => {
    return jwt.sign({ id: user._id, role: user.role }, process.env.ACCESS_SECRET, { expiresIn: "15m" });
};
const generateRefreshToken = (user) => {
    return jwt.sign({ id: user._id }, process.env.REFRESH_SECRET, { expiresIn: "7d" });
};
// 🔹 REGISTER
export const registerUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        if (!name || !email || !password) {
            res.status(400).json({ message: "All fields required" });
            return;
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(400).json({ message: "User already exists" });
            return;
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        let userRole = "User";
        if (role === "Manager") {
            userRole = "Manager";
        }
        await User.create({
            name,
            email,
            password: hashedPassword,
            role: userRole,
        });
        res.status(201).json({
            success: true,
            message: "User registered successfully",
        });
    }
    catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};
// 🔹 LOGIN
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ message: "Please enter all fields" });
            return;
        }
        const user = await User.findOne({ email });
        if (!user) {
            res.status(400).json({
                message: "You don't have an account. Please register first",
            });
            return;
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(400).json({ message: "Invalid credentials" });
            return;
        }
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);
        await Token.create({
            accessToken,
            isValid: true,
        });
        user.refreshToken = refreshToken;
        await user.save();
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        });
        res.status(200).json({
            message: "Login Successful",
            accessToken,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    }
    catch (err) {
        if (err instanceof Error) {
            console.log(err.message);
        }
        res.status(500).json({ message: "Server error" });
    }
};
// 🔹 REFRESH TOKEN
export const refreshToken = async (req, res) => {
    try {
        const token = req.cookies.refreshToken;
        if (!token) {
            res.status(401).json({ message: "No refresh token" });
            return;
        }
        const decoded = jwt.verify(token, process.env.REFRESH_SECRET);
        const user = await User.findById(decoded.id);
        if (!user || user.refreshToken !== token) {
            res.status(403).json({ message: "Invalid token" });
            return;
        }
        const newAccessToken = generateAccessToken(user);
        res.json({ accessToken: newAccessToken });
    }
    catch (err) {
        res.status(403).json({ message: "Invalid refresh token" });
    }
};
// 🔹 LOGOUT
export const logoutUser = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer")) {
            res.status(200).json({
                success: true,
                redirect: "/login",
            });
            return;
        }
        const token = authHeader.split(" ")[1];
        const tokenDoc = await Token.findOne({ accessToken: token });
        if (tokenDoc && tokenDoc.isValid) {
            tokenDoc.isValid = false;
            await tokenDoc.save();
        }
        res.status(200).json({
            success: true,
            message: "Logged out successfully",
            redirect: "/login",
        });
    }
    catch (error) {
        res.status(500).json({ message: "Logout failed" });
    }
};
// 🔹 FORCE LOGOUT
export const forceLogout = async (req, res) => {
    try {
        const { accessToken } = req.body;
        if (!accessToken) {
            res.status(200).json({
                success: true,
                message: "No token provided",
            });
            return;
        }
        const tokenDoc = await Token.findOne({ accessToken });
        if (!tokenDoc) {
            res.status(200).json({
                success: false,
                message: "Token not found",
            });
            return;
        }
        if (!tokenDoc.isValid) {
            res.status(200).json({
                success: false,
                message: "Token already invalid",
            });
            return;
        }
        tokenDoc.isValid = false;
        await tokenDoc.save();
        res.status(200).json({
            success: true,
            message: "Token invalidated",
        });
    }
    catch (error) {
        console.log("Force logout error:", error);
        res.status(500).json({
            success: false,
            message: "Force logout failed",
        });
    }
};
