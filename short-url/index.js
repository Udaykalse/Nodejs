const express = require("express");
const cookieParser = require("cookie-parser");
const { connectToURLDB } = require("./connection.js");
require("dotenv").config();
const { checkAuthication, restrictTo } = require("./middleware/auth.js");
const staticRouter = require("./routes/staticRoute");
const URL = require("./model/url.js");
const urlRoutes = require("./routes/url.js");
const userRouter = require("./routes/users");
const path = require("path");
const app = express();
const PORT = 8001;

connectToURLDB(process.env.MONGODB_URL)
  .then(() => console.log("🔥 MongoDB Connected Successfully!"))
  .catch((err) => console.log("❌ DB Connection Failed:", err));

app.set("view engine", "ejs");
app.set("views", path.resolve("./view"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkAuthication);

app.get("/test", async (req, res) => {
  const allUrls = await URL.find({});
  return res.render("home", {
    urls: allUrls,
  });
});

// app.use()

app.use("/url", restrictTo("NORMAL"), urlRoutes);
app.use("/", staticRouter);
app.use("/user", userRouter);

app.get("/url/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    },
    { new: true }
  );

  res.redirect(entry.redireactURL);
});

app.listen(PORT, () => console.log(`Server is Started at port :- ${PORT}`));
