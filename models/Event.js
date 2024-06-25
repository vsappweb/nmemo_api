const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    allDay: {
        type: Boolean,
        default: false,
    },
    start: {
        type: String,
        required: true
    },
    end: {
        type: String,
        required: true
    },
    desc: {
        type: String,
    },
},
    { timestamps: true }
);

module.exports = mongoose.model("Event", EventSchema);