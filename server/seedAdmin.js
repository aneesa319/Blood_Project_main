// Run this once to create an admin user:
// node seedAdmin.js

require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/user.model");

const MONGO_URI = process.env.MONGO_URI || process.env.MONGO_DB_URL;

async function seedAdmin() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");

    // Check if admin already exists
    const existing = await User.findOne({ role: "admin" });
    if (existing) {
      console.log("Admin already exists:");
      console.log(`  Email: ${existing.email}`);
      console.log(`  Name: ${existing.name}`);
      console.log("Use this email to login as admin.");
      await mongoose.disconnect();
      return;
    }

    // Create admin user
    const admin = new User({
      name: "Admin",
      email: "admin@lifesaver.com",
      password: "admin123",
      bloodGroup: "O+",
      gender: "male",
      age: 30,
      city: "Islamabad",
      phone: "03001234567",
      role: "admin",
      zipcode: "44000",
    });

    await admin.save();
    console.log("Admin user created successfully!");
    console.log("  Email: admin@lifesaver.com");
    console.log("  Password: admin123");

    await mongoose.disconnect();
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
}

seedAdmin();
