const mongoose = require("mongoose");
require("dotenv").config();

const mongoURI = process.env.MONGO_URI;

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connection established successfully");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err.message);
    process.exit(1);
  }
};

mongoose.set("strictQuery", false);

module.exports = connectToMongo;
