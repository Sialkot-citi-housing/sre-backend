const express = require('express');
const router = express.Router();
const { authUser, debugDb } = require('../controllers/authController');

router.post('/login', authUser);
router.get('/debug', debugDb);

module.exports = router;
