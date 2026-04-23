import mongoose from "mongoose";

// 1. Create Schema
const tokenSchema = new mongoose.Schema({
  accessToken: {
    type: String,
    required: true,
  },

  isValid: {
    type: Boolean,
    default: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 60 * 24 * 30, // 30 days TTL
  },
});

// 2. Export Model
const Token = mongoose.model("Token", tokenSchema);

export default Token;