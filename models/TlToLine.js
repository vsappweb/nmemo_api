const mongoose = require("mongoose");

const TlToLineSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    line: {
        type: String,
    },
    title: {
        type: String,
        max: 200
    },
    desc: {
        type: String,
        max: 500
    },
    img: {
        type: String
    },
    timer: {
        type: String
    },
    isRead: {
        type: Array,
        default: []
    },

},
    { timestamps: true }
);

module.exports = mongoose.model("TlToLine", TlToLineSchema);