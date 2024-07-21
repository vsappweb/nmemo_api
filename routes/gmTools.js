const router = require("express").Router();
const GmTool = require("../models/GmTool");
const User = require("../models/User");


//create a shift transfer values and descriptions
router.post("/", async (req, res) => {
    const newGmTool = new GmTool(req.body);
    try {
        const savedGmTool = await newGmTool.save();
        res.status(201).json(savedGmTool);
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
});

// get all shift Transfers Values And Descriptions
router.get('/allGmTool', async (req, res) => {
    try {
        const gmTool = await GmTool.find({});
        const gmToolMap = {};
        gmTool.forEach((gmTool) => {
            gmToolMap[gmTool._id] = gmTool;
        });
        res.status(200).json(gmToolMap);
    } catch (err) {
        res.status(500).json(err)
    }
});


module.exports = router