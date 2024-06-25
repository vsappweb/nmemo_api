const mongoose = require("mongoose");

const ShiftTransferSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    line: {
        type: String,
    },
    shiftTransferItems: {
        type: Array,
    },
    date: {
        type: String,
    },
    weekday: {
        type: String,
    },
    weekNumber: {
        type: String,
    },
    shift: {
        type: String,
    },
    operator: {
        type: String,
    },
    message: {
        type: String,
    }
    
},
    { timestamps: true }
);

module.exports = mongoose.model("ShiftTransfer", ShiftTransferSchema);