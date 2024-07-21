const mongoose = require("mongoose");

const IncompleetAantalSchema = new mongoose.Schema({
    productNumber: {
        type: String,
        required: true,
    },
    lineId: {
        type: String,
    },
    operator: {
        type: String,
    },
    hide: {
        type: Boolean,
        default: false,
    },
    date: {
        type: String,
    },
    
},
    { timestamps: true }
);

module.exports = mongoose.model("IncompleetAantal", IncompleetAantalSchema);