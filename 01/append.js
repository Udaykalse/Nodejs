const fs = require("fs");

fs.appendFileSync("./test.txt", `${Date.now()} Hey There \n`);

// fs.copyFileSync("./test.txt", "./copy.txt");

// fs.unlinkSync("./copy.txt");

console.log(fs.statSync("./test.txt"));


// blocking operation -non blocking operations, thread pool