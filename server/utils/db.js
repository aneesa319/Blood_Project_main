const mongoose = require("mongoose");

const connectDB = async() => {
    const URI = process.env.MONGO_URI || process.env.MONGO_DB_URL || "mongodb://127.0.0.1:27017/smart_donor_db";
    console.log("URI of mongo db:", URI);

    try {
        await mongoose.connect(URI);
        console.log("Connection gets successful", URI);
    } catch (error) {
        console.log("error in connecting the db", error);
        process.exit(0);
    }
}

module.exports = connectDB;