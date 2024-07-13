const router = require("express").Router();
const Stempel = require("../models/Stempel");
const User = require("../models/User");

// router.get("/", (req, res) => {
//     console.log("Welcome to shift transfer page!")
// });

//create a shift transfer values and descriptions
router.post("/", async (req, res) => {
    const newStempel = new Stempel(req.body);
    try {
        const savedStempel = await newStempel.save();
        res.status(201).json(savedStempel);
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
});

// update a shift transfer values and descriptions
router.put("/:id", async (req, res) => {
    try {
        const Stempels = await Stempel.findById(req.params.id);
        // if (Stempel.lineId === req.body.lineId) {
            await Stempels.updateOne({ $set: req.body });
            res.status(204).json("The shift transfer values and descriptions has been updated")
        // } else {
        //     res.status(403).json("You can update only your shift transfer values and descriptions");
        // }

    } catch (err) {
        res.status(500).json(err)
    }
});

// delete a shift transfer
router.delete("/:shiftTransferItemId", async (req, res) => {
    try {
        const Stempels = await Stempel.findById(req.params.shiftTransferItemId);
        if (Stempels) {
            if (Stempels.lineId == req.body.lineId) {
                await Stempels.deleteOne();
                res.status(204).json("The post of shift transfer has been deleted")
            } else {
                res.status(403).json("You can delete only your shift transfer");
            }
        } else {
            res.status(404).json("The shift transfer values and descriptions not found");
        }
    } catch (err) {
        res.status(500).json(err)
    }
});


// get user's all posts
router.get("/profile/:personnelnumber", async (req, res) => {
    try {
        const user = await User.findOne({ personnelnumber: req.params.personnelnumber });
        const ShiftTransferItems = await ShiftTransferItems.find({ lineId: user._id });
        res.status(200).json(ShiftTransferItems);
    } catch (err) {
        res.status(500).json(err);
    }
});

// get all shift Transfers Values And Descriptions
router.get('/allStempels', async (req, res) => {
    try {
        const stempel = await Stempel.find({});
        const stempelMap = {};
        stempel.forEach((stempel) => {
            stempelMap[stempel._id] = stempel;
        });
        res.status(200).json(stempelMap);
    } catch (err) {
        res.status(500).json(err)
    }
});


// get a shift transfer item
// router.get("/:id", async (req, res) => {
//     try {
//         const ShiftTransferItems = await ShiftTransferItem.findById(req.params.id);
//         res.status(200).json(ShiftTransferItems)
//     } catch (err) {
//         res.status(500).json(err)
//     }
// });


module.exports = router