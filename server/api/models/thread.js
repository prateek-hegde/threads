const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const moment = require('moment-timezone');
// const dateIndia = moment.tz(Date.now(), "Asia/Calcutta");

const threadSchema = new Schema({
  title: {
    required: true,
    type: String
  },
  body: {
    required: true,
    type: String
  },
  isCompleted: {
    type: Boolean,
    default: false
  },
  userId: {
    required: true,
    type: String
  },
  date: {
    type: String,
    required: true
  }
});

const Thread = mongoose.model("Thread", threadSchema);
module.exports = Thread;
