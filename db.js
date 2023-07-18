const mongoose = require('mongoose');
require('dotenv').config();

async function connectToMongoDb() {
    try {
      await mongoose.connect(
        `mongodb+srv://kyawtk:${process.env.MONGODB_PASSWORD}@cluster0.a3rfqge.mongodb.net/notebook`,
        // Add options if needed
      );
      console.log('Connected to MongoDB');
    } catch (err) {
      console.error('Failed to connect to MongoDB:', err);
      process.exit(1);
    }
  }

  module.exports = connectToMongoDb;