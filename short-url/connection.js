const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

async function connectToURLDB(url) {
  return mongoose.connect(url);
}

module.exports = {
  connectToURLDB,
};
