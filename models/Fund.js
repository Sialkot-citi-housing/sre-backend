const mongoose = require('mongoose');

const fundSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  method: {
    type: String,
    required: true,
  },
  from: {
    type: String,
    required: true,
  },
  note: {
    type: String,
  },
}, {
  timestamps: true,
});

const Fund = mongoose.model('Fund', fundSchema);

module.exports = Fund;
