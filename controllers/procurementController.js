const Procurement = require('../models/Procurement');

// @desc    Get procurements by project ID
// @route   GET /api/procurements/project/:projectId
// @access  Private
const getProcurementsByProject = async (req, res) => {
  try {
    const procurements = await Procurement.find({ project: req.params.projectId });
    res.json(procurements);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
// @desc    Get all procurements
// @route   GET /api/procurements
// @access  Private
const getAllProcurements = async (req, res) => {
  try {
    const procurements = await Procurement.find({});
    res.json(procurements);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
// @desc    Add procurement
// @route   POST /api/procurements
// @access  Private
const addProcurement = async (req, res) => {
  try {
    const procurement = new Procurement(req.body);
    const createdProcurement = await procurement.save();
    res.status(201).json(createdProcurement);
  } catch (error) {
    res.status(400).json({ message: 'Invalid procurement data' });
  }
};

// @desc    Update procurement
// @route   PUT /api/procurements/:id
// @access  Private
const updateProcurement = async (req, res) => {
  try {
    const procurement = await Procurement.findById(req.params.id);
    if (procurement) {
      Object.assign(procurement, req.body);
      const updatedProcurement = await procurement.save();
      res.json(updatedProcurement);
    } else {
      res.status(404).json({ message: 'Procurement not found' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Invalid data' });
  }
};
const deleteProcurement = async (req, res) => {
  try {
    const procurement = await Procurement.findById(req.params.id);
    if (procurement) {
      await procurement.deleteOne();
      res.json({ message: 'Procurement removed' });
    } else {
      res.status(404).json({ message: 'Procurement not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { getProcurementsByProject, addProcurement, updateProcurement, deleteProcurement, getAllProcurements };
