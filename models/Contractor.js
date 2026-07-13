const mongoose = require('mongoose');

const contractorSchema = mongoose.Schema({
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
  role: { 
    type: String, 
    enum: ['Thekadar', 'Plumber', 'Electrician', 'Designer (Painter)', 'Ceiling / Palling'], 
    required: true 
  },
  name: { type: String, required: true },
  contact: { type: String, required: true },
  agreedAmount: { type: Number, required: true },
  status: { 
    type: String, 
    enum: ['Active', 'Completed', 'On hold'], 
    default: 'Active' 
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Contractor', contractorSchema);
