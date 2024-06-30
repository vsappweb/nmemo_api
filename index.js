const express = require('express');
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const memoRoute = require("./routes/memos");
const tlToLineRoute = require("./routes/tlToLines");
const eventRoute = require("./routes/events");
const preparedTextRoute = require("./routes/preparedTexts");
const shiftTransfersItemsRoute = require("./routes/shiftTransfersItems");
const shiftTransferValuesAndDescsRoute = require("./routes/shiftTransferValuesAndDescs");
const shiftTransfersRoute = require("./routes/shiftTransfers");
const conversationRoute = require("./routes/conversations");
const messageRoute = require("./routes/messages");
const multer = require("multer");
const path = require("path");
const cors = require('cors')


dotenv.config();

// mongoose.connect(process.env.MONGO_URL)
//     .then((success) => console.log("Conected MongoDB!"))
//     .catch((err) => console.log("Not conected"));

try {
    mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to MongoDB!");
} catch (error) {
    console.error("Failed to connect to MongoDB:", error);
}

app.use("/images", express.static(path.join(__dirname, "public/images")));


// middleware
app.use(cors())
app.use(express.json());
// app.use(helmet());
app.use(morgan("common"));

app.use(
    helmet({
        crossOriginResourcePolicy: false,
    })
);

// app.get("/users", (req,res)=>{
//     res.send("Welcome to user page!")
// });

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images")
    },
    filename: (req, file, cb) => {
        // cb(null, file.originalname);
        cb(null, req.body.name)
    },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.any("file"), (req, res) => {
    try {
        return res.status(200).json("File uploaded successfully.")
    } catch (err) {
        console.log(err)
    }
})

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);
app.use("/api/memos", memoRoute);
app.use("/api/tlToLines", tlToLineRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);
app.use("/api/shiftTransfersItems", shiftTransfersItemsRoute);
app.use("/api/shiftTransferValuesAndDescs", shiftTransferValuesAndDescsRoute);
app.use("/api/shiftTransfers", shiftTransfersRoute);
app.use("/api/events", eventRoute);
app.use("/api/preparedTexts", preparedTextRoute);


app.get("", (req,res)=>{
    res.send("Backend server is running!!!")
});


app.listen(8800, () => {
    console.log("Backend server is running!!!")
});