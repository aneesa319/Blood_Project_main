const mongoose = require("mongoose");
const User = require("./models/user.model");
const DonorInfo = require("./models/donor.info.model");
const importZipcodes = require("./zipcodeConfiguration/importZipcodes");
const donors = require("./random_donors_100.json");
require("dotenv").config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/smart_donor_db";

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB:", MONGO_URI);

    // Clear existing data
    await User.deleteMany({});
    await DonorInfo.deleteMany({});
    const Location = require("./models/location.model");
    await Location.deleteMany({});
    console.log("Cleared existing data from all collections.");

    // Import zipcodes from CSV
    await importZipcodes();
    console.log("Zipcodes imported successfully.");

    // Seed donors
    let successCount = 0;
    for (const donor of donors) {
      const user = new User({
        name: donor.name,
        email: donor.email,
        password: donor.password,
        bloodGroup: donor.bloodGroup,
        gender: donor.gender,
        age: donor.age,
        city: donor.city,
        phone: donor.phone,
        role: donor.role,
        zipcode: donor.zipcode,
      });
      await user.save(); // triggers password hashing via pre-save hook

      // Create DonorInfo record
      const donorInfo = new DonorInfo({
        lastDonationDate: donor.lastDonationDate ? new Date(donor.lastDonationDate) : null,
        available: donor.isAvailable,
        donationCount: donor.lastDonationDate
          ? [{ date: new Date(donor.lastDonationDate), location: donor.city }]
          : [],
        donorRefID: user._id,
      });
      await donorInfo.save();
      successCount++;
    }

    console.log(`Seeded ${successCount} donors with DonorInfo records.`);

    // Summary
    const userCount = await User.countDocuments();
    const donorInfoCount = await DonorInfo.countDocuments();
    const locationCount = await Location.countDocuments();
    console.log("\n--- Database Summary ---");
    console.log(`Users: ${userCount}`);
    console.log(`DonorInfo: ${donorInfoCount}`);
    console.log(`Locations: ${locationCount}`);
    console.log("Database seeded successfully!");

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error("Seeding error:", error);
    await mongoose.disconnect();
    process.exit(1);
  }
}

seed();
