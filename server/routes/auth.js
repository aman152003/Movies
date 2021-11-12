const express = require("express");
const User = require("../models/user");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

router.post("/signup", async (req, res) => {
  const { username, password, email } = req.body;
  if (!username || !password || !email) {
    res.status(400).json({ error: "Please enter all required fields" });
  } else {
    const savedUser = await User.findOne({ email: email });
    if (savedUser) {
      res.status(400).json({ error: "User already exists" });
    } else {
      bcrypt.hash(password, 12).then(async (hashedPassword) => {
        const user = new User({ username, password: hashedPassword, email });
        try {
          await user.save();
          res.json({ message: "User Saved" });
        } catch (err) {
          res.status(500).json({ error: "User could not be saved" });
        }
      });
    }
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ error: "Please enter all required fields" });
  } else {
    try {
      const savedUser = await User.findOne({ email: email });
      const match = await bcrypt.compare(password, savedUser.password);
      if (match) {
        const token = jwt.sign({ _id: savedUser._id }, process.env.JWT_SECRET);
        const user = {
          _id: savedUser._id,
          email: savedUser.email,
          username: savedUser.username,
        };
        res.json({ user: user, token: token });
      } else {
        res.status(400).json({ error: "Invalid email or password" });
      }
    } catch (err) {
      res.status(400).json({ error: "Invalid email or password" });
    }
  }
});

module.exports = router;
