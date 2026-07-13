const express = require('express');
const router = express.Router();
const { getContractorsByProject, addContractor, updateContractor, deleteContractor, getAllContractors } = require('../controllers/contractorController');
const { protect } = require('../middleware/authMiddleware');

router.route('/project/:projectId').get(protect, getContractorsByProject);
router.route('/').get(protect, getAllContractors).post(protect, addContractor);
router.route('/:id').put(protect, updateContractor).delete(protect, deleteContractor);

module.exports = router;
