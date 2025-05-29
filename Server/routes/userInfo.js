const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const router = express.Router();
const UserInfo = require("../model/userInfo.model");

// Multer storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "./photos"),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (["image/jpeg", "image/png"].includes(file.mimetype)) cb(null, true);
    else cb(new Error("Only jpg, jpeg, png files are allowed"));
  },
});

// CREATE new user info (with optional image)
router.post("/", upload.single("employeeImage"), async (req, res) => {
  try {
    const {
      companyName,
      foundationYear,
      employeeName,
      joiningDate,
      department,
    } = req.body;

    const newUserInfo = new UserInfo({
      companyName,
      foundationYear,
      employeeName,
      joiningDate,
      department,
      image: req.file
        ? `http://localhost:3000/photos/${req.file.filename}`
        : null,
    });

    await newUserInfo.save();
    res.status(201).json(newUserInfo);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating user info", error: error.message });
  }
});

// UPDATE existing user info by ID (with optional image update)
router.put("/:id", upload.single("employeeImage"), async (req, res) => {
  try {
    const { id } = req.params;
    const {
      companyName,
      foundationYear,
      employeeName,
      joiningDate,
      department,
    } = req.body;

    const userInfo = await UserInfo.findById(id);
    if (!userInfo)
      return res.status(404).json({ message: "User info not found" });

    // Delete old image if new one uploaded
    if (req.file && userInfo.image) {
      const oldImagePath = path.join(__dirname, "../photos", userInfo.image);
      if (fs.existsSync(oldImagePath)) fs.unlinkSync(oldImagePath);
    }

    // Update fields
    userInfo.companyName = companyName ?? userInfo.companyName;
    userInfo.foundationYear = foundationYear ?? userInfo.foundationYear;
    userInfo.employeeName = employeeName ?? userInfo.employeeName;
    userInfo.joiningDate = joiningDate ?? userInfo.joiningDate;
    userInfo.department = department ?? userInfo.department;
    if (req.file)
      userInfo.image = `http://localhost:3000/photos/${req.file.filename}`;

    await userInfo.save();
    res.json(userInfo);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating user info", error: error.message });
  }
});

//GET the list of all user info
router.get("/", async (req, res) => {
  try {
    let allUsers = await UserInfo.find();
    const { search } = req.query;

    if (search) {
      const searchLower = search.toLowerCase();
      allUsers = allUsers.filter(
        (user) =>
          user.companyName.toLowerCase().includes(searchLower) ||
          user.employeeName.toLowerCase().includes(searchLower) ||
          user.department.toLowerCase().includes(searchLower)
      );
    }
    res.json(allUsers);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching user info", error: error.message });
  }
});

module.exports = router;
