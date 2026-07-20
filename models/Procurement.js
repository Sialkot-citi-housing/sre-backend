const mongoose = require('mongoose');

const procurementSchema = mongoose.Schema({
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
  date: { type: String, required: true },
  item: { type: String, required: true },
  category: { 
    type: String, 
    enum: ['bricks', 'cement', 'steel', 'sand', 'crush', 'other'], 
    required: true 
  },
  quantity: { type: Number, required: true },
  unit: { type: String, required: true },
  rate: { type: Number, required: true },
  vendor: { type: String, required: true },
  paid: { type: Number, required: true, default: 0 }
}, {
  timestamps: true
});

module.exports = mongoose.model('Procurement', procurementSchema);
