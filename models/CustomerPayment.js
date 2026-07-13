const mongoose = require('mongoose');

const customerPaymentSchema = mongoose.Schema({
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
  date: { type: String, required: true },
  amount: { type: Number, required: true },
  method: { 
    type: String, 
    enum: ['Cash', 'Bank Transfer', 'Cheque'], 
    required: true 
  },
  note: { type: String }
}, {
  timestamps: true
});

module.exports = mongoose.model('CustomerPayment', customerPaymentSchema);
