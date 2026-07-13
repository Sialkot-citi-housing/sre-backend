require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const connectDB = require('./config/db');

const importData = async () => {
  try {
    await connectDB();

    // Drop all collections (Clean DB as requested)
    console.log('Clearing database...');
    const collections = mongoose.connection.collections;
    for (const key in collections) {
      await collections[key].drop();
    }
    console.log('Database cleared.');

    const adminUser = new User({
      name: 'Admin Khan',
      email: 'a.khan@sre.pk',
      password: 'SreAdmin@2026!', // This gets hashed by the pre-save hook
      role: 'admin'
    });

    await adminUser.save();
    console.log('Admin user created: a.khan@sre.pk');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

importData();
