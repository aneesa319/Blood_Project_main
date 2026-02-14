const mongoose = require("mongoose");
const User = require("./models/user.model");
const DonorInfo = require("./models/donor.info.model");
require("dotenv").config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/smart_donor_db";

const firstNames = [
  "Ahmed", "Ali", "Hassan", "Usman", "Bilal", "Fahad", "Zain", "Hamza", "Omar", "Saad",
  "Tariq", "Kashif", "Junaid", "Naveed", "Shahid", "Waqar", "Adeel", "Imran", "Kamran", "Rizwan",
  "Aisha", "Fatima", "Zainab", "Hira", "Sana", "Noor", "Amna", "Maira", "Rabia", "Ayesha",
  "Maryam", "Kiran", "Nida", "Laiba", "Areeba", "Bushra", "Samina", "Tahira", "Uzma", "Saima",
  "Asad", "Faisal", "Shoaib", "Aamir", "Nasir", "Waheed", "Rafiq", "Saleem", "Khalid", "Majid",
  "Farhan", "Danish", "Rehan", "Arslan", "Awais", "Talha", "Yasir", "Zubair", "Irfan", "Anwar",
  "Huma", "Naila", "Mehreen", "Rubina", "Shabnam", "Zubaida", "Parveen", "Nasreen", "Farzana", "Shazia"
];

const lastNames = [
  "Khan", "Ahmed", "Ali", "Hussain", "Shah", "Malik", "Butt", "Chaudhry", "Iqbal", "Rehman",
  "Siddiqui", "Qureshi", "Mirza", "Raza", "Javed", "Nawaz", "Sheikh", "Baig", "Abbasi", "Aslam",
  "Mehmood", "Saeed", "Akram", "Latif", "Ghani", "Niazi", "Gill", "Bhatti", "Mughal", "Hashmi"
];

const cities = [
  { name: "Islamabad", zipcode: "44000" },
  { name: "Lahore", zipcode: "54000" },
  { name: "Karachi", zipcode: "74000" },
  { name: "Faisalabad", zipcode: "38000" },
  { name: "Rawalpindi", zipcode: "46000" },
  { name: "Multan", zipcode: "60000" },
  { name: "Peshawar", zipcode: "25000" },
  { name: "Quetta", zipcode: "87300" },
  { name: "Sialkot", zipcode: "51310" },
  { name: "Gujranwala", zipcode: "52250" },
  { name: "Hyderabad", zipcode: "71000" },
  { name: "Bahawalpur", zipcode: "63100" },
  { name: "Sargodha", zipcode: "40100" },
  { name: "Abbottabad", zipcode: "22010" },
  { name: "Mardan", zipcode: "23200" },
  { name: "Swat", zipcode: "19200" },
  { name: "Jhang", zipcode: "35200" },
  { name: "Sahiwal", zipcode: "57000" },
  { name: "Dera Ghazi Khan", zipcode: "32200" },
  { name: "Larkana", zipcode: "77150" },
  { name: "Mirpur", zipcode: "10250" },
  { name: "Muzaffarabad", zipcode: "13100" },
  { name: "Sukkur", zipcode: "65200" },
  { name: "Rahim Yar Khan", zipcode: "64200" },
  { name: "Jhelum", zipcode: "49600" },
  { name: "Gujrat", zipcode: "50700" },
  { name: "Chiniot", zipcode: "35400" },
  { name: "Kasur", zipcode: "55050" },
  { name: "Okara", zipcode: "56300" },
  { name: "Sheikhupura", zipcode: "39350" }
];

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const genders = ["male", "female"];

function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomPhone() {
  const prefix = ["030", "031", "032", "033", "034", "035"];
  return randomItem(prefix) + Math.floor(10000000 + Math.random() * 90000000).toString();
}

function randomDate(startMonths, endMonths) {
  const now = new Date();
  const start = new Date(now);
  start.setMonth(start.getMonth() - startMonths);
  const end = new Date(now);
  end.setMonth(end.getMonth() - endMonths);
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

async function seedExtra() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB:", MONGO_URI);

    const TOTAL = 500;
    let successCount = 0;
    const usedEmails = new Set();

    // Get existing emails to avoid duplicates
    const existingUsers = await User.find({}, { email: 1 });
    existingUsers.forEach(u => usedEmails.add(u.email));

    for (let i = 0; i < TOTAL; i++) {
      const firstName = randomItem(firstNames);
      const lastName = randomItem(lastNames);
      const name = `${firstName} ${lastName}`;

      // Generate unique email
      let email;
      do {
        const num = Math.floor(Math.random() * 99999);
        email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${num}@example.com`;
      } while (usedEmails.has(email));
      usedEmails.add(email);

      const city = randomItem(cities);
      const age = Math.floor(18 + Math.random() * 47); // 18-65
      const gender = randomItem(genders);
      const bloodGroup = randomItem(bloodGroups);
      const lastDonationDate = randomDate(12, 0); // within last 12 months
      const available = Math.random() > 0.3; // 70% available
      const donationCount = Math.floor(1 + Math.random() * 10);

      try {
        const user = new User({
          name,
          email,
          password: "123",
          bloodGroup,
          gender,
          age,
          city: city.name,
          phone: randomPhone(),
          role: "donor",
          zipcode: city.zipcode,
        });
        await user.save();

        // Create donation history
        const donations = [];
        for (let d = 0; d < donationCount; d++) {
          donations.push({
            date: randomDate(24, 0),
            location: randomItem(cities).name,
          });
        }

        const donorInfo = new DonorInfo({
          lastDonationDate,
          available,
          donationCount: donations,
          donorRefID: user._id,
        });
        await donorInfo.save();
        successCount++;

        if (successCount % 50 === 0) {
          console.log(`Seeded ${successCount}/${TOTAL} donors...`);
        }
      } catch (err) {
        // Skip duplicate emails
        if (err.code === 11000) continue;
        console.error(`Error seeding donor ${i}:`, err.message);
      }
    }

    const totalUsers = await User.countDocuments();
    const totalDonors = await DonorInfo.countDocuments();
    console.log(`\nDone! Added ${successCount} new donors.`);
    console.log(`Total users: ${totalUsers}`);
    console.log(`Total donor records: ${totalDonors}`);

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error("Seeding error:", error);
    await mongoose.disconnect();
    process.exit(1);
  }
}

seedExtra();
