const express = require("express");
const router = express.Router();
const User = require("../model/user.model"); // Make sure the path is correct

// GET / - Show all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find(); // Fetch all users
    res.status(200).json(users); // Send as JSON
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

module.exports = router;
