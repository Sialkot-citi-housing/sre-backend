const Contractor = require('../models/Contractor');

// @desc    Get contractors by project ID
// @route   GET /api/contractors/project/:projectId
// @access  Private
const getContractorsByProject = async (req, res) => {
  try {
    const contractors = await Contractor.find({ project: req.params.projectId });
    res.json(contractors);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
// @desc    Get all contractors
// @route   GET /api/contractors
// @access  Private
const getAllContractors = async (req, res) => {
  try {
    const contractors = await Contractor.find({});
    res.json(contractors);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
// @desc    Add contractor
// @route   POST /api/contractors
// @access  Private
const addContractor = async (req, res) => {
  try {
    const contractor = new Contractor(req.body);
    const createdContractor = await contractor.save();
    res.status(201).json(createdContractor);
  } catch (error) {
    res.status(400).json({ message: 'Invalid data' });
  }
};

// @desc    Update contractor
// @route   PUT /api/contractors/:id
// @access  Private
const updateContractor = async (req, res) => {
  try {
    const contractor = await Contractor.findById(req.params.id);
    if (contractor) {
      Object.assign(contractor, req.body);
      const updatedContractor = await contractor.save();
      res.json(updatedContractor);
    } else {
      res.status(404).json({ message: 'Contractor not found' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Invalid data' });
  }
};
const deleteContractor = async (req, res) => {
  try {
    const contractor = await Contractor.findById(req.params.id);
    if (contractor) {
      await contractor.deleteOne();
      res.json({ message: 'Contractor removed' });
    } else {
      res.status(404).json({ message: 'Contractor not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { getContractorsByProject, addContractor, updateContractor, deleteContractor, getAllContractors };
