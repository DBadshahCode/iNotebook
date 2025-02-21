require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectToMongo = require("./db");

const app = express();
const port = process.env.PORT || 5000;

connectToMongo();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ message: "iNotebook API is up and running!" });
});

// Available Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.listen(port, () => {
  console.log(`iNotebook backend listening at http://localhost:${port}`);
});
