const { getUser } = require("../service/auth.js");

function checkAuthication(req, res, next) {
  console.log("\n===== CHECK AUTHENTICATION START =====");

  console.log("Incoming Cookies:", req.cookies);
  const tokenCookie = req.cookies?.token;
  console.log("Token Cookie Extracted:", tokenCookie);
  req.user = null;
  if (!tokenCookie) {
    console.log("No token cookie found → user stays null");
    console.log("===== CHECK AUTHENTICATION END =====\n");
    return next();
  }
  const token = tokenCookie;
  console.log("Token Passed to getUser():", token);
  const user = getUser(token);
  console.log("Decoded User Returned by getUser():", user);
  req.user = user;
  console.log("req.user set to:", req.user);
  console.log("===== CHECK AUTHENTICATION END =====\n");
  return next();
}

function restrictTo(roles = []) {
  return function (req, res, next) {
    console.log("\n===== RESTRICT TO MIDDLEWARE START =====");
    console.log("Allowed Roles:", roles);
    console.log("req.user received:", req.user);

    if (!req.user) {
      console.log("User missing → redirecting to /login");
      console.log("===== RESTRICT TO MIDDLEWARE END =====\n");
      return res.redirect("/login");
    }

    console.log("User Role Found:", req.user.role);

    if (!roles.includes(req.user.role)) {
      console.log("User role NOT in allowed roles → unauthorized");
      console.log("===== RESTRICT TO MIDDLEWARE END =====\n");
      return res.end("unAuthorized");
    }

    console.log("User authorized → proceeding");
    console.log("===== RESTRICT TO MIDDLEWARE END =====\n");
    return next();
  };
}

module.exports = {
  checkAuthication,
  restrictTo,
};
