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
    date: {
        type: String,
    },
    
},
    { timestamps: true }
);

module.exports = mongoose.model("IncompleetAantal", IncompleetAantalSchema);