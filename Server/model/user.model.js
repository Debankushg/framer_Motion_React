const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String, // URL as string
      default: "", // optional default
    },
    posts: {
      type: [String], // array of strings; you can change this to array of objects if posts have structure
      default: [],
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt fields automatically
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
