require("dotenv").config();

// Fix for MongoDB Atlas DNS resolution (ECONNREFUSED on querySrv)
// Forces Node.js to use Google DNS instead of ISP DNS
const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);
const express = require("express");
const app = express();
const cors = require('cors');
const mongoose = require("mongoose");
const db = require("./utils/db");

const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      process.env.CLIENT_URL,
      "http://localhost:5173",
      "http://localhost:5174"
    ].filter(Boolean);
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(null, true);
    }
  },
  methods: "GET, POST, PUT, PATCH, DELETE, HEAD",
  credentials: true
}

app.use(cors(corsOptions))
app.use(express.json());

// Lazy DB connection for serverless
app.use(async (req, res, next) => {
  if (mongoose.connection.readyState !== 1) {
    try {
      await db();
    } catch (err) {
      console.error("DB connection error:", err);
    }
  }
  next();
});

const userRoute = require("./routes/auth.route");
const locationRoute = require("./routes/zipcodes.route");
const verificationRoute = require("./routes/email.verification.route");
const donorRoute = require("./routes/nearest.donor.route");
const adminRoute = require("./routes/admin.route");
const contactRoute = require("./routes/contact.route");
const chatbotRoute = require("./routes/chatbot.route");
const bloodRequestRoute = require("./routes/bloodRequest.route");

// routes
app.use("/api/user", userRoute);
app.use("/api/location", locationRoute);
app.use("/api/user/registration", verificationRoute);
app.use("/api/donors", donorRoute);
app.use("/api/admin", adminRoute);
app.use("/api/contact", contactRoute);
app.use("/api/chatbot", chatbotRoute);
app.use("/api/blood-request", bloodRequestRoute);

// Health check
app.get("/", (req, res) => {
  res.json({ status: "ok", message: "Donor Recommendation API is running" });
});

const PORT = process.env.PORT || 5001;

if (process.env.VERCEL !== "1") {
  db().then(() => {
    app.listen(PORT, () => {
      console.log(`server is started on ${PORT}`);
    });
  });
}

module.exports = app;
