const { findCompatibleDonors } = require('../helpers/donor.helper');

  async function findDonorByNearestZipCodeAndBloodGroup(req, res) {
    try {
      const { bloodGroup, city } = req.body;
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 9;
  
      const donorData = await findCompatibleDonors(bloodGroup, city, page, limit);
      return res.status(200).json(donorData);
  
    } catch (error) {
      console.error('Error in donor search:', error.message);
      return res.status(500).json({ message: error.message });
    }
  }

  module.exports = findDonorByNearestZipCodeAndBloodGroup;
