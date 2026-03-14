const express = require("express");
const router = express.Router();
const { createBloodRequest, getAllBloodRequests, getMyRequests } = require("../controllers/bloodRequest.controller");

// POST: Create a new blood request
router.post("/create", createBloodRequest);

// GET: Fetch all pending requests
router.get("/all", getAllBloodRequests);

// GET: Fetch requests by a specific patient
router.get("/my-requests/:patientId", getMyRequests);

module.exports = router;
