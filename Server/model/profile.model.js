const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    dob: Date,
    gender: String,
    city: String,
    state: String,
    country: String,
    pincode: String,
    mobile: String,
    image: String,
    preference: String,
    skills: [],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Profile", profileSchema);
