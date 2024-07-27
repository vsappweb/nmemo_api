const router = require("express").Router();
const ShiftTransfer = require("../models/ShiftTransfer");
const User = require("../models/User");

//create a shift transfer
router.post("/", async (req, res) => {
  const newShiftTransfer = new ShiftTransfer(req.body);
  try {
    const savedShiftTransfer = await newShiftTransfer.save();
    res.status(200).json(savedShiftTransfer);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

// update a shift transfer
router.put("/:id", async (req, res) => {
  try {
    const shiftTransfers = await ShiftTransfer.findById(req.params.id);
    if (shiftTransfers.lineId === req.body.lineId) {
      await shiftTransfers.updateOne({ $set: req.body });
      res.status(200).json("The shift transfer has been updated");
    } else {
      res.status(403).json("You can update only your shift transfer");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete a shift transfer
router.delete("/:id", async (req, res) => {
  try {
    const shiftTransfers = await ShiftTransfer.findById(req.params.id);
    if (shiftTransfers._id == req.params.id) {
      await shiftTransfers.deleteOne();
      res.status(200).json("The post of shift transfer has been deleted");
    } else {
      res.status(403).json("You can delete only your shift transfer");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// get all shift Transfers Posts
router.get("/allShiftTransfers", async (req, res) => {
  try {
    const shiftTransfers = await ShiftTransfer.find({});
    const shiftTransferMap = {};
    shiftTransfers.forEach((shiftTransfer) => {
      shiftTransferMap[shiftTransfer._id] = shiftTransfer;
    });
    res.status(200).json(shiftTransferMap);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get a shift transfer
router.get("/:id", async (req, res) => {
  try {
    const shiftTransfers = await ShiftTransfer.findById(req.params.id);
    res.status(200).json(shiftTransfers);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get timeline posts
router.get("/timeline/:userId", async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId);
    const userShiftTransfers = await ShiftTransfer.find({
      userId: currentUser._id,
    });
    const friendShiftTransfers = await Promise.all(
      currentUser.followings.map((friendId) => {
        return ShiftTransfer.find({ userId: friendId });
      })
    );
    res.status(200).json(userShiftTransfers.concat(...friendShiftTransfers));
  } catch (err) {
    res.status(500).json(err);
  }
});

// get user's all posts
router.get("/profile/:personnelnumber", async (req, res) => {
  try {
    const user = await User.findOne({
      personnelnumber: req.params.personnelnumber,
    });
    const shiftTransfers = await ShiftTransfer.find({ userId: user._id });
    res.status(200).json(shiftTransfers);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
