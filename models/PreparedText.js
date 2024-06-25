const mongoose = require("mongoose");

const PreparedTextSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        max: 200
    }
},
    { timestamps: true }
);

module.exports = mongoose.model("PreparedText", PreparedTextSchema);