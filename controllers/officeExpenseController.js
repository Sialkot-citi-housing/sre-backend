const OfficeExpense = require('../models/OfficeExpense');

// @desc    Get all office expenses
// @route   GET /api/office-expenses
// @access  Private
const getOfficeExpenses = async (req, res) => {
  try {
    const expenses = await OfficeExpense.find({});
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Add office expense
// @route   POST /api/office-expenses
// @access  Private
const addOfficeExpense = async (req, res) => {
  try {
    const expense = new OfficeExpense(req.body);
    const createdExpense = await expense.save();
    res.status(201).json(createdExpense);
  } catch (error) {
    res.status(400).json({ message: 'Invalid office expense data' });
  }
};

const deleteOfficeExpense = async (req, res) => {
  try {
    const expense = await OfficeExpense.findById(req.params.id);
    if (expense) {
      await expense.deleteOne();
      res.json({ message: 'Office Expense removed' });
    } else {
      res.status(404).json({ message: 'Office Expense not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', errorDetails: error });
  }
};

module.exports = { getOfficeExpenses, addOfficeExpense, deleteOfficeExpense };
