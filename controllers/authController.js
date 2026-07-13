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

module.exports = { authUser, debugDb };
