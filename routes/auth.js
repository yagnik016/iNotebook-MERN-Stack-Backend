const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "helloyagnik";
const {
  RegisterValidations,
  LoginValidations,
} = require("../MidddleWares/Validation");
const Authentication = require("../MidddleWares/authentication");

// Register API Route
router.post("/register", RegisterValidations, async (req, res) => {
  try {
    let success = true;
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, 10),
    });
    res.json({
      user,
      success
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      success: false
    });
  }
});

// Login API Route
router.post("/login", LoginValidations, async (req, res) => {
  try {
    let success = false;
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success, error: "User not found" });
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ success, error: "Invalid Password" });
    }
    const token = jwt.sign({ id: user._id }, SECRET_KEY);
    success = true;
    res.send({
      success,
      user,
      token,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
});

// ALl Users API Route
router.get("/getusers", Authentication, async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    res.status(500).send("Error retrieving users");
  }
});
module.exports = router;
