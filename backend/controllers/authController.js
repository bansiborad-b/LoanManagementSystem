import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


// Generate Tokens
const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.ACCESS_SECRET,
    { expiresIn: "15m" }
  );
};

const generateRefreshToken = (user) => {
  return jwt.sign(
    { id: user._id },
    process.env.REFRESH_SECRET,
    { expiresIn: "7d" }
  );
};

// REGISTER
// export const registerUser = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     if (!name || !email || !password) {
//       return res.status(400).json({ message: "All fields required" });
//     }

//     // ❗ Prevent admin creation from frontend
//     if (role === "admin") {
//       return res.status(403).json({ message: "Not allowed" });
//     }

//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const user = await User.create({
//       name,
//       email,
//       password: hashedPassword,
//       role: "User", // default safe
//     });

//     res.status(201).json({
//       message: "User registered successfully",
//     });

//   } catch (error) {
//     console.log("REGISTER ERROR:", error);

//     if (error.code === 11000) {
//       return res.status(400).json({ message: "Email already exists" });
//     }

//     res.status(500).json({ message: "Server Error" });
//   }
// };

// export const registerUser = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     if (!name || !email || !password) {
//       return res.status(400).json({ message: "All fields required" });
//     }

//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     await User.create({
//       name,
//       email,
//       password: hashedPassword,
//       role: "User", 
//     });

//     res.status(201).json({
//       message: "User registered successfully",
//     });

//   } catch (error) {
//     console.log("REGISTER ERROR:", error);
//     res.status(500).json({ message: "Server Error" });
//   }
// };

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // 🔥 Allowed roles (NO ADMIN from frontend)
    let userRole = "User";

    if (role && role === "Manager") {
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

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// LOGIN
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Please enter all fields",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "You don't have an account. Please register first",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // 🔥 Tokens
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    // Save refresh token in DB
    user.refreshToken = refreshToken;
    await user.save();

    // Send refresh token in cookie
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

  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// REFRESH TOKEN
export const refreshToken = async (req, res) => {
  try {
    const token = req.cookies.refreshToken;

    if (!token) {
      return res.status(401).json({ message: "No refresh token" });
    }

    const decoded = jwt.verify(token, process.env.REFRESH_SECRET);

    const user = await User.findById(decoded.id);

    if (!user || user.refreshToken !== token) {
      return res.status(403).json({ message: "Invalid token" });
    }

    const newAccessToken = generateAccessToken(user);

    res.json({ accessToken: newAccessToken });

  } catch (err) {
    res.status(403).json({ message: "Invalid refresh token" });
  }
};

// LOGOUT
export const logoutUser = async (req, res) => {
  try {
    
    const token = req.cookies.refreshToken;

    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.REFRESH_SECRET);

        const user = await User.findById(decoded.id);

        if (user) {
          user.refreshToken = null;
          await user.save();
        }
      } catch (err) {
        // 🔥 ignore invalid token
        console.log("Token already invalid or user deleted");
      }
    }

    res.clearCookie("refreshToken");

    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });

  } catch (err) {
    res.status(500).json({ message: "Logout failed" });
  }
};