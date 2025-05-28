const mongoose = require("mongoose");

const userInfoSchema = new mongoose.Schema(
  {
    companyName: { type: String, required: true },
    foundationYear: { type: Number, required: true },
    employeeName: { type: String, required: true },
    joiningDate: { type: Date, required: true },
    department: { type: String, required: true },
    image: { type: String }, // store filename or URL here
  },
  { timestamps: true }
);

module.exports = mongoose.model("UserInfo", userInfoSchema);
