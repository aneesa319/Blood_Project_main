const User = require("../models/user.model");
const DonorInfo = require("../models/donor.info.model");

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

  const userData = await User.findOne({ city: { $regex: new RegExp(`^${city}$`, 'i') } });
  if (!userData) {
    throw new Error('City ZIP code not found');
  }

  const patientZip = parseInt(userData.zipcode);
  const compatibleGroups = bloodCompatibility[bloodGroup];

  if (!compatibleGroups) {
    throw new Error('Invalid blood group');
  }

  const totalDonors = await User.countDocuments({ role: 'donor' });

  const allCompatibleUsers = await User.find({
    bloodGroup: { $in: compatibleGroups },
    role: 'donor',
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
      zipDifference: Math.abs(parseInt(donor.zipcode) - patientZip),
    };
  });

  eligibleDonors.sort((a, b) => a.zipDifference - b.zipDifference);
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
