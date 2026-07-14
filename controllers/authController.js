const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
const authUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const debugDb = async (req, res) => {
  try {
    const users = await User.find({});
    res.json({
      dbConnection: require('mongoose').connection.name,
      usersFound: users.length,
      users: users.map(u => ({ email: u.email, role: u.role }))
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const seedDb = async (req, res) => {
  try {
    const adminExists = await User.findOne({ email: 'a.khan@sre.pk' });
    if (adminExists) {
      return res.json({ message: 'User already exists', user: adminExists.email });
    }
    
    const adminUser = new User({
      name: 'Admin Khan',
      email: 'a.khan@sre.pk',
      password: 'SreAdmin@2026!',
      role: 'admin'
    });
    
    await adminUser.save();
    res.json({ message: 'Seeded successfully!', email: 'a.khan@sre.pk' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const clearDb = async (req, res) => {
  try {
    const mongoose = require('mongoose');
    const collections = mongoose.connection.collections;
    
    const cleared = [];
    for (const key in collections) {
      if (key !== 'users') { // Don't delete login credentials!
        await collections[key].deleteMany({});
        cleared.push(key);
      }
    }
    res.json({ message: 'All production data cleared successfully (except users).', clearedCollections: cleared });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { authUser, debugDb, seedDb, clearDb };
