const bloodRequestModel = require("../models/bloodRequest.model");

// Create a new blood request
const createBloodRequest = async (req, res) => {
  const {
    patientRefID,
    patientName,
    bloodGroup,
    units,
    hospitalName,
    city,
    contactPhone,
    urgency,
    requiredDate,
    description,
  } = req.body;

  try {
    const newRequest = await bloodRequestModel.create({
      patientRefID,
      patientName,
      bloodGroup,
      units,
      hospitalName,
      city,
      contactPhone,
      urgency,
      requiredDate,
      description,
    });

    res.status(201).json({
      msg: "Blood requirement posted successfully!",
      status: 201,
      data: newRequest,
    });
  } catch (error) {
    console.error("Error creating blood request:", error);
    res.status(500).json({
      msg: "Failed to post blood requirement",
      status: 500,
      error: error.message,
    });
  }
};

// Get all blood requests (for a specific city or globally)
const getAllBloodRequests = async (req, res) => {
  try {
    const { city } = req.query;
    const filter = city ? { city: new RegExp(city, "i"), status: "Pending" } : { status: "Pending" };
    
    const requests = await bloodRequestModel.find(filter).sort({ createdAt: -1 });
    res.status(200).json({
      status: 200,
      data: requests,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Failed to fetch blood requirements",
      status: 500,
      error: error.message,
    });
  }
};

// Get requests by a specific patient
const getMyRequests = async (req, res) => {
  const { patientId } = req.params;
  try {
    const requests = await bloodRequestModel.find({ patientRefID: patientId }).sort({ createdAt: -1 });
    res.status(200).json({
      status: 200,
      data: requests,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Failed to fetch your requirements",
      status: 500,
      error: error.message,
    });
  }
};

module.exports = {
  createBloodRequest,
  getAllBloodRequests,
  getMyRequests
};
