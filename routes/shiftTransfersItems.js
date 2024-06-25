const router = require("express").Router();
const ShiftTransferItem = require("../models/ShiftTransferItem");
const User = require("../models/User");

// router.get("/", (req, res) => {
//     console.log("Welcome to shift transfer page!")
// });

//create a shift transfer
router.post("/", async (req, res) => {
    const newShiftTransferItem = new ShiftTransferItem(req.body);
    try {
        const savedShiftTransferItem = await newShiftTransferItem.save();
        res.status(201).json(savedShiftTransferItem);
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
});

// update a shift transfer
router.put("/:id", async (req, res) => {
    try {
        const ShiftTransferItems = await ShiftTransferItem.findById(req.params.id);
        if (ShiftTransferItems.lineId === req.body.lineId) {
            await ShiftTransferItems.updateOne({ $set: req.body });
            res.status(204).json("The shift transfer has been updated")
        } else {
            res.status(403).json("You can update only your shift transfer");
        }

    } catch (err) {
        res.status(500).json(err)
    }
});

// delete a shift transfer
router.delete("/:id", async (req, res) => {
    try {
        const ShiftTransferItems = await ShiftTransferItem.findById(req.params.id);
        // if (post.userId === req.body.userId) {
        if (ShiftTransferItems._id == req.params.id) {
            await ShiftTransferItems.deleteOne();
            res.status(204).json("The post of shift transfer has been deleted")
        } else {
            res.status(403).json("You can delete only your shift transfer");
        }

    } catch (err) {
        res.status(500).json(err)
    }
});

// // like/dislike a post
// router.put("/:id/like", async (req, res) => {
//     try {
//         const post = await Post.findById(req.params.id);
//         if (!post.likes.includes(req.body.userId)) {
//             await post.updateOne({ $push: { likes: req.body.userId } });
//             res.status(200).json("The post has been liked");
//         } else {
//             await post.updateOne({ $pull: { likes: req.body.userId } });
//             res.status(200).json("The post has been disliked");
//         }

//     } catch (err) {
//         res.status(500).json(err)
//     }
// })

// // like/dislike a post
// router.put("/:id/love", async (req, res) => {
//     try {
//         const post = await Post.findById(req.params.id);
//         if (!post.loves.includes(req.body.userId)) {
//             await post.updateOne({ $push: { loves: req.body.userId } });
//             res.status(200).json("The post has been loved");
//         } else {
//             await post.updateOne({ $pull: { loves: req.body.userId } });
//             res.status(200).json("The post has been disloved");
//         }

//     } catch (err) {
//         res.status(500).json(err)
//     }
// })

// 

// // get timeline posts
// router.get("/timeline/:userId", async (req, res) => {
//     try {
//         const currentUser = await User.findById(req.params.userId);
//         const userPosts = await Post.find({ userId: currentUser._id });
//         const friendPosts = await Promise.all(
//             currentUser.followings.map((friendId) => {
//                 return Post.find({ userId: friendId })
//             })
//         );
//         res.status(200).json(userPosts.concat(...friendPosts))
//     } catch (err) {
//         res.status(500).json(err)
//     }
// });

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

// get all shift Transfers Items
router.get('/allShiftTransfersItems', async (req, res) => {
    try {
        const shiftTransferItems = await ShiftTransferItem.find({});
        const shiftTransferItemMap = {};
        shiftTransferItems.forEach((shiftTransferItem) => {
            shiftTransferItemMap[shiftTransferItem._id] = shiftTransferItem;
        });
        res.status(200).json(shiftTransferItemMap);
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