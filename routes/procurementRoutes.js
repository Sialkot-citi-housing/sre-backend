const express = require('express');
const router = express.Router();
const { getProcurementsByProject, addProcurement, updateProcurement, deleteProcurement, getAllProcurements } = require('../controllers/procurementController');
const { protect } = require('../middleware/authMiddleware');

router.route('/project/:projectId').get(protect, getProcurementsByProject);
router.route('/').get(protect, getAllProcurements).post(protect, addProcurement);
router.route('/:id').put(protect, updateProcurement).delete(protect, deleteProcurement);

module.exports = router;
