const fs = require("fs");

// fs.writeFileSync("./test.txt", "Hey there");
fs.writeFile("./test.txt", "Hey there Asynchoronus", (err) => {});

// const result = fs.readFileSync("./contacts.txt", "utf8");
fs.readFile("./contacts.txt", "utf8", (err, result) => {
  if (err) {
    console.log(err);
  } else {
    console.log(result);
  }
});
