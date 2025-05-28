const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const router = express.Router();

// Your User model (adjust the path and schema as per your app)
const User = require("../model/user.model");

// Multer setup (same as before)
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "./photos"),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (["image/jpeg", "image/png", "image/jpg"].includes(file.mimetype))
      cb(null, true);
    else cb(new Error("Only jpg, jpeg, png files are allowed"));
  },
});

// Route to upload and update image for a user
router.put(
  "/upload-image/:userId",
  upload.single("image"),
  async (req, res) => {
    try {
      const userId = req.params.userId;

      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      // Find user in DB
      const user = await User.findById(userId);
      if (!user) return res.status(404).json({ message: "User not found" });

      // Delete old image file if exists (optional)
      if (user.image) {
        const oldImagePath = path.join(__dirname, "../photos", user.image);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }

      const imageUrl = `http://localhost:3000/photos/${req.file.filename}`;
      // Update user image field with new filename
      user.image = imageUrl;
      await user.save();

      res.json({
        message: "Image uploaded and user profile updated successfully",
        filename: req.file.filename,
        url: `http://localhost:3000/photos/${req.file.filename}`, // <-- relative URL for frontend
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  }
);

module.exports = router;
