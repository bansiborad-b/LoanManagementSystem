import mongoose from "mongoose";

// 🔹 Schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["Admin", "Manager", "User"],
      default: "User",
    },

    refreshToken: {
      type: String,
    },
    resetPasswordToken: {
      type: String,
    },

    resetPasswordExpire: {
      type: Date,
    },

    managerRequest: {
      status: {
        type: String,
        enum: [
          "none",
          "pending",
          "interview_scheduled",
          "approved",
          "rejected",
        ],
        default: "none",
      },

      videoLink: {
        type: String,
        default: "",
      },

      interviewTime: {
        type: Date,
      },
    },
  },
  {
    timestamps: true,
  },
);

// 🔹 Export Model
export const User = mongoose.model("User", userSchema);
