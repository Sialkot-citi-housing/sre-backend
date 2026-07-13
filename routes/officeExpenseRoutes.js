const express = require('express');
const router = express.Router();
const { getOfficeExpenses, addOfficeExpense } = require('../controllers/officeExpenseController');

router.route('/').get(getOfficeExpenses).post(addOfficeExpense);

module.exports = router;
