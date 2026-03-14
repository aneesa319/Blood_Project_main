const mongoose = require("mongoose");

const bloodRequestSchema = new mongoose.Schema(
  {
    patientRefID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    patientName: {
      type: String,
      required: true,
    },
    bloodGroup: {
      type: String,
      required: true,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    },
    units: {
      type: Number,
      required: true,
      min: 1,
    },
    hospitalName: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    contactPhone: {
      type: String,
      required: true,
    },
    urgency: {
      type: String,
      required: true,
      enum: ["Normal", "Urgent", "Critical"],
      default: "Normal",
    },
    requiredDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Fulfilled", "Cancelled"],
      default: "Pending",
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const bloodRequestModel = mongoose.model("bloodRequest", bloodRequestSchema);
module.exports = bloodRequestModel;
