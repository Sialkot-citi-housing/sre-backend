const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
  plot: { type: String, required: true },
  size: { type: String, required: true },
  phase: { type: String, required: true },
  client: { type: String, required: true },
  budget: { type: Number, required: true, default: 0 },
  spent: { type: Number, required: true, default: 0 },
  dayCurrent: { type: Number, required: true, default: 0 },
  dayTotal: { type: Number, required: true, default: 0 },
  status: { type: String, enum: ['active', 'completed'], default: 'active' },
  startedAt: { type: String, required: true },
  completedAt: { type: String }
}, {
  timestamps: true
});

module.exports = mongoose.model('Project', projectSchema);
