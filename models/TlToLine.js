const mongoose = require("mongoose");

const TlToLineSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    line: {
      type: String,
    },
    title: {
      type: String,
      max: 200,
    },
    desc: {
      type: String,
      max: 500,
    },
    img: {
      type: String,
    },
    timer: {
      type: String,
    },
    reqRes: {
      type: Boolean,
      default: false,
    },
    isRead: {
      type: Array,
      default: [],
    },
    agrees: {
      type: Array,
      default: [],
    },
    disagrees: {
      type: Array,
      default: [],
    },
    answer: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("TlToLine", TlToLineSchema);
