const mongoose = require("mongoose");

const ShiftTransferValuesAndDescSchema = new mongoose.Schema({
    shiftTransferItemId: {
        type: String,
        required: true,
    },
    lineId: {
        type: String,
    },
    title: {
        type: String,
        required: true,
        max: 200
    },
    shift: {
        type: String,
    },
    value: {
        type: String,
    },
    desc: {
        type: String,
        max: 200
    },
    date: {
        type: String,
    },
    
},
    { timestamps: true }
);

module.exports = mongoose.model("ShiftTransferValuesAndDesc", ShiftTransferValuesAndDescSchema);