const Fund = require('../models/Fund');

// @desc    Get all funds
// @route   GET /api/funds
// @access  Private
const getFunds = async (req, res) => {
  try {
    const funds = await Fund.find({});
    res.json(funds);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Add fund
// @route   POST /api/funds
// @access  Private
const addFund = async (req, res) => {
  try {
    const fund = new Fund(req.body);
    const createdFund = await fund.save();
    res.status(201).json(createdFund);
  } catch (error) {
    res.status(400).json({ message: 'Invalid fund data' });
  }
};

module.exports = { getFunds, addFund };
