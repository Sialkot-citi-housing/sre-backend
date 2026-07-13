require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const projectRoutes = require('./routes/projectRoutes');
const procurementRoutes = require('./routes/procurementRoutes');
const contractorRoutes = require('./routes/contractorRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const fundRoutes = require('./routes/fundRoutes');
const officeExpenseRoutes = require('./routes/officeExpenseRoutes');

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/procurements', procurementRoutes);
app.use('/api/contractors', contractorRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/funds', fundRoutes);
app.use('/api/office-expenses', officeExpenseRoutes);

app.get('/', (req, res) => {
  res.send('SRE API is running...');
});

const PORT = process.env.PORT || 5000;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
