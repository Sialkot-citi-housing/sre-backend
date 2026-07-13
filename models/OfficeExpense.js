const mongoose = require('mongoose');

const officeExpenseSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  paidTo: {
    type: String,
    required: true,
  },
  method: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
}, {
  timestamps: true,
});

const OfficeExpense = mongoose.model('OfficeExpense', officeExpenseSchema);

module.exports = OfficeExpense;
