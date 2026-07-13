const mongoose = require('mongoose');

const contractorPaymentSchema = mongoose.Schema({
  contractor: { type: mongoose.Schema.Types.ObjectId, ref: 'Contractor', required: true },
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
  date: { type: String, required: true },
  amount: { type: Number, required: true },
  note: { type: String }
}, {
  timestamps: true
});

module.exports = mongoose.model('ContractorPayment', contractorPaymentSchema);
