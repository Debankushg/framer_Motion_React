const express = require("express");
const router = express.Router();
const Calender = require("../model/canlender.model");

router.get("/calender", async (req, res) => {
  try {
    const calender = await Calender.find();
    res.status(200).json(calender); // Send as JSON
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

router.post("/calender", async (req, res) => {
  try {
    const calender = await Calender.create(req.body);
    res.status(200).json({
      calender, // Calendar data
      status: "success", // Status message
      message: "Meeting has been created", // Additional message
    }); // Send as a single object
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

router.put("/calender/:id", async (req, res) => {
  try {
    const calender = await Calender.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({
      calender,
      status: "success",
      message: "Meeting has been updated",
    });
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

module.exports = router;
