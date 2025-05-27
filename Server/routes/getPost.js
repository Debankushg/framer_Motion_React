const express = require("express");
const router = express.Router();
const userModel = require("../model/user.model");

// GET / - Show all users
router.get("/", async (req, res) => {
  try {
    const users = await userModel
      .findOne({ _id: "6835435caaad8b5fb4b3cb59" })
      .populate("posts");
    res.status(200).json(users); // Send as JSON
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

module.exports = router;
