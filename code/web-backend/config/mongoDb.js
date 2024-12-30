const mongoose = require('mongoose');
require('dotenv').config();

const connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database is connected");
  } catch (error) {
    console.error("Database Connection failed with an error:", error.message);
    process.exit(1);
  }
};

module.exports = connectDatabase;
