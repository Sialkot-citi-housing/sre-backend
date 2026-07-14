const express = require('express');
const router = express.Router();
const { authUser, debugDb, seedDb, clearDb } = require('../controllers/authController');

router.post('/login', authUser);
router.get('/debug', debugDb);
router.get('/seed', seedDb);
router.get('/clear-data', clearDb);

module.exports = router;
