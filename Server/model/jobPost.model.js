const mongoose = require("mongoose");

const jobPostSchema = new mongoose.Schema({
  jobTitle: {
    type: String,
    required: true,
    trim: true,
  },
  position: {
    type: String,
    required: true,
    trim: true,
  },
  department: {
    type: String,
    required: true,
    trim: true,
  },
  vacancies: {
    type: Number,
    required: true,
    min: 1,
  },
  closingDate: {
    type: Date,
    required: true,
  },
  skills: {
    type: [String],
    required: true,
    validate: {
      validator: (arr) => arr.length > 0,
      message: "At least one skill is required",
    },
  },
  jobDescription: {
    type: String,
    required: true,
    trim: true,
  },
  jobPostAuthor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const JobPost = mongoose.model("JobPost", jobPostSchema);

module.exports = JobPost;
