const mongoose = require("mongoose");

const StempelSchema = new mongoose.Schema({
    product: {
        type: String,
        required: true,
    },
    productName: {
        type: String,
        required: true,
        max: 200
    },
    stempel: {
        type: String,
    },
    units: {
        type: Array,
        default: []
    },
    desc: {
        type: String,
        max: 200
    },

},
    { timestamps: true }
);

module.exports = mongoose.model("Stempel", StempelSchema);