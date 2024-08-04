const mongoose = require("mongoose");

const ToolSchema = new mongoose.Schema(
  {
    toolNumber: {
      type: String,
      required: true,
    },
    maintenance: {
      type: Number,
    },
    howOftenUse: {
      type: Number,
    },
    productName: {
      type: Array,
      default: [],
    },
    desc: {
      type: String,
      max: 200,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Tool", ToolSchema);
