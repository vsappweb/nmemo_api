const router = require("express").Router();
const Stempel = require("../models/Stempel");
const User = require("../models/User");

//create a new stempel
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

// update a stempel
router.put("/:id", async (req, res) => {
  try {
    const Stempels = await Stempel.findById(req.params.id);
    await Stempels.updateOne({ $set: req.body });
    res.status(204).json("The stempel has been updated");
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete a shift transfer
router.delete("/:Id", async (req, res) => {
  try {
    const Stempels = await Stempel.findById(req.params.Id);
    if (Stempels) {
      if (Stempels.lineId == req.body.lineId) {
        await Stempels.deleteOne();
        res.status(204).json("The stempel has been deleted");
      } else {
        res.status(403).json("You can delete only your stempel");
      }
    } else {
      res.status(404).json("The stempel does not exist");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// get all stempels
router.get("/allStempels", async (req, res) => {
  try {
    const stempel = await Stempel.find({});
    const stempelMap = {};
    stempel.forEach((stempel) => {
      stempelMap[stempel._id] = stempel;
    });
    res.status(200).json(stempelMap);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
