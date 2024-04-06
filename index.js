const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const urlRoute = require("./Router/url.js");
const URL = require("./Models/url.js");
const userRouter = require('./Router/user.js')



const { connectToMongoDB } = require("./connnect.js");
const { restrictToLoogedInUserOnly } = require('./middleware/auth.js')
const app = express();
const PORT = 8000;



const corsOption = {
  // origin: "https://url-shortner-red-gamma.vercel.app",
  origin: "https://url-shortner-seven-swart.vercel.app",
  // origin: "http://localhost:5173",
  methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
  credentials: true,
}


app.use(cors(corsOption));


connectToMongoDB("mongodb+srv://naitikkumar2408:naitikkumar2408@cluster0.1n3z7tx.mongodb.net/?retryWrites=true")


  .then(() => {
    console.log("mongodb is connected");
  })
  .catch((err) => {
    throw new Error(`failed ${err}`);
  });

app.use(express.json());
app.use(cookieParser());
app.use("/url", restrictToLoogedInUserOnly, urlRoute);
app.use("/user", userRouter);
app.get("/:shortId", async (req, res) => {
  let shortID = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId: shortID,
    },
    {
      $push: {
        visitHistory: { timestamp: Date.now() },
      },
    }
  );
  res.redirect(entry.redirectUrl);
});

app.listen(PORT, () => console.log(`server is running at PORT ${PORT}`));