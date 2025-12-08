const mongoose = require("mongoose");

async function connectDB() {
  if (!process.env.MONGO_URI) {
    console.error("❌ FATAL: Missing MONGO_URI environment variable");
    process.exit(1);
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message || error);
    process.exit(1);
  }
}

module.exports = connectDB;
