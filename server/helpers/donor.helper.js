const User = require("../models/user.model");
const DonorInfo = require("../models/donor.info.model");

const cityZipcodeMap = {
  // Punjab
  "Lahore": "54000", "Faisalabad": "38000", "Rawalpindi": "46000", "Multan": "60000",
  "Gujranwala": "52250", "Sialkot": "51310", "Bahawalpur": "63100", "Sargodha": "40100",
  "Jhang": "35200", "Sahiwal": "57000", "Dera Ghazi Khan": "32200", "Gujrat": "50700",
  "Jhelum": "49600", "Sheikhupura": "39350", "Kasur": "55050", "Okara": "56300",
  "Chiniot": "35400", "Rahim Yar Khan": "64200", "Mianwali": "42200", "Khanewal": "58150",
  "Hafizabad": "52110", "Muzaffargarh": "34200", "Attock": "43600", "Vehari": "61100",
  "Layyah": "31200", "Pakpattan": "57400", "Narowal": "51600", "Chakwal": "48800",
  "Bhakkar": "30000", "Toba Tek Singh": "36050", "Rajanpur": "33500", "Lodhran": "59320",
  "Khushab": "41000", "Mandi Bahauddin": "50400", "Nankana Sahib": "39100", "Bahawalnagar": "62300",
  // Sindh
  "Karachi": "74000", "Hyderabad": "71000", "Sukkur": "65200", "Larkana": "77150",
  "Nawabshah": "67450", "Mirpur Khas": "69000", "Jacobabad": "79000", "Shikarpur": "78100",
  "Khairpur": "66020", "Dadu": "76200", "Thatta": "73130", "Badin": "72210",
  "Tando Allahyar": "70060", "Tando Adam": "70160", "Umerkot": "69200", "Sanghar": "68100",
  "Ghotki": "65400", "Matiari": "71500", "Kashmore": "65800",
  // KPK
  "Peshawar": "25000", "Mardan": "23200", "Abbottabad": "22010", "Swat": "19200",
  "Mansehra": "21300", "Kohat": "26000", "Bannu": "28100", "Dera Ismail Khan": "29050",
  "Charsadda": "24420", "Nowshera": "24100", "Swabi": "23430", "Haripur": "22620",
  "Dir Lower": "18300", "Dir Upper": "18200", "Chitral": "17200", "Buner": "19290",
  "Shangla": "19300", "Battagram": "21450", "Hangu": "26200", "Karak": "27200",
  "Lakki Marwat": "28420", "Tank": "29200", "Malakand": "18800",
  // Balochistan
  "Quetta": "87300", "Turbat": "92600", "Khuzdar": "89100", "Hub": "90150",
  "Chaman": "86400", "Gwadar": "91200", "Zhob": "85200", "Sibi": "82000",
  "Loralai": "84800", "Pishin": "86300", "Kalat": "88800", "Mastung": "87800",
  "Nushki": "88600", "Dera Murad Jamali": "79700", "Jaffarabad": "79600", "Ziarat": "83200",
  "Panjgur": "92300", "Awaran": "89350", "Washuk": "91800", "Lasbela": "90100",
  // Islamabad
  "Islamabad": "44000",
  // AJK
  "Muzaffarabad": "13100", "Mirpur": "10250", "Rawalakot": "12350", "Kotli": "11100",
  "Bagh": "12500", "Bhimber": "10100", "Pallandri": "12250", "Hattian Bala": "13200",
  "Haveli": "12100", "Neelum": "13300",
  // Gilgit-Baltistan
  "Gilgit": "15100", "Skardu": "16100", "Hunza": "15700", "Ghizer": "15400",
  "Diamer": "15500", "Astore": "15200", "Ghanche": "16200", "Shigar": "16150",
  "Kharmang": "16300", "Nagar": "15600",
};

const bloodCompatibility = {
  'A+':  ['A+', 'A-', 'O+', 'O-'],
  'A-':  ['A-', 'O-'],
  'B+':  ['B+', 'B-', 'O+', 'O-'],
  'B-':  ['B-', 'O-'],
  'AB+': ['A+', 'B+', 'AB+', 'O+', 'A-', 'B-', 'AB-', 'O-'],
  'AB-': ['A-', 'B-', 'AB-', 'O-'],
  'O+':  ['O+', 'O-'],
  'O-':  ['O-'],
};

/**
 * Finds donors based on blood group and city (proximity logic based on ZIP).
 * @param {String} bloodGroup - Blood group of the patient
 * @param {String} city - City of the patient
 * @param {Number} page - Page number for pagination
 * @param {Number} limit - Number of results per page
 * @returns {Object} - Paginated list of eligible donors and counts
 */
async function findCompatibleDonors(bloodGroup, city, page = 1, limit = 9) {
  const skip = (page - 1) * limit;

  // Look up zipcode from map (case-insensitive)
  const cityKey = Object.keys(cityZipcodeMap).find(k => k.toLowerCase() === city.toLowerCase());
  if (!cityKey) {
    throw new Error('City ZIP code not found');
  }
  const patientZip = parseInt(cityZipcodeMap[cityKey]);
  const compatibleGroups = bloodCompatibility[bloodGroup];

  if (!compatibleGroups) {
    throw new Error('Invalid blood group');
  }

  const totalDonors = await User.countDocuments({ role: 'donor' });

  // Only find donors in the exact searched city with compatible blood group
  const allCompatibleUsers = await User.find({
    bloodGroup: { $in: compatibleGroups },
    role: 'donor',
    city: { $regex: new RegExp(`^${cityKey}$`, 'i') },
  });

  const donorUserIds = allCompatibleUsers.map(user => user._id);
  const totalCompatibleDonors = donorUserIds.length;

  const donorInfoList = await DonorInfo.find({
    donorRefID: { $in: donorUserIds },
    available: true,
  }).populate('donorRefID');

  const eligibleDonors = donorInfoList.map(info => {
    const donor = info.donorRefID;
    return {
      name: donor.name,
      email: donor.email,
      phone: donor.phone,
      city: donor.city,
      bloodGroup: donor.bloodGroup,
      zipcode: donor.zipcode,
      availability: true,
      lastDonationDate: info.lastDonationDate,
      donationCount: info.donationCount,
    };
  });

  const totalEligibleDonors = eligibleDonors.length;
  const totalPages = Math.ceil(totalEligibleDonors / limit);
  const paginatedDonors = eligibleDonors.slice(skip, skip + limit);

  return {
    currentPage: page,
    totalPages,
    totalDonors,
    totalCompatibleDonors,
    totalEligibleDonors,
    donors: paginatedDonors,
  };
}

module.exports = { findCompatibleDonors };
