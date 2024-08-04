const router = require("express").Router();
const Tool = require("../models/Tool");
const User = require("../models/User");

//create a new tool
router.post("/", async (req, res) => {
  const newTool = new Tool(req.body);
  try {
    const savedTool = await newTool.save();
    res.status(201).json(savedTool);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

// update a tool
router.put("/:id", async (req, res) => {
  try {
    const Tools = await Tool.findById(req.params.id);
    await Tools.updateOne({ $set: req.body });
    res.status(204).json("The tool has been updated");
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete a shift transfer
router.delete("/:Id", async (req, res) => {
  try {
    const Tools = await Tool.findById(req.params.Id);
    if (Tools) {
      if (Tools.lineId == req.body.lineId) {
        await Tools.deleteOne();
        res.status(204).json("The tool has been deleted");
      } else {
        res.status(403).json("You can delete only your tool");
      }
    } else {
      res.status(404).json("The tool does not exist");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// get all tools
router.get("/allTools", async (req, res) => {
  try {
    const tool = await Tool.find({});
    const toolMap = {};
    tool.forEach((tool) => {
      toolMap[tool._id] = tool;
    });
    res.status(200).json(toolMap);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
