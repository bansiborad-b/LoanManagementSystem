import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";

import client from "../config/twilio.js";

import { User } from "../models/User.js";
import Token from "../models/Token.js";
import { sendEmail } from "../utils/sendEmail.js";

import dotenv from "dotenv";
import { log } from "console";
dotenv.config();

// 🔹 Generate Access Token
const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.ACCESS_SECRET,
    { expiresIn: "15m" },
  );
};

// 🔹 Generate Refresh Token
const generateRefreshToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.REFRESH_SECRET, {
    expiresIn: "7d",
  });
};

// 🔹 REGISTER
export const registerUser = async (req, res) => {
  try {
    const { name, email, mobile, password, role } = req.body;

    if (!name || !email || !mobile || !password) {
      return res.status(400).json({
        message: "All fields required",
      });
    }

    // ✅ Mobile validation
    const mobileRegex = /^[0-9]{10}$/;

    if (!mobileRegex.test(mobile)) {
      return res.status(400).json({
        message: "Invalid mobile number",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // ✅ Check existing mobile
    const existingMobile = await User.findOne({ mobile });

    if (existingMobile) {
      return res.status(400).json({
        message: "Mobile number already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    let userRole = "User";

    if (role === "Manager") {
      userRole = "Manager";
    }

    await User.create({
      name,
      email,
      mobile,
      password: hashedPassword,
      role: userRole,
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

// 🔹 LOGIN
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
      return res.status(400).json({
        message: "Invalid credentials",
      });
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
  } catch (err) {
    console.log(err.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// 🔹 FORGOT PASSWORD
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // 1. Check email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // 2. Generate raw token
    const resetToken = crypto.randomBytes(32).toString("hex");

    // 3. Hash token
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    // 4. Save hashed token
    user.resetPasswordToken = hashedToken;

    // 15 mins expiry
    user.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

    await user.save();

    // 5. Reset URL
    const resetUrl = `${process.env.VITE_API_URL}/reset-password/${resetToken}`;

    // 6. Email HTML
    const message = `
<!DOCTYPE html style="background:#0f0f0f;font-family:Arial,sans-serif;" lang="en">
<html style="background:#0f0f0f;font-family:Arial,sans-serif;" lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Reset Your Password</title>
  </head>

  <body style="margin:0;padding:0;background:#0f0f0f;font-family:Arial,sans-serif;">

    <div style="max-width:600px;margin:40px auto;background:#1a1a1a;padding:30px;border-radius:10px;color:#ffffff;">

      <h2 style="text-align:center;color:#ffffff;">
        🔐 Password Reset Request
      </h2>

      <p style="font-size:14px;color:#ccc;line-height:1.6;">
        We received a request to reset your password. If this was you, click the button below to proceed.
      </p>

      <div style="text-align:center;margin:30px 0;">
        <a href="${resetUrl}"
           style="
             background:#ffffff;
             color:#000;
             padding:12px 24px;
             text-decoration:none;
             border-radius:6px;
             font-weight:bold;
             display:inline-block;
           ">
          Reset Password
        </a>
      </div>

      <p style="font-size:13px;color:#aaa;line-height:1.5;">
        This link will expire in <b>15 minutes</b> for security reasons.
      </p>

      <p style="font-size:13px;color:#aaa;line-height:1.5;">
        If you didn’t request this, you can safely ignore this email.
      </p>

      <hr style="border:0;border-top:1px solid #333;margin:20px 0;" />

      <p style="font-size:12px;color:#777;text-align:center;">
        © ${new Date().getFullYear()} FinTech. All rights reserved.
      </p>

      <p style="font-size:11px;color:#555;text-align:center;word-break:break-all;">
        Or copy and paste this link:<br/>
        ${resetUrl}
      </p>

    </div>

  </body>
</html>
`;
    // 7. Send email
    await sendEmail({
      email: user.email,
      subject: "Password Reset",
      message,
    });

    res.status(200).json({
      success: true,
      message: "Reset link sent to email",
      resetToken: resetToken, // For testing purposes only. Remove in production.
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// 🔹 RESET PASSWORD
export const resetPassword = async (req, res) => {
  try {
    const { password } = req.body;

    const token = req.params.token;

    if (!token) {
      return res.status(400).json({
        message: "Token is required",
      });
    }

    // 1. Hash incoming token
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    // 2. Find user
    const user = await User.findOne({
      resetPasswordToken: hashedToken,

      resetPasswordExpire: {
        $gt: Date.now(),
      },
    });

    // 3. Invalid token
    if (!user) {
      return res.status(400).json({
        message: "Invalid or expired token",
      });
    }

    // 4. Hash new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 5. Update password
    user.password = hashedPassword;

    // 6. Clear reset fields
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Password reset successful",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};
// 🔹 REFRESH TOKEN
export const refreshToken = async (req, res) => {
  try {
    const token = req.cookies.refreshToken;

    if (!token) {
      return res.status(401).json({
        message: "No refresh token",
      });
    }

    const decoded = jwt.verify(token, process.env.REFRESH_SECRET);

    const user = await User.findById(decoded.id);

    if (!user || user.refreshToken !== token) {
      return res.status(403).json({
        message: "Invalid token",
      });
    }

    const newAccessToken = generateAccessToken(user);

    res.json({
      accessToken: newAccessToken,
    });
  } catch (err) {
    res.status(403).json({
      message: "Invalid refresh token",
    });
  }
};

// 🔹 LOGOUT
export const logoutUser = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer")) {
      return res.status(200).json({
        success: true,
        redirect: "/login",
      });
    }

    const token = authHeader.split(" ")[1];

    const tokenDoc = await Token.findOne({
      accessToken: token,
    });

    if (tokenDoc && tokenDoc.isValid) {
      tokenDoc.isValid = false;

      await tokenDoc.save();
    }

    res.status(200).json({
      success: true,
      message: "Logged out successfully",
      redirect: "/login",
    });
  } catch (error) {
    res.status(500).json({
      message: "Logout failed",
    });
  }
};

// 🔹 FORCE LOGOUT
export const forceLogout = async (req, res) => {
  try {
    const { accessToken } = req.body;

    if (!accessToken) {
      return res.status(200).json({
        success: true,
        message: "No token provided",
      });
    }

    const tokenDoc = await Token.findOne({
      accessToken,
    });

    if (!tokenDoc) {
      return res.status(200).json({
        success: false,
        message: "Token not found",
      });
    }

    if (!tokenDoc.isValid) {
      return res.status(200).json({
        success: false,
        message: "Token already invalid",
      });
    }

    tokenDoc.isValid = false;

    await tokenDoc.save();

    res.status(200).json({
      success: true,
      message: "Token invalidated",
    });
  } catch (error) {
    console.log("Force logout error:", error);

    res.status(500).json({
      success: false,
      message: "Force logout failed",
    });
  }
};

// 🔹 GOOGLE AUTH
export const googleAuth = async (req, res) => {
  try {
    const { access_token } = req.body;

    const response = await fetch(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      },
    );

    const payload = await response.json();

    const { email, name } = payload;

    let user = await User.findOne({ email });

    if (!user) {
      const randomPassword = crypto.randomBytes(20).toString("hex");

      const hashedPassword = await bcrypt.hash(randomPassword, 10);

      user = await User.create({
        name,
        email,
        password: hashedPassword,
        role: "User",
      });
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

    return res.status(200).json({
      success: true,
      message: "Google Login Successful",
      accessToken,

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.log("Google Auth Error:", error);

    return res.status(500).json({
      success: false,
      message: "Google authentication failed",
    });
  }
};

// 🔹 SEND OTP
export const sendOTP = async (req, res) => {
  try {
    const { mobile } = req.body;

    if (!mobile) {
      return res.status(400).json({
        success: false,
        message: "Mobile number is required",
      });
    } 
    console.log("MOBILE:", req.body.mobile);
console.log("SERVICE SID:", process.env.TWILIO_VERIFY_SERVICE_SID);

    const phonenumber = `+91${mobile}`;

 const verification = await client.verify.v2
      .services(process.env.TWILIO_VERIFY_SERVICE_SID)
      .verifications.create({
        to: phonenumber,
        channel: "sms",
      });

      console.log("Twilio Response:", verification);

    return res.status(200).json({
      success: true,
      message: "OTP sent successfully",
    });
  } catch (error) {
    console.log("Send OTP Error:", error);
    if (error.code === 60203) {
    return res.status(429).json({
      success: false,
      message: "You have reached the limit. Please try again.",
    });
  }

    return res.status(500).json({
      success: false,
      message: "Failed to send OTP",
    });
  } 
};

// 🔹 VERIFY OTP
export const verifyOTP = async (req, res) => {
  try {
    const { mobile, code } = req.body;

    if (!mobile || !code) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const phonenumber = `+91${mobile}`;
    const verificationCheck = await client.verify.v2
      .services(process.env.TWILIO_VERIFY_SERVICE_SID)
      .verificationChecks.create({
        to: phonenumber,
        code,
      });

    if (verificationCheck.status !== "approved") {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    let user = await User.findOne({ mobile });

    if (!user) {
      user = await User.create({
        name: `User${mobile.slice(-4)}`,
        email: `${mobile}@mobileusers.com`,
        mobile,
        password: crypto.randomBytes(20).toString("hex"),
        role: "User",
      });
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

    return res.status(200).json({
      success: true,
      message: "OTP verified successfully",
      accessToken,

      user: {
        id: user._id,
        mobile: user.mobile,
        role: user.role,
      },
    });
  } catch (error) {
    console.log("Verify OTP Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to verify OTP",
    });
  }
};
