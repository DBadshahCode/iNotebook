const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;

const fetchuser = (req, res, next) => {
  const token = req.header("auth-token");

  if (!token) {
    return res
      .status(401)
      .send({
        error: "No token provided. Please authenticate using a valid token",
      });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (error) {
    return res
      .status(401)
      .send({
        error: "Invalid token. Please authenticate using a valid token",
      });
  }
};

module.exports = fetchuser;
