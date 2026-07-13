const express = require('express');
const router = express.Router();
const { 
  getPaymentsByProject, 
  getAllContractorPayments,
  addContractorPayment, 
  updateContractorPayment, 
  deleteContractorPayment,
  addCustomerPayment, 
  updateCustomerPayment,
  deleteCustomerPayment
} = require('../controllers/paymentController');
const { protect } = require('../middleware/authMiddleware');

router.route('/project/:projectId').get(protect, getPaymentsByProject);

router.route('/contractor').get(protect, getAllContractorPayments).post(protect, addContractorPayment);
router.route('/contractor/:id').put(protect, updateContractorPayment).delete(protect, deleteContractorPayment);

router.route('/customer').post(protect, addCustomerPayment);
router.route('/customer/:id').put(protect, updateCustomerPayment).delete(protect, deleteCustomerPayment);

module.exports = router;
