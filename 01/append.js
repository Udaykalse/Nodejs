const fs = require("fs");

fs.appendFileSync("./test.txt", new Date().getDate().toLocaleString());
