const express = require("express");
const router = express.Router();
// const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");



const accessTokenSecret = "Y19UuF1Ktwwk9uz6";
const refreshTokenSecret = "Y19UuF1Ktwwk9uz6";
let refreshTokens = [];


router.post("/api/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error signing up" });
  }
});

router.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const accessToken = jwt.sign({ userId: user._id }, accessTokenSecret, { expiresIn: '1h' });
    const refreshToken = jwt.sign({ userId: user._id }, refreshTokenSecret, { expiresIn: '7d' });
    refreshTokens.push(refreshToken);

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Set to true in production (over HTTPS)
      sameSite: 'Lax',
      maxAge: 60 * 60 * 1000 // 1 hour
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Set to true in production (over HTTPS)
      sameSite: 'Lax',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    res.json({ accessToken, refreshToken });
  } catch (error) {
    res.status(500).json({ error: "Error logging in" });
  }
});




module.exports = router;