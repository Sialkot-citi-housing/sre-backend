const express = require('express');
const router = express.Router();
const { getOfficeExpenses, addOfficeExpense, updateOfficeExpense, deleteOfficeExpense } = require('../controllers/officeExpenseController');

router.route('/').get(getOfficeExpenses).post(addOfficeExpense);
router.route('/:id').put(updateOfficeExpense).delete(deleteOfficeExpense);

module.exports = router;
