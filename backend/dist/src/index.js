import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import express from "express";
// 🔹 Routes
import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import userRoutes from "./routes/userRoutes.js";
// 🔹 Middleware
import { errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
// 🔹 Middleware
// 🔹 Load environment variables
dotenv.config();
// 🔹 Connect Database
connectDB();
const app = express();
// 🔹 Core Middleware
app.use(express.json());
app.use(cookieParser());
// 🔹 CORS Configuration
// app.use(
//   cors({
//     origin: process.env.VITE_API_URL as string,
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//   })
// );
app.use(cors({
    origin: process.env.VITE_API_URL_TS,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
// 🔹 Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/user", userRoutes);
// 🔹 Health Check Route
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Backend Running Successfully...",
    });
});
// 🔹 Global Error Handler (MUST BE LAST)
app.use(errorHandler);
// 🔹 Start Server
const PORT = Number(process.env.PORT) || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
