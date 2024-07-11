const mongoose = require("mongoose");

const gmToolSchema = new mongoose.Schema({
    toolNumber: {
        type: String,
        required: true,
    },
    problem: {
        type: String,
    },
    howFixed: {
        type: String,
    },
    personnelnumber: {
        type: String,
    },
    date: {
        type: String,
    },
    
},
    { timestamps: true }
);

module.exports = mongoose.model("GmTool", gmToolSchema);