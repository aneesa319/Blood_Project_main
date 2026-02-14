require("dotenv").config();
const express = require("express");
const app = express();
const locationSaveToDb = require("./zipcodeConfiguration/importZipcodes");
const cors = require('cors');

const corsOptions = {
  origin: process.env.CLIENT_URL ? [process.env.CLIENT_URL, "http://localhost:5173", "http://localhost:5174"] : ["http://localhost:5173", "http://localhost:5174"],
  methods: "GET, POST, PUT, PATCH, DELETE, HEAD",
  credentials: true
}

app.use(cors(corsOptions))

// Body parsing middleware (for JSON)
app.use(express.json()); //  required to parse JSON bodies

const userRoute = require("./routes/auth.route");
const locationRoute = require("./routes/zipcodes.route");
const verificationRoute = require("./routes/email.verification.route")
const donorRoute = require("./routes/nearest.donor.route");
const adminRoute = require("./routes/admin.route");
const contactRoute = require("./routes/contact.route");
const chatbotRoute = require("./routes/chatbot.route");
const db = require("./utils/db");


// routes
connectServer();
app.use("/api/user",userRoute);
app.use("/api/location",locationRoute);
app.use("/api/user/registration",verificationRoute);
app.use("/api/donors",donorRoute);
app.use("/api/admin",adminRoute);
app.use("/api/contact",contactRoute);
app.use("/api/chatbot",chatbotRoute);

const PORT = process.env.PORT || 5001;

async function connectServer(){
    try {
      await db();
      app.listen(PORT, () => {
        console.log(`server is started on ${PORT}`)
      })
    } catch (error) {
      console.log("Error has been generated in connecting the server:",error);
    }
}
