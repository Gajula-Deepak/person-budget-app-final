const express = require("express");
const router = express.Router();
router.use(express.json());
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { tokenSecret } = require("../tokenSecretConstants");

router.get("/", async (req, res) => {
  try {
    const token = req.headers.authorization;
    if (!token) return res.json({ status: false });
    const data = await new Promise((resolve, reject) => {
      jwt.verify(token, tokenSecret, (err, decoded) => {
        if (err) return reject(err);
        resolve(decoded);
      });
    });
    const user = await User.findById(data.id);
    if (user) return res.json({ status: true, user: user.username });
    else return res.json({ status: false });
  } catch (error) {
    console.error(error);
    return res.json({ status: false });
  }
});

router.get("/refresh-token", async (req, res) => {
  try {
    const token = req.headers.authorization;
    if (!token) return res.json({ status: false });
    const data = await new Promise((resolve, reject) => {
      jwt.verify(token.split(" ")[1], tokenSecret, (err, decoded) => {
        if (err) return reject(err);
        resolve(decoded);
      });
    });
    const user = await User.findById(data.id);
    const newToken = jwt.sign({ id: user._id }, tokenSecret);
    return res.status(201).json({
      message: "User logged in successfully",
      success: true,
      token: newToken,
    });
  } catch (error) {
    console.error(error);
    return res.json({ status: false });
  }
});

router.post("/register", async (req, res) => {
  try {
    const { email, password, username } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(403).json({ message: "User already exists" });
    const user = await User.create({ email, password, username });
    const token = jwt.sign({ id: user._id }, tokenSecret, {
      expiresIn: "60s",
    });
    return res.status(201).json({
      message: "User signed in successfully",
      success: true,
      user,
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      return res.json({ message: "All fields are required" });

    const user = await User.findOne({ username });
    if (!user) return res.json({ message: "Incorrect password or email" });

    const auth = await bcrypt.compare(password, user.password);
    if (!auth) return res.json({ message: "Incorrect password or email" });

    const token = jwt.sign({ id: user._id }, tokenSecret, {
      expiresIn: "60s",
    });

    return res.status(201).json({
      message: "User logged in successfully",
      success: true,
      token,
      emailVerified: user.emailVerified,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
