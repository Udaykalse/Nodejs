const http = require("http");
const fs = require("fs");
const url = require("url"); //----URL

const myServer = http.createServer((req, res) => {
  if (req.url === "/favicon.ico") return res.end();
  const log = `${Date.now()} | Methods :- ${req.method}  | URL :- ${
    req.url
  } | MSG :- New Request Received\n`;
  const myUrl = url.parse(req.url, true);
  console.log(myUrl); //----URL
  fs.appendFile("log.txt", log, (err, data) => {
    switch (
      myUrl.pathname //----URL
    ) {
      case "/":
        if (req.method === "GET") res.end("Home Server"); // ___Method
        // res.end("Home Server");
        break;
      case "/about":
        const userName = myUrl.query.myName; //----URL
        res.end(`Hi, ${userName}`); //----URL
        // res.end("Aout me im Uday Kalse");
        break;
      case "/signup":
        if (req.method === "GET") res.end("This is a signup Form"); // ___Method
        else if (req.method === "POST") {
          //DB  Query
          res.end("Successful");
        }
        break;
      default:
        res.end("404");
    }
    // res.end("Hello From Server");
  });
});

myServer.listen(8080, () => console.log("Started Successfully"));
