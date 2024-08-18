const mongoose = require("mongoose");

const ActualOrderSchema = new mongoose.Schema(
  {
    productNumber: {
      type: String,
      required: true,
    },
    orderNumber: {
      type: String,
    },
    userId: {
      type: String,
      required: true,
    },
    posNumber: {
      type: String,
    },
    amount: {
      type: Number,
      min: 0,
    },
    dateStart: {
      type: String,
    },
    dateEnd: {
      type: String,
    },
    status: {
      type: String,
    },
    show: {
      type: Boolean,
      default: true,
    },
    orderAdded: {
      type: Boolean,
      default: false,
    },
    desc: {
      type: String,
      max: 200,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ActualOrder", ActualOrderSchema);
