const ContractorPayment = require('../models/ContractorPayment');
const CustomerPayment = require('../models/CustomerPayment');

// @desc    Get payments by project ID (both customer and contractor)
// @route   GET /api/payments/project/:projectId
// @access  Private
const getPaymentsByProject = async (req, res) => {
  try {
    const contractorPayments = await ContractorPayment.find({ project: req.params.projectId });
    const customerPayments = await CustomerPayment.find({ project: req.params.projectId });
    res.json({ contractorPayments, customerPayments });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
// @desc    Get all contractor payments
// @route   GET /api/payments/contractor
// @access  Private
const getAllContractorPayments = async (req, res) => {
  try {
    const contractorPayments = await ContractorPayment.find({});
    res.json(contractorPayments);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
// @desc    Add contractor payment
// @route   POST /api/payments/contractor
// @access  Private
const addContractorPayment = async (req, res) => {
  try {
    const payment = new ContractorPayment(req.body);
    const createdPayment = await payment.save();
    res.status(201).json(createdPayment);
  } catch (error) {
    res.status(400).json({ message: 'Invalid data' });
  }
};

// @desc    Update contractor payment
// @route   PUT /api/payments/contractor/:id
// @access  Private
const updateContractorPayment = async (req, res) => {
  try {
    const payment = await ContractorPayment.findById(req.params.id);
    if (payment) {
      Object.assign(payment, req.body);
      const updated = await payment.save();
      res.json(updated);
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Invalid data' });
  }
};

// @desc    Add customer payment
// @route   POST /api/payments/customer
// @access  Private
const addCustomerPayment = async (req, res) => {
  try {
    const payment = new CustomerPayment(req.body);
    const createdPayment = await payment.save();
    res.status(201).json(createdPayment);
  } catch (error) {
    res.status(400).json({ message: 'Invalid data' });
  }
};

// @desc    Update customer payment
// @route   PUT /api/payments/customer/:id
// @access  Private
const updateCustomerPayment = async (req, res) => {
  try {
    const payment = await CustomerPayment.findById(req.params.id);
    if (payment) {
      Object.assign(payment, req.body);
      const updated = await payment.save();
      res.json(updated);
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Invalid data' });
  }
};

const deleteContractorPayment = async (req, res) => {
  try {
    const payment = await ContractorPayment.findById(req.params.id);
    if (payment) {
      await payment.deleteOne();
      res.json({ message: 'Contractor Payment removed' });
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

const deleteCustomerPayment = async (req, res) => {
  try {
    const payment = await CustomerPayment.findById(req.params.id);
    if (payment) {
      await payment.deleteOne();
      res.json({ message: 'Customer Payment removed' });
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { 
  getPaymentsByProject, 
  getAllContractorPayments,
  addContractorPayment, 
  updateContractorPayment, 
  deleteContractorPayment,
  addCustomerPayment, 
  updateCustomerPayment,
  deleteCustomerPayment
};
