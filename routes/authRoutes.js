const express = require('express');
const router = express.Router();
const { authUser, debugDb, seedDb } = require('../controllers/authController');

router.post('/login', authUser);
router.get('/debug', debugDb);
router.get('/seed', seedDb);

module.exports = router;
