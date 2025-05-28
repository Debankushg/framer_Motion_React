// routes/user.js
const express = require("express");
const router = express.Router();
const UserProfile = require("../model/profile.model");
const User = require("../model/user.model"); // Import your User model

// Create profile
router.put("/profile/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    const updatedProfile = await UserProfile.findOneAndUpdate(
      { user: userId },
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedProfile) {
      return res.status(404).json({ error: "Profile not found" });
    }

    res.json(updatedProfile);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get profile by email (via User model, then populate)
router.get("/profile/:userId", async (req, res) => {
  const mongoose = require("mongoose");
  try {
    const userId = req.params.userId;

    // Optional: check if userId is valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    let profile = await UserProfile.findOne({ user: userId }).populate(
      "user",
      "fullname email image"
    );

    if (!profile) {
      profile = new UserProfile({ user: userId });
      await profile.save();
      profile = await profile.populate("user", "fullname email image");
    }

    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
