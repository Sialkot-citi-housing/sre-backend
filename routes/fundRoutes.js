const express = require('express');
const router = express.Router();
const { getFunds, addFund } = require('../controllers/fundController');

router.route('/').get(getFunds).post(addFund);

module.exports = router;
