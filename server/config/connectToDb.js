if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const mongoose = require('mongoose');

async function connectToDb() {
  try {
    // Log to confirm DB_URL is loaded correctly
    console.log("Connecting to DB:", process.env.DB_URL);

    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('✅ Connected to MongoDB');
  } catch (err) {
    console.error('❌ Failed to connect to MongoDB:', err.message);
  }
}

module.exports = connectToDb;
