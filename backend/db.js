const mongoose = require("mongoose");
const mongoURI = "mongodb+srv://admin:bblf3ytfCPsu0wJT@cluster0.x4xmc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const connectToMongo = () => {
  mongoose.connect(mongoURI, () => {
    console.log("Connection Established Successfully");
  });
};

module.exports = connectToMongo;
