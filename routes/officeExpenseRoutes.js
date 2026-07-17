const express = require('express');
const router = express.Router();
const { getOfficeExpenses, addOfficeExpense, deleteOfficeExpense } = require('../controllers/officeExpenseController');

router.route('/').get(getOfficeExpenses).post(addOfficeExpense);
router.route('/:id').delete(deleteOfficeExpense);

module.exports = router;
