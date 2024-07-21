const router = require("express").Router();
const Memo = require("../models/Memo");
const User = require("../models/User");

// router.get("/", (req, res) => {
//     console.log("Welcome to memo page!")
// });

//create a memo
router.post("/", async (req, res) => {
    const newMemo = new Memo(req.body);
    try {
        const savedMemo = await newMemo.save();
        res.status(200).json(savedMemo);
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
});

// update a memo
router.put("/:id", async (req, res) => {
    try {
        const memo = await Memo.findById(req.params.id);
        if (memo.userId === req.body.userId) {
            await memo.updateOne({ $set: req.body });
            res.status(200).json("The memo has been updated")
        } else {
            res.status(403).json("You can update only your memo");
        }
    } catch (err) {
        res.status(500).json(err)
    }
});

// get all memos for admin or team leader
router.get('/allMemos', async (req, res) => {
    try {
        const memos = await Memo.find({});
        const memoMap = {};
        memos.forEach((memo) => {
            memoMap[memo._id] = memo;
        });
        res.status(200).json(memoMap);
    } catch (err) {
        res.status(500).json(err)
    }
});

// delete a memo
router.delete("/:id", async (req, res) => {
    try {
        const memo = await Memo.findById(req.params.id);
        // if (memo.userId === req.body.userId) {
        if (memo._id == req.params.id) {
            await memo.deleteOne();
            res.status(200).json("The memo has been deleted")
        } else {
            res.status(403).json("You can delete only your memo");
        }

    } catch (err) {
        res.status(500).json(err)
    }
});

// like/dislike a memo
router.put("/:id/like", async (req, res) => {
    try {
        const memo = await Memo.findById(req.params.id);
        if (!memo.likes.includes(req.body.userId)) {
            await memo.updateOne({ $push: { likes: req.body.userId } });
            res.status(200).json("The memo has been liked");
        } else {
            await memo.updateOne({ $pull: { likes: req.body.userId } });
            res.status(200).json("The memo has been disliked");
        }

    } catch (err) {
        res.status(500).json(err)
    }
})

// like/dislike a memo
router.put("/:id/love", async (req, res) => {
    try {
        const memo = await Memo.findById(req.params.id);
        if (!memo.loves.includes(req.body.userId)) {
            await memo.updateOne({ $push: { loves: req.body.userId } });
            res.status(200).json("The memo has been loved");
        } else {
            await memo.updateOne({ $pull: { loves: req.body.userId } });
            res.status(200).json("The memo has been disloved");
        }

    } catch (err) {
        res.status(500).json(err)
    }
})

// get a memo
router.get("/:id", async (req, res) => {
    try {
        const memo = await Memo.findById(req.params.id);
        res.status(200).json(memo)
    } catch (err) {
        res.status(500).json(err)
    }
});

// get timeline memos
router.get("/timeline/:userId", async (req, res) => {
    try {
        const currentUser = await User.findById(req.params.userId);
        const userMemos = await Memo.find({ userId: currentUser._id });
        const friendMemos = await Promise.all(
            currentUser.followings.map((friendId) => {
                return Memo.find({ userId: friendId })
            })
        );
        res.status(200).json(userMemos.concat(...friendMemos))
    } catch (err) {
        res.status(500).json(err)
    }
});

// get user's all memos for timeline view profile
router.get("/profile/:personnelnumber", async (req, res) => {
    try {
        const user = await User.findOne({ personnelnumber: req.params.personnelnumber });
        const memos = await Memo.find({ userId: user._id });
        res.status(200).json(memos);
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router