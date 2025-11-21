const fs = require("fs");

const os = require("os");

// Blocking rquest
// fs.writeFileSync("./test.txt", "Hello World");

//Non Blocking rquest

// fs.writeFile("./test.txt", "Hello World Async", (err) => {});

// console.log("1");

// Blocking
// const req = fs.readFileSync("./../contacts.txt", "utf8");

//Non Blocking rquest
fs.readFile("./../contacts.txt", "utf-8", (err, result) => {
  //   console.log(result);
});

// console.log("2");

console.log(os.cpus().length);
