const User = require("../model/users");
const { setUser, getUser } = require("../service/auth");

async function handleUserSignup(req, res) {
  const { name, email, password } = req.body;
  await User.create({
    name,
    email,
    password,
  });
  return res.redirect("/");
}

async function handleUserLogin(req, res) {
  const { email, password } = req.body;
  console.log("Login attempt with:", req.body);

  const user = await User.findOne({ email, password });
  console.log("User found:", user);

  if (!user) {
    console.log("Invalid credentials");
    return res.render("login", { error: "Invalid Credentials" });
  }

  console.log("USER to be signed:", user);
  const token = setUser({
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  });
  console.log("Generated token:", token);

  res.cookie("token", token, { httpOnly: true });
  console.log("Token set in cookie");

  return res.redirect("/");
}

module.exports = {
  handleUserSignup,
  handleUserLogin,
};
