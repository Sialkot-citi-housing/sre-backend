const mongoose = require('mongoose');

const itemSchema = mongoose.Schema({
  description: { type: String, required: true },
  quantity: { type: Number, required: true },
  rate: { type: Number, required: true },
  amount: { type: Number, required: true }
});

const invoiceSchema = mongoose.Schema({
  invoiceNumber: { type: String, required: true, unique: true },
  date: { type: String, required: true },
  dueDate: { type: String, required: true },
  customerName: { type: String, required: true },
  customerPhone: { type: String, required: true },
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
  items: [itemSchema],
  totalAmount: { type: Number, required: true },
  status: { type: String, enum: ['Paid', 'Unpaid'], default: 'Unpaid' },
  pdfUrl: { type: String }, // URL from Cloudinary
  notes: { type: String }
}, {
  timestamps: true
});

module.exports = mongoose.model('Invoice', invoiceSchema);
