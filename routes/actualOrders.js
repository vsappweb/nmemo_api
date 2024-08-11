const router = require("express").Router();
const ActualOrder = require("../models/ActualOrder");
const User = require("../models/User");

//create a new actualOrder
router.post("/", async (req, res) => {
  const newActualOrder = new ActualOrder(req.body);
  try {
    const savedActualOrder = await newActualOrder.save();
    res.status(201).json(savedActualOrder);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

// update a actualOrder
router.put("/:id", async (req, res) => {
  try {
    const ActualOrders = await ActualOrder.findById(req.params.id);
    await ActualOrders.updateOne({ $set: req.body });
    res.status(204).json("The actualOrder has been updated");
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete a shift transfer
router.delete("/:Id", async (req, res) => {
  try {
    const ActualOrders = await ActualOrder.findById(req.params.Id);
    if (ActualOrders) {
      if (ActualOrders.lineId == req.body.lineId) {
        await ActualOrders.deleteOne();
        res.status(204).json("The actualOrder has been deleted");
      } else {
        res.status(403).json("You can delete only your actualOrder");
      }
    } else {
      res.status(404).json("The actualOrder does not exist");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// get all actualOrders
router.get("/allActualOrders", async (req, res) => {
  try {
    const actualOrder = await ActualOrder.find({});
    const actualOrderMap = {};
    actualOrder.forEach((actualOrder) => {
      actualOrderMap[actualOrder._id] = actualOrder;
    });
    res.status(200).json(actualOrderMap);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
