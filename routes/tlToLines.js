const router = require("express").Router();
const TlToLine = require("../models/TlToLine");
const User = require("../models/User");



//add
router.post("/", async (req, res) => {
    const newTlToLine = new TlToLine(req.body);
    try {
        const savedTlToLine = await newTlToLine.save();
        res.status(201).json(savedTlToLine);
    } catch (err) {
        res.status(500).json(err);
    }
});


// update a tlToLine
router.put("/:id", async (req, res) => {
    try {
        const tlToLine = await TlToLine.findById(req.params.id);
            await tlToLine.updateOne({ $set: req.body });
            res.status(202).json("The tlToLine has been updated successfully")
    } catch (err) {
        res.status(500).json(err)
    }
});


// get all tlToLines
router.get('/allTlToLines', async (req, res) => {
    try {
        const tlToLines = await TlToLine.find({});
        const tlToLineMap = {};
        tlToLines.forEach((tlToLine) => {
            tlToLineMap[tlToLine._id] = tlToLine;
        });
        res.status(200).json(tlToLineMap);
    } catch (err) {
        res.status(500).json(err)
    }
});


// delete a tlToLine
router.delete("/:id", async (req, res) => {
    try {
        const tlToLine = await TlToLine.findById(req.params.id);
        if (tlToLine._id == req.params.id) {
            await tlToLine.deleteOne();
            res.status(200).json("The tlToLine has been deleted")
        } else {
            res.status(403).json("You can delete only your tlToLine");
        }

    } catch (err) {
        res.status(500).json(err)
    }
});

// get a tlToLine
router.get("/:id", async (req, res) => {
    try {
        const tlToLine = await TlToLine.findById(req.params.id);
        res.status(200).json(tlToLine);
    } catch (err) {
        res.status(500).json(err)
    }
});


// read a tlToLine
router.put("/:id/isRead", async (req, res) => {
    try {
        const tlToLine = await TlToLine.findById(req.params.id);
        if (!tlToLine.isRead.includes(req.body.userId)) {
            await tlToLine.updateOne({ $push: { isRead: req.body.userId } });
            res.status(200).json("The tlToLine has been read");
        } else {
            await tlToLine.updateOne({ $pull: { isRead: req.body.userId } });
            res.status(200).json("The tlToLine has been not read");
        }

    } catch (err) {
        res.status(500).json(err)
    }
}); 

// like/dislike a post
router.put("/:id/agree", async (req, res) => {
    try {
        const tlToLine = await TlToLine.findById(req.params.id);
        if (!tlToLine.agrees.includes(req.body.userId)) {
            await tlToLine.updateOne({ $push: { agrees: req.body.userId } });
            res.status(200).json("The post has been agreed");
        } else {
            await tlToLine.updateOne({ $pull: { agrees: req.body.userId } });
            res.status(200).json("The post has been disagreed");
        }

    } catch (err) {
        res.status(500).json(err)
    }
})

// like/dislike a post
router.put("/:id/disagree", async (req, res) => {
    try {
        const tlToLine = await TlToLine.findById(req.params.id);
        if (!tlToLine.disagrees.includes(req.body.userId)) {
            await tlToLine.updateOne({ $push: { disagrees: req.body.userId } });
            res.status(200).json("The post has been disagreed");
        } else {
            await tlToLine.updateOne({ $pull: { disagrees: req.body.userId } });
            res.status(200).json("The post has been disdisagreed");
        }

    } catch (err) {
        res.status(500).json(err)
    }
})

// get timeline memos
router.get("/timeline/:userId", async (req, res) => {
    try {
        const currentUser = await User.findById(req.params.userId);
        const userTlToLines = await TlToLine.find({ userId: currentUser._id });
        const friendTlToLines = await Promise.all(
            currentUser.followings.map((friendId) => {
                return TlToLine.find({ userId: friendId })
            })
        );
        res.status(200).json(userTlToLines.concat(...friendTlToLines))
    } catch (err) {
        res.status(500).json(err)
    }
});


module.exports = router