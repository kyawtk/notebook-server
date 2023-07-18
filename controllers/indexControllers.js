const jwt = require("jsonwebtoken");
const isAuthenticated = require("../util/authenticateUser");
require('dotenv').config();

async function loginUser(req, res) {
  const userName = req.body.userName;
  const passWord = req.body.passWord;

  if (!userName || !passWord) {
    return res.status(400).json({ error: "Provide both username and password" });
  }

  console.log("Authenticating user:", userName);
  const userAuthenticated = await isAuthenticated(userName, passWord);

  if (userAuthenticated) {
    console.log("User authenticated:", userName);
    
    const token = jwt.sign({ user }, process.env.JWT_SECRET, {expiresIn: '1hr'});
    return res.json({ message: "logged in", token, userName });
  } else {
    return res.status(403).json({ error: "Authentication failed" });
  }
}


const User = require("../models/user");
const isValid = require("../util/validUser");

async function registerUser(req, res) {
  let userName = req.body.userName;
  let passWord = req.body.passWord;

  if (!userName || !passWord) {
    return res.status(400).json({ error: "Provide both username and password" });
  }

  const isUserNameValid = await isValid(userName);

  if (isUserNameValid) {
    console.log("Registering user:", userName);
    let user = new User({ userName, passWord });
    let response = await user.save();
    res.send(response);
  } else {
    return res.send("The username is invalid or taken");
  }
}

module.exports = { registerUser, loginUser}
