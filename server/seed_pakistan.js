const mongoose = require("mongoose");
const User = require("./models/user.model");
const DonorInfo = require("./models/donor.info.model");
require("dotenv").config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/smart_donor_db";

const firstNames = [
  "Ahmed","Ali","Hassan","Usman","Bilal","Fahad","Zain","Hamza","Omar","Saad",
  "Tariq","Kashif","Junaid","Naveed","Shahid","Waqar","Adeel","Imran","Kamran","Rizwan",
  "Aisha","Fatima","Zainab","Hira","Sana","Noor","Amna","Maira","Rabia","Ayesha",
  "Maryam","Kiran","Nida","Laiba","Areeba","Bushra","Samina","Tahira","Uzma","Saima",
  "Asad","Faisal","Shoaib","Aamir","Nasir","Waheed","Rafiq","Saleem","Khalid","Majid",
  "Farhan","Danish","Rehan","Arslan","Awais","Talha","Yasir","Zubair","Irfan","Anwar",
  "Huma","Naila","Mehreen","Rubina","Shabnam","Zubaida","Parveen","Nasreen","Farzana","Shazia",
  "Mudassir","Ibrahim","Abdullah","Haroon","Aftab","Sajid","Naeem","Akbar","Aziz","Bashir",
  "Rameez","Taimoor","Shehryar","Qasim","Moeen","Babar","Wasim","Zahid","Sohail","Nadeem",
  "Sidra","Aliya","Farah","Nimra","Iqra","Amara","Sahar","Tania","Dua","Hafsa"
];

const lastNames = [
  "Khan","Ahmed","Ali","Hussain","Shah","Malik","Butt","Chaudhry","Iqbal","Rehman",
  "Siddiqui","Qureshi","Mirza","Raza","Javed","Nawaz","Sheikh","Baig","Abbasi","Aslam",
  "Mehmood","Saeed","Akram","Latif","Ghani","Niazi","Gill","Bhatti","Mughal","Hashmi",
  "Afridi","Yousafzai","Shinwari","Khattak","Durrani","Baloch","Mengal","Bugti","Marri","Jamali",
  "Leghari","Mazari","Khoso","Brohi","Chandio","Soomro","Memon","Junejo","Pathan","Rajput"
];

// All provinces, regions, AJK, GB - comprehensive Pakistan cities
const cities = [
  // Punjab
  { name: "Lahore", zipcode: "54000" },
  { name: "Faisalabad", zipcode: "38000" },
  { name: "Rawalpindi", zipcode: "46000" },
  { name: "Multan", zipcode: "60000" },
  { name: "Gujranwala", zipcode: "52250" },
  { name: "Sialkot", zipcode: "51310" },
  { name: "Bahawalpur", zipcode: "63100" },
  { name: "Sargodha", zipcode: "40100" },
  { name: "Jhang", zipcode: "35200" },
  { name: "Sahiwal", zipcode: "57000" },
  { name: "Dera Ghazi Khan", zipcode: "32200" },
  { name: "Gujrat", zipcode: "50700" },
  { name: "Jhelum", zipcode: "49600" },
  { name: "Sheikhupura", zipcode: "39350" },
  { name: "Kasur", zipcode: "55050" },
  { name: "Okara", zipcode: "56300" },
  { name: "Chiniot", zipcode: "35400" },
  { name: "Rahim Yar Khan", zipcode: "64200" },
  { name: "Mianwali", zipcode: "42200" },
  { name: "Khanewal", zipcode: "58150" },
  { name: "Hafizabad", zipcode: "52110" },
  { name: "Muzaffargarh", zipcode: "34200" },
  { name: "Attock", zipcode: "43600" },
  { name: "Vehari", zipcode: "61100" },
  { name: "Layyah", zipcode: "31200" },
  { name: "Pakpattan", zipcode: "57400" },
  { name: "Narowal", zipcode: "51600" },
  { name: "Chakwal", zipcode: "48800" },
  { name: "Bhakkar", zipcode: "30000" },
  { name: "Toba Tek Singh", zipcode: "36050" },
  { name: "Rajanpur", zipcode: "33500" },
  { name: "Lodhran", zipcode: "59320" },
  { name: "Khushab", zipcode: "41000" },
  { name: "Mandi Bahauddin", zipcode: "50400" },
  { name: "Nankana Sahib", zipcode: "39100" },
  { name: "Bahawalnagar", zipcode: "62300" },

  // Sindh
  { name: "Karachi", zipcode: "74000" },
  { name: "Hyderabad", zipcode: "71000" },
  { name: "Sukkur", zipcode: "65200" },
  { name: "Larkana", zipcode: "77150" },
  { name: "Nawabshah", zipcode: "67450" },
  { name: "Mirpur Khas", zipcode: "69000" },
  { name: "Jacobabad", zipcode: "79000" },
  { name: "Shikarpur", zipcode: "78100" },
  { name: "Khairpur", zipcode: "66020" },
  { name: "Dadu", zipcode: "76200" },
  { name: "Thatta", zipcode: "73130" },
  { name: "Badin", zipcode: "72210" },
  { name: "Tando Allahyar", zipcode: "70060" },
  { name: "Tando Adam", zipcode: "70160" },
  { name: "Umerkot", zipcode: "69200" },
  { name: "Sanghar", zipcode: "68100" },
  { name: "Ghotki", zipcode: "65400" },
  { name: "Matiari", zipcode: "71500" },
  { name: "Kashmore", zipcode: "65800" },

  // KPK
  { name: "Peshawar", zipcode: "25000" },
  { name: "Mardan", zipcode: "23200" },
  { name: "Abbottabad", zipcode: "22010" },
  { name: "Swat", zipcode: "19200" },
  { name: "Mansehra", zipcode: "21300" },
  { name: "Kohat", zipcode: "26000" },
  { name: "Bannu", zipcode: "28100" },
  { name: "Dera Ismail Khan", zipcode: "29050" },
  { name: "Charsadda", zipcode: "24420" },
  { name: "Nowshera", zipcode: "24100" },
  { name: "Swabi", zipcode: "23430" },
  { name: "Haripur", zipcode: "22620" },
  { name: "Dir Lower", zipcode: "18300" },
  { name: "Dir Upper", zipcode: "18200" },
  { name: "Chitral", zipcode: "17200" },
  { name: "Buner", zipcode: "19290" },
  { name: "Shangla", zipcode: "19300" },
  { name: "Battagram", zipcode: "21450" },
  { name: "Hangu", zipcode: "26200" },
  { name: "Karak", zipcode: "27200" },
  { name: "Lakki Marwat", zipcode: "28420" },
  { name: "Tank", zipcode: "29200" },
  { name: "Malakand", zipcode: "18800" },

  // Balochistan
  { name: "Quetta", zipcode: "87300" },
  { name: "Turbat", zipcode: "92600" },
  { name: "Khuzdar", zipcode: "89100" },
  { name: "Hub", zipcode: "90150" },
  { name: "Chaman", zipcode: "86400" },
  { name: "Gwadar", zipcode: "91200" },
  { name: "Zhob", zipcode: "85200" },
  { name: "Sibi", zipcode: "82000" },
  { name: "Loralai", zipcode: "84800" },
  { name: "Pishin", zipcode: "86300" },
  { name: "Kalat", zipcode: "88800" },
  { name: "Mastung", zipcode: "87800" },
  { name: "Nushki", zipcode: "88600" },
  { name: "Dera Murad Jamali", zipcode: "79700" },
  { name: "Jaffarabad", zipcode: "79600" },
  { name: "Ziarat", zipcode: "83200" },
  { name: "Panjgur", zipcode: "92300" },
  { name: "Awaran", zipcode: "89350" },
  { name: "Washuk", zipcode: "91800" },
  { name: "Lasbela", zipcode: "90100" },

  // Islamabad Capital Territory
  { name: "Islamabad", zipcode: "44000" },

  // Azad Jammu & Kashmir (AJK)
  { name: "Muzaffarabad", zipcode: "13100" },
  { name: "Mirpur", zipcode: "10250" },
  { name: "Rawalakot", zipcode: "12350" },
  { name: "Kotli", zipcode: "11100" },
  { name: "Bagh", zipcode: "12500" },
  { name: "Bhimber", zipcode: "10100" },
  { name: "Pallandri", zipcode: "12250" },
  { name: "Hattian Bala", zipcode: "13200" },
  { name: "Haveli", zipcode: "12100" },
  { name: "Neelum", zipcode: "13300" },

  // Gilgit-Baltistan
  { name: "Gilgit", zipcode: "15100" },
  { name: "Skardu", zipcode: "16100" },
  { name: "Hunza", zipcode: "15700" },
  { name: "Ghizer", zipcode: "15400" },
  { name: "Diamer", zipcode: "15500" },
  { name: "Astore", zipcode: "15200" },
  { name: "Ghanche", zipcode: "16200" },
  { name: "Shigar", zipcode: "16150" },
  { name: "Kharmang", zipcode: "16300" },
  { name: "Nagar", zipcode: "15600" },
];

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const genders = ["male", "female"];

function randomItem(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function randomPhone() {
  const prefix = ["030","031","032","033","034","035"];
  return randomItem(prefix) + Math.floor(10000000 + Math.random() * 90000000).toString();
}
function randomDate(startMonths, endMonths) {
  const now = new Date();
  const start = new Date(now); start.setMonth(start.getMonth() - startMonths);
  const end = new Date(now); end.setMonth(end.getMonth() - endMonths);
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

async function seedPakistan() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB:", MONGO_URI);

    const usedEmails = new Set();
    const existingUsers = await User.find({}, { email: 1 });
    existingUsers.forEach(u => usedEmails.add(u.email));
    console.log(`Existing users: ${usedEmails.size}`);

    let successCount = 0;
    const DONORS_PER_CITY = 8; // 8 donors per city = ~920 new donors

    for (const city of cities) {
      for (let i = 0; i < DONORS_PER_CITY; i++) {
        const firstName = randomItem(firstNames);
        const lastName = randomItem(lastNames);
        const name = `${firstName} ${lastName}`;

        let email;
        do {
          const num = Math.floor(Math.random() * 99999);
          email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${num}@example.com`;
        } while (usedEmails.has(email));
        usedEmails.add(email);

        const age = Math.floor(18 + Math.random() * 47);
        const gender = randomItem(genders);
        const bloodGroup = randomItem(bloodGroups);
        const lastDonationDate = randomDate(12, 0);
        const available = Math.random() > 0.25; // 75% available

        try {
          const user = new User({
            name, email, password: "123",
            bloodGroup, gender, age,
            city: city.name, phone: randomPhone(),
            role: "donor", zipcode: city.zipcode,
          });
          await user.save();

          const donations = [];
          const donCount = Math.floor(1 + Math.random() * 8);
          for (let d = 0; d < donCount; d++) {
            donations.push({ date: randomDate(24, 0), location: city.name });
          }

          await DonorInfo.create({
            lastDonationDate, available,
            donationCount: donations,
            donorRefID: user._id,
          });
          successCount++;
        } catch (err) {
          if (err.code === 11000) continue;
        }
      }
      process.stdout.write(`\r${city.name} done (${successCount} total)`);
    }

    const totalUsers = await User.countDocuments();
    const totalDonors = await DonorInfo.countDocuments();
    console.log(`\n\nDone! Added ${successCount} new donors from all over Pakistan.`);
    console.log(`Total users now: ${totalUsers}`);
    console.log(`Total donor records: ${totalDonors}`);

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error("Seeding error:", error);
    await mongoose.disconnect();
    process.exit(1);
  }
}

seedPakistan();
