// const http = require("http");
const express = require("express");

const app = express();

app.get("/", (req, res) => {
  return res.send("Hello from Home Page Express");
});

app.get("/about", (req, res) => {
  return res.send("Hello from About Page Express " + "Hey " + req.query.name);
});

app.listen(8080, () => console.log("Started Successfully"));

// const myServer = http.createServer(app);

// myServer.listen(8080, () => console.log("Started Successfully"));
