import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import express from "express"


// 🔹 Routes
import authRoutes from "./routes/authRoutes.ts";
import adminRoutes from "./routes/adminRoutes.ts";
import userRoutes from "./routes/userRoutes.ts";

// 🔹 Middleware
import { errorHandler } from "./middleware/errorMiddleware.ts";
import connectDB from "./config/db.ts";
import type { Application, Request, Response } from "express";

// 🔹 Middleware

// 🔹 Load environment variables
dotenv.config();

// 🔹 Connect Database
connectDB();

const app: Application = express();

// 🔹 Core Middleware
app.use(express.json());
app.use(cookieParser());

// 🔹 CORS Configuration


app.use(
  cors({
    origin: process.env.VITE_API_URL_TS as string,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// 🔹 Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/user", userRoutes);

// 🔹 Health Check Route
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Backend Running Successfully...",
  });
});

// 🔹 Global Error Handler (MUST BE LAST)
app.use(errorHandler);

// 🔹 Start Server
const PORT: number = Number(process.env.PORT) || 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});