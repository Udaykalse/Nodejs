const express = require("express");
const userRouter = require("./routes/user.js");
const { connectMongoDb } = require("./connection.js");
const { logReqres } = require("./middlewares/index.js");
const mongoose = require("mongoose");
const { userSchema } = require("./model/user.js");

const app = express();
const PORT = 8080;

connectMongoDb(
  "mongodb+srv://gojocode95_db_user:oLmLNTjgaTASjF9T@nodecluster.rmytyl2.mongodb.net/"
)
  .then(() => console.log("🔥 MongoDB Connected Successfully!"))
  .catch((err) => console.log("❌ DB Connection Failed:", err));


const User = mongoose.model("user", userSchema);

app.use(express.urlencoded({ extended: false }));
app.use(logReqres("logRequestAndResponse.txt"));

app.use("/api/user", userRouter);

app.listen(PORT, () => console.log(`Server is Started On PORT :-${PORT} `));
