const userModel = require('../models/user.model');
const donorInfoModel = require('../models/donor.info.model');

const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await userModel.countDocuments();
    const totalDonors = await userModel.countDocuments({ role: 'donor' });
    const totalPatients = await userModel.countDocuments({ role: 'patient' });
    const availableDonors = await donorInfoModel.countDocuments({ available: true });

    res.status(200).json({
      totalUsers,
      totalDonors,
      totalPatients,
      availableDonors
    });
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    res.status(500).json({ msg: "Server error" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const users = await userModel.find().select('-password').skip(skip).limit(limit).sort({ createdAt: -1 });
    const total = await userModel.countDocuments();

    res.status(200).json({
      users,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      totalUsers: total
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ msg: "Server error" });
  }
};

const getRecentRegistrations = async (req, res) => {
  try {
    const recent = await userModel.find()
      .select('-password')
      .sort({ createdAt: -1 })
      .limit(10);

    res.status(200).json({ users: recent });
  } catch (error) {
    console.error("Error fetching recent registrations:", error);
    res.status(500).json({ msg: "Server error" });
  }
};

const getBloodGroupDistribution = async (req, res) => {
  try {
    const distribution = await userModel.aggregate([
      { $match: { role: 'donor' } },
      { $group: { _id: '$bloodGroup', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    res.status(200).json({ distribution });
  } catch (error) {
    console.error("Error fetching blood group distribution:", error);
    res.status(500).json({ msg: "Server error" });
  }
};

// Delete a user by ID
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    // If user is a donor, also remove donor info
    if (user.role === 'donor') {
      await donorInfoModel.deleteOne({ donorRefID: id });
    }
    await userModel.findByIdAndDelete(id);
    res.status(200).json({ msg: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ msg: "Server error" });
  }
};

// Search users by name, email, city, or blood group
const searchUsers = async (req, res) => {
  try {
    const { q, role } = req.query;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const filter = {};

    if (q) {
      filter.$or = [
        { name: { $regex: q, $options: 'i' } },
        { email: { $regex: q, $options: 'i' } },
        { city: { $regex: q, $options: 'i' } },
        { bloodGroup: { $regex: q, $options: 'i' } },
        { phone: { $regex: q, $options: 'i' } },
      ];
    }

    if (role && role !== 'all') {
      filter.role = role;
    }

    const users = await userModel.find(filter)
      .select('-password')
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await userModel.countDocuments(filter);

    res.status(200).json({
      users,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      totalUsers: total
    });
  } catch (error) {
    console.error("Error searching users:", error);
    res.status(500).json({ msg: "Server error" });
  }
};

// Get all donors with location info for map
const getAllDonorsForMap = async (req, res) => {
  try {
    const donors = await userModel.find({ role: 'donor' }).select('name bloodGroup city phone available');
    const donorInfos = await donorInfoModel.find().select('donorRefID available donationCount lastDonationDate');

    const donorMap = {};
    donorInfos.forEach(info => {
      donorMap[info.donorRefID.toString()] = info;
    });

    const result = donors.map(donor => {
      const info = donorMap[donor._id.toString()];
      return {
        _id: donor._id,
        name: donor.name,
        bloodGroup: donor.bloodGroup,
        city: donor.city,
        phone: donor.phone,
        available: info ? info.available : true,
        donationCount: info ? info.donationCount : [],
        lastDonationDate: info ? info.lastDonationDate : null,
      };
    });

    res.status(200).json({ donors: result });
  } catch (error) {
    console.error("Error fetching donors for map:", error);
    res.status(500).json({ msg: "Server error" });
  }
};

// Update a user by ID
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, bloodGroup, city, phone, age, gender, role, zipcode } = req.body;

    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Check if email is being changed and already exists
    if (email && email !== user.email) {
      const emailExists = await userModel.findOne({ email, _id: { $ne: id } });
      if (emailExists) {
        return res.status(400).json({ msg: "Email already in use" });
      }
    }

    // Update fields
    if (name) user.name = name;
    if (email) user.email = email;
    if (bloodGroup) user.bloodGroup = bloodGroup;
    if (city) user.city = city;
    if (phone) user.phone = phone;
    if (age) user.age = age;
    if (gender) user.gender = gender;
    if (role) user.role = role;
    if (zipcode) user.zipcode = zipcode;

    await user.save();

    const updatedUser = await userModel.findById(id).select('-password');
    res.status(200).json({ msg: "User updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ msg: "Server error" });
  }
};

// Toggle donor availability
const toggleDonorAvailability = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the donor info record
    const donorInfo = await donorInfoModel.findOne({ donorRefID: id });
    if (!donorInfo) {
      return res.status(404).json({ msg: "Donor info not found" });
    }

    donorInfo.available = !donorInfo.available;
    await donorInfo.save();

    res.status(200).json({
      msg: `Donor is now ${donorInfo.available ? 'available' : 'unavailable'}`,
      available: donorInfo.available
    });
  } catch (error) {
    console.error("Error toggling availability:", error);
    res.status(500).json({ msg: "Server error" });
  }
};

// Get single user details with donor info
const getUserDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.findById(id).select('-password');
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    let donorInfo = null;
    if (user.role === 'donor') {
      donorInfo = await donorInfoModel.findOne({ donorRefID: id });
    }

    res.status(200).json({ user, donorInfo });
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({ msg: "Server error" });
  }
};

// Export all users (no pagination)
const exportAllUsers = async (req, res) => {
  try {
    const filter = {};
    const { role } = req.query;
    if (role && role !== 'all') {
      filter.role = role;
    }

    const users = await userModel.find(filter).select('-password').sort({ createdAt: -1 });

    // For donors, attach availability info
    const donorInfos = await donorInfoModel.find().select('donorRefID available donationCount');
    const donorMap = {};
    donorInfos.forEach(info => {
      donorMap[info.donorRefID.toString()] = info;
    });

    const result = users.map(user => {
      const obj = user.toObject();
      if (user.role === 'donor') {
        const info = donorMap[user._id.toString()];
        obj.available = info ? info.available : true;
        obj.donationCount = info ? info.donationCount.length : 0;
      }
      return obj;
    });

    res.status(200).json({ users: result });
  } catch (error) {
    console.error("Error exporting users:", error);
    res.status(500).json({ msg: "Server error" });
  }
};

module.exports = {
  getDashboardStats,
  getAllUsers,
  getRecentRegistrations,
  getBloodGroupDistribution,
  deleteUser,
  searchUsers,
  getAllDonorsForMap,
  updateUser,
  toggleDonorAvailability,
  getUserDetails,
  exportAllUsers
};
