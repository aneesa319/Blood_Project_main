const userModel = require('../models/user.model');
const nodemailer = require("nodemailer")
const donorInfoModel = require("../models/donor.info.model");
const { sendIneligibilityEmail, sendSuccessEmail } = require("../helpers/emailSender");
const getAvailabilityStatus = require("../utils/getAvailabilityStatus");
const { findCompatibleDonors } = require('../helpers/donor.helper');

/**
 * Arrow Function
 */

// 1) user registration



const userRegister = async (req, res) => {
  const {
    name,
    email,
    password,
    bloodGroup,
    city,
    phone,
    role,
    zipcode,
    age,
    gender,
    lastDonationDate
  } = req.body;

  if (age < 18 || age > 65) {
    res.status(200).json({ message: "User not eligible. Email will be sent.", status: 200 });
    sendIneligibilityEmail(email);
    return;
  }

  try {
    const isUserCreated = await userModel.create({
      name,
      email,
      password,
      bloodGroup,
      city,
      phone,
      role,
      zipcode,
      age,
      gender
    });

    const lastDate = lastDonationDate ? new Date(lastDonationDate) : null;
    const available = role === "donor" ? getAvailabilityStatus(lastDate) : null;

    if (role === "donor") {
      await donorInfoModel.create({
        donorRefID: isUserCreated._id,
        lastDonationDate: lastDate,
        donationCount: [],
        available: available
      });
    }

    res.status(201).json({
      msg: "User has been created. Confirmation email will be sent.",
      status: 201
    });

    sendSuccessEmail({
      name,
      email,
      bloodGroup,
      city,
      phone,
      zipcode,
      role,
      age,
      availability: available
    });
  } catch (error) {
    console.log("Error registering user:", error);
    res.status(500).json({ msg: "Server error" });
  }
};

// user login
/**
 * Login controller
 * 1) email xyz@gmail.com password 123456
 * 2) email qqq@gmail.com password qwerty
 * 3) email ibrahemm@gmail.com password 123456
 * database qeurry email xyz@gmail.com
 * password 123456
 */
async function userLogin(req, res) {
  const { email, password } = req.body;
  console.log("I am user login", email);

  try {
    const isUserExists = await userModel.findOne({ email: email ? email.trim().toLowerCase() : "" });
    console.log("isUserExists", isUserExists);

    if (!isUserExists) {
      return res.status(400).json({
        msg: "Login failed. Please check your credentials and try again.",
        status: 400,
      });
    }

    const isPasswordCorrect = await isUserExists.comparePassword(password);

    if (!isPasswordCorrect) {
      return res.status(400).json({
        msg: "Password is incorrect",
        status: 400,
      });
    }

    const accessToken = await isUserExists.accessToken();

    if (!accessToken) {
       throw new Error('Token generation failed');
    }

    console.log("Access token:", `Bearer ${accessToken}`);

    // If patient, fetch donor data
    if (isUserExists.role === "patient") {
      const bloodGroup = isUserExists.bloodGroup;
      const city = isUserExists.city;
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 9;

      let donorData = null;
      try {
        donorData = await findCompatibleDonors(bloodGroup, city, page, limit);
      } catch (searchError) {
        donorData = { donors: [], totalDonors: 0, error: searchError.message };
      }

      return res.status(200).json({
        msg: "Login successful! We're glad to have you back.",
        status: 200,
        token: `Bearer ${accessToken}`,
        id: isUserExists._id,
        role: isUserExists.role,
        name: isUserExists.name,
        bloodGroup: isUserExists.bloodGroup, 
        city: isUserExists.city,
        donorData,
      });
    }

    // For roles other than patient (e.g., admin, donor, etc.)
    return res.status(200).json({
      msg: "Login successful! We're glad to have you back.",
      status: 200,
      token: `Bearer ${accessToken}`,
      id: isUserExists._id,
      role: isUserExists.role,
      name: isUserExists.name,
      bloodGroup: isUserExists.bloodGroup,
      city: isUserExists.city,
    });

  } catch (error) {
    console.error("Error in login controller:", error);
    res.status(500).json({
      msg: "Server error in Login Controller",
    });
  }
}

module.exports = {
    userRegister,
    userLogin
}