const router = require("express").Router();
const PreparedText = require("../models/PreparedText");

//add a preparedText
router.post("/", async (req, res) => {
    const newPreparedText = new PreparedText(req.body);
    try {
        const savedPreparedText = await newPreparedText.save();
        res.status(201).json(savedPreparedText);
    } catch (err) {
        res.status(500).json(err);
    }
});

// update a preparedText
router.put("/:id", async (req, res) => {
    try {
        const preparedText = await PreparedText.findById(req.params.id);
            await preparedText.updateOne({ $set: req.body });
            res.status(202).json("The preparedText has been updated successfully")
    } catch (err) {
        res.status(500).json(err)
    }
});

// get all preparedTexts
router.get('/allPreparedTexts', async (req, res) => {
    try {
        const preparedTexts = await PreparedText.find({});
        const preparedTextMap = {};
        preparedTexts.forEach((preparedText) => {
            preparedTextMap[preparedText._id] = preparedText;
        });
        res.status(200).json(preparedTextMap);
    } catch (err) {
        res.status(500).json(err)
    }
});

// delete a preparedText
router.delete("/:id", async (req, res) => {
    try {
        const preparedText = await PreparedText.findById(req.params.id);
        if (preparedText._id == req.params.id) {
            await preparedText.deleteOne();
            res.status(200).json("The prepared text has been deleted")
        } else {
            res.status(403).json("You can delete only your prepared text");
        }

    } catch (err) {
        res.status(500).json(err)
    }
});

// get a preparedText
router.get("/:id", async (req, res) => {
    try {
        const preparedText = await PreparedText.findById(req.params.id);
        res.status(200).json(preparedText);
    } catch (err) {
        res.status(500).json(err)
    }
});


module.exports = router