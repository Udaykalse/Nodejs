const express = require("express");
const urlRoutes = require("./routes/url.js");
const { connectToURLDB } = require("./connection.js");
const URL = require("./model/url.js");
const staticRouter = require("./routes/staticRoute");
const path = require("path");
require("dotenv").config();
const app = express();
const PORT = 8001;

// connectToURLDB(
//   "mongodb+srv://gojocode95_db_user:oLmLNTjgaTASjF9T@nodecluster.rmytyl2.mongodb.net/"
// )
//   .then(() => console.log("🔥 MongoDB Connected Successfully!"))
//   .catch((err) => console.log("❌ DB Connection Failed:", err));

connectToURLDB(process.env.MONGODB_URL)
  .then(() => console.log("🔥 MongoDB Connected Successfully!"))
  .catch((err) => console.log("❌ DB Connection Failed:", err));

app.set("view engine", "ejs");
app.set("views", path.resolve("./view"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/test", async (req, res) => {
  const allUrls = await URL.find({});
  return res.render("home", {
    urls: allUrls,
  });
});

app.use("/url", urlRoutes);
app.use("/", staticRouter);

app.get("/url/:shortId", async (req, res) => {
  // app.get("/:shortId", async (req, res) => {

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
