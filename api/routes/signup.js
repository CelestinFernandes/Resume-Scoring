import express from 'express';
import bcrypt from 'bcryptjs';
import User from './models/User.js';  // Import User model

const router = express.Router();

router.post('/signup', async (req, res) => {
  const { email, password } = req.body;

  // Check if the email already exists
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(400).json({ message: 'User already exists. Please sign in.' });
  }

  // Create a new user
  const newUser = new User({
    email,
    password
  });

  try {
    await newUser.save();

    // Send back success message and token
    res.status(201).json({ message: 'User created successfully!', token: 'your-jwt-token' });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong. Please try again later.' });
  }
});

export default router;
