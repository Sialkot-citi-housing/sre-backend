const mongoose = require('mongoose');

const mongoURI = "mongodb+srv://hamidtechventures_db_user:3IHIxKgya4MVA5vS@construction-portal.2jmrwd3.mongodb.net/?appName=construction-portal";

async function clearDB() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(mongoURI);
    console.log('Connected.');
    
    // Drop the entire database
    await mongoose.connection.db.dropDatabase();
    console.log('Database dropped successfully.');
    
    process.exit(0);
  } catch (err) {
    console.error('Error clearing DB:', err);
    process.exit(1);
  }
}

clearDB();
