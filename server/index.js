const http = require("http");
const fs = require("fs");

const myServer = http.createServer((req, res) => {
  const log = `${Date.now()} | URL :- ${
    req.url
  } | MSG :- New Request Received\n`;
  fs.appendFile("log.txt", log, (err, data) => {
    switch (req.url) {
      case "/":
        res.end("Home Server");
        break;
      case "/about":
        res.end("Aout me im Uday Kalse");
        break;
      default:
        res.end("404");
    }
    // res.end("Hello From Server");
  });
});

myServer.listen(8080, () => console.log("Started Successfully"));
