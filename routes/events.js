const router = require("express").Router();
const Event = require("../models/Event");



//add a new event
router.post("/", async (req, res) => {
    const newEvent = new Event(req.body);
    try {
        const savedEvent = await newEvent.save();
        res.status(201).json(savedEvent);
    } catch (err) {
        res.status(500).json(err);
    }
});


// update a event
router.put("/:id", async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
            await event.updateOne({ $set: req.body });
            res.status(202).json("The event has been updated successfully")
    } catch (err) {
        res.status(500).json(err)
    }
});


// get all events
router.get('/allEvents', async (req, res) => {
    try {
        const events = await Event.find({});
        const eventMap = {};
        events.forEach((event) => {
            eventMap[event._id] = event;
        });
        res.status(200).json(eventMap);
    } catch (err) {
        res.status(500).json(err)
    }
});


// delete a event
router.delete("/:id", async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (event._id == req.params.id) {
            await event.deleteOne();
            res.status(200).json("The event has been deleted")
        } else {
            res.status(403).json("You can delete only your event");
        }

    } catch (err) {
        res.status(500).json(err)
    }
});

// get a event
router.get("/:id", async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        res.status(200).json(event);
    } catch (err) {
        res.status(500).json(err)
    }
});


module.exports = router