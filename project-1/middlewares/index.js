const fs = require("fs");

function logReqres(fileName) {
  return (req, res, next) => {
    fs.appendFile(
      fileName,
      `${Date.now()} | ${req.ip} | ${req.method} | ${req.path} \n`,
      (err, data) => {
        next();
      }
    );
  };
}

module.exports = { logReqres };
