const express = require("express");
const router = express.Router();
const JobPost = require("../model/jobPost.model");
const JobApplication = require("../model/applyJob.model");

// GET whole Job List

router.get("/appliedJobs", async (req, res, next) => {
  try {
    const applications = await JobApplication.find().lean();

    if (!applications.length) {
      return res.status(404).json({ error: "No applications found" });
    }

    const jobIds = [
      ...new Set(applications.map((app) => app.jobId.toString())),
    ];

    const jobs = await JobPost.find({ _id: { $in: jobIds } })
      .select("jobTitle position department skills")
      .lean();

    const jobMap = {};
    jobs.forEach((job) => {
      jobMap[job._id.toString()] = job;
    });

    const updatedData = applications.map(({ jobId, ...rest }) => ({
      ...rest,
      jobTitle: jobMap[jobId.toString()]?.jobTitle,
      position: jobMap[jobId.toString()]?.position,
      department: jobMap[jobId.toString()]?.department,
      skills: jobMap[jobId.toString()]?.skills,
    }));

    res.json(updatedData);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
