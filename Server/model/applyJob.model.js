const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String },
  file: { type: String }, // Or adjust to match file storage method
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "JobPost",
    required: true,
  },
  appliedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("JobApplication", applicationSchema);
