const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Register Route
router.post('/register', async (req, res) => {
  try {
    const { fullName, email, regNo, password } = req.body;

    // Check if user with the same email or regNo already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { regNo }]
    });
    if (existingUser) {
      return res.status(400).send('User already exists');
    }

    // Create a new user
    const newUser = new User({ fullName, email, regNo, password });
    await newUser.save();

    // 201 = Created
    res.status(201).send('User registered');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

// Login Route
router.post('/login', async (req, res) => {
  try {
    const { regNo, password } = req.body;

    // Find user by registration number
    const user = await User.findOne({ regNo });
    if (!user) {
      return res.status(400).send('Invalid credentials');
    }

    // Compare the password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).send('Invalid credentials');
    }

    // Generate JWT (using .env JWT_SECRET or a fallback)
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'fallback_secret');

    // Send the token to the frontend
    res.json({
      token,
      user: {
        fullName: user.fullName,
        email: user.email,
        regNo: user.regNo
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

module.exports = router;
