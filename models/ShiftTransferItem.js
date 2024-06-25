const mongoose = require("mongoose");

const ShiftTransferItemSchema = new mongoose.Schema({
    shiftTransferId: {
        type: String,
    },
    senderLine: {
        type: String,
    },
    title: {
        type: String,
        required: true,
        max: 200
    },
    value: {
        type: Number,
        enum: [0, 1, 2],
    },
    desc: {
        type: String,
        max: 500
    }
    
},
    { timestamps: true }
);

module.exports = mongoose.model("ShiftTransferItem", ShiftTransferItemSchema);