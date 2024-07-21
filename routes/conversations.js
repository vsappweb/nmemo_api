const router = require("express").Router();
const Conversation = require("../models/Conversation");

//new conversation
router.post("/", async (req, res) => {
    const newConversation = new Conversation({
        members: [req.body.senderId, req.body.receiverId],
    });
    try {
        const savedConversation = await newConversation.save();
        res.status(200).json(savedConversation);
    } catch (err) {
        res.status(500).json(err);
    }
});


//get conversation of a user
router.get("/:userId", async (req, res) => {
    try {
        const conversation = await Conversation.find({
            members: { $in: [req.params.userId] },
        });
        res.status(200).json(conversation);
    } catch (err) {
        res.status(500).json(err);
    }
});

//get conversations includes two user id
router.get("/find/:firstUserId/:secondUserId", async (req,res)=>{
    try {
        const conversation = await Conversation.findOne({
            members: { $all: [req.params.firstUserId, req.params.secondUserId] },
        });
        res.status(200).json(conversation);
    } catch (err) {
        res.status(500).json(err)
    }
})

// delete a conversation
router.delete("/:id", async (req, res) => {
    try {
        const conversation = await Conversation.findById(req.params.id);
        if (conversation._id == req.params.id) {
            await conversation.deleteOne();
            res.status(200).json("The conversation has been deleted")
        } else {
            res.status(403).json("You can delete only your conversation");
        }

    } catch (err) {
        res.status(500).json(err)
    }
});




module.exports = router