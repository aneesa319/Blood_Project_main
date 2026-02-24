require("dotenv").config();
const express = require("express");
const app = express();
const cors = require('cors');
const mongoose = require("mongoose");

const corsOptions = {
  origin: function (origin, callback) {
    callback(null, true);
  },
  methods: "GET, POST, PUT, PATCH, DELETE, HEAD",
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

// Serverless-safe DB connection (Vercel pattern)
const MONGODB_URI = process.env.MONGO_URI || process.env.MONGO_DB_URL || "mongodb://127.0.0.1:27017/smart_donor_db";

let cached = global._mongooseCache;
if (!cached) {
  cached = global._mongooseCache = { conn: null, promise: null };
}

const connectDB = async () => {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
      serverSelectionTimeoutMS: 10000,
    }).then((m) => {
      console.log("DB connected:", MONGODB_URI.substring(0, 30) + "...");
      return m;
    });
  }
  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }
  return cached.conn;
};

app.use(async (req, res, next) => {
  await connectDB();
  next();
});

// routes
const userRoute = require("../routes/auth.route");
const locationRoute = require("../routes/zipcodes.route");
const verificationRoute = require("../routes/email.verification.route");
const donorRoute = require("../routes/nearest.donor.route");
const adminRoute = require("../routes/admin.route");
const contactRoute = require("../routes/contact.route");
const chatbotRoute = require("../routes/chatbot.route");

app.use("/api/user", userRoute);
app.use("/api/location", locationRoute);
app.use("/api/user/registration", verificationRoute);
app.use("/api/donors", donorRoute);
app.use("/api/admin", adminRoute);
app.use("/api/contact", contactRoute);
app.use("/api/chatbot", chatbotRoute);

app.get("/", (req, res) => {
  res.json({ status: "ok", message: "Donor Recommendation API is running" });
});


module.exports = app;
