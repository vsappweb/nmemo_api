const mongoose = require("mongoose");

const MemoSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    line: {
      type: String,
    },
    product: {
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
    likes: {
      type: Array,
      default: [],
    },
    loves: {
      type: Array,
      default: [],
    },
    date: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Memo", MemoSchema);
