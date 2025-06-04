const mongoose = require("mongoose");

const meetingDateSchema = new mongoose.Schema({
  start: {
    type: String,
    required: true,
  },
  end: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("MeetingData", meetingDateSchema);
