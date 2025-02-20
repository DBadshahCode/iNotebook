const mongoose = require("mongoose");
require("dotenv").config();

const mongoURI = process.env.MONGO_URI;

const connectToMongo = () => {
  mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connection Established Successfully");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });
};

module.exports = connectToMongo;
