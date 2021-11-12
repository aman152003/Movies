const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("../models/user");
require("dotenv").config();

module.exports = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    res.status(401).json({ error: "You must be logged in" });
  } else {
    try {
      const token = authorization;
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const id = decoded._id;
      const user = await User.findOne({ _id: id });
      const { _id, username, email } = user;
      const userBody = {
        _id,
        username,
        email,
      };
      req.user = userBody;
    } catch (err) {
      res.status(401).json({ message: "Authentication failed" });
    }
  }
  next();
};
