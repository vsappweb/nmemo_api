const router = require("express").Router();
const IncompleetAantal = require("../models/IncompleetAantal");
const User = require("../models/User");

//create a incompleet aantals
router.post("/", async (req, res) => {
  const newIncompleetAantal = new IncompleetAantal(req.body);
  try {
    const savedIncompleetAantal = await newIncompleetAantal.save();
    res.status(201).json(savedIncompleetAantal);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

// update a incompleet aantals
router.put("/:id", async (req, res) => {
  try {
    const IncompleetAantals = await IncompleetAantal.findById(req.params.id);
    await IncompleetAantals.updateOne({ $set: req.body });
    res.status(204).json("The incompleet aantals has been updated");
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete a incompleet aantals
router.delete("/:id", async (req, res) => {
    try {
        const IncompleetAantals = await IncompleetAantal.findById(req.params.id);
        if (IncompleetAantals) {
            // if (IncompleetAantals.lineId == req.body.lineId) {
                await IncompleetAantals.deleteOne();
                res.status(204).json("The incompleet aantals has been deleted");
            // } else {
            //     res.status(403).json("You can delete only your incompleet aantals");
            // }
        } else {
            res.status(404).json("You can delete only your incompleet aantals");
        }
    } catch (err) {
        res.status(500).json(err)
    }
});

// get all incompleet aantals
router.get("/allIncompleetAantal", async (req, res) => {
  try {
    const incompleetAantal = await IncompleetAantal.find({});
    const incompleetAantalMap = {};
    incompleetAantal.forEach((incompleetAantal) => {
      incompleetAantalMap[incompleetAantal._id] = incompleetAantal;
    });
    res.status(200).json(incompleetAantalMap);
  } catch (err) {
    res.status(500).json(err);
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

module.exports = router;
