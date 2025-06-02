const express = require("express");
const router = express.Router();
const JobPost = require("../model/jobPost.model");
const User = require("../model/user.model");
const JobApplication = require("../model/applyJob.model");

const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./documents"); // You can adjust folder name
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

const fileFilter = (req, file, cb) => {
  const allowed = /pdf|docx?/i;
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowed.test(ext)) {
    cb(null, true);
  } else {
    cb(new Error("Only PDF and DOCX files are allowed"));
  }
};

// POST create new job post
router.post("/", async (req, res, next) => {
  try {
    const {
      jobTitle,
      position,
      department,
      vacancies,
      closingDate,
      skills,
      jobDescription,
      jobPostAuthor,
    } = req.body;

    // Basic validation (can improve or move to middleware)
    if (
      !jobTitle ||
      !position ||
      !department ||
      !vacancies ||
      !closingDate ||
      !skills ||
      !skills.length ||
      !jobDescription ||
      !jobPostAuthor
    ) {
      return res
        .status(400)
        .json({ error: "Please provide all required fields" });
    }

    // Create the job post
    const createdPost = await JobPost.create({
      jobTitle,
      position,
      department,
      vacancies,
      closingDate,
      skills,
      jobDescription,
      jobPostAuthor,
    });

    // Optionally push post ref to user.posts array if exists
    const user = await User.findById(jobPostAuthor);
    if (user) {
      user.posts = user.posts || [];
      user.posts.push(createdPost._id);
      await user.save();
    }

    res.status(200).json(createdPost);
  } catch (error) {
    next(error);
  }
});

// GET all job posts, populated with author info
router.get("/", async (req, res, next) => {
  try {
    const { limit, offset, search, position, sortOrder } = req.query;
    const query = {};

    if (search) {
      query.jobTitle = { $regex: search, $options: "i" };
    }

    if (position) {
      const escaped = position.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const regexStr = escaped.split(" ").join("\\s*");
      query.position = { $regex: regexStr, $options: "i" };
    }

    // Determine sort order
    const sort = { createdAt: sortOrder === "asc" ? 1 : -1 };

    // Convert offset and limit to numbers
    const skip = parseInt(offset) || 0;
    const lim = parseInt(limit) || 10;

    // Execute query with populate, sorting, pagination
    const posts = await JobPost.find(query)
      .populate("jobPostAuthor", "fullname email -_id")
      .sort(sort)
      .skip(skip)
      .limit(lim);

    // Optionally, send total count for frontend pagination
    const totalCount = await JobPost.countDocuments(query);

    res.json({
      totalCount,
      posts,
    });
  } catch (error) {
    next(error);
  }
});

// Job post details By id
const mongoose = require("mongoose");

router.get("/:id", async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: "Invalid job post ID" });
    }

    const post = await JobPost.findById(req.params.id).populate(
      "jobPostAuthor",
      "fullname email -_id"
    );

    if (!post) {
      return res.status(404).json({ error: "Job post not found" });
    }
    res.json(post);
  } catch (error) {
    next(error);
  }
});

// apply for job post
const upload = multer({ storage, fileFilter });
router.post("/apply", upload.single("file"), async (req, res, next) => {
  try {
    const data = req.body;
    const post = await JobPost.findById(data.jobId);
    if (!post) {
      return res.status(404).json({ error: "Job post not found" });
    }
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const docUrl = `http://localhost:3000/documents/${req.file.filename}`;
    const fileName = req.file.filename;
    // newApplication.file = docUrl;
    const newApplication = new JobApplication({
      ...data,
      jobId: post._id,
      file: docUrl,
      fileName: fileName,
    });

    await newApplication.save();

    res.status(200).json({
      message: "Applied successfully",
      application: {
        ...newApplication.toObject(),
        fileName,
        fileUrl: docUrl,
      },
    });
  } catch (error) {
    next(error);
  }
});

// applied Job List By user id
router.get("/appliedJobs/:jobId", async (req, res, next) => {
  try {
    const applications = await JobApplication.find({
      jobId: req.params.jobId,
    });

    if (!applications) {
      return res.status(404).json({ error: "Job post not found" });
    }

    let jobDetails = await JobPost.findById(req.params.jobId)
      .select("jobTitle position department skills -_id")
      .populate("department skills") // populate only refs
      .lean();

    const updatedData = applications.map((application) => {
      const { jobId, ...rest } = application.toObject(); // exclude jobId here
      return {
        ...rest,
        jobTitle: jobDetails.jobTitle,
        position: jobDetails.position,
        department: jobDetails.department,
        skills: jobDetails.skills,
      };
    });

    res.json(updatedData);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
