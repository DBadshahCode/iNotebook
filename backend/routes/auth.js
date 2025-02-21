const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;

const EMAIL_EXISTS_ERROR = "Sorry, this email already exists";
const LOGIN_ERROR_MESSAGE = "Incorrect username or password!";
const INTERNAL_ERROR_MESSAGE = "Something went wrong!";

router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    //let success = false;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: EMAIL_EXISTS_ERROR });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const user = await User.create({
        name,
        email,
        password: hashedPassword,
      });

      // const data = {
      //   user: {
      //     id: user.id,
      //   },
      // };

      const authToken = jwt.sign({ user: { id: user.id } }, JWT_SECRET);

      return res.json({ success: true, authtoken: authToken });

      // res.json(user);
    } catch (error) {
      console.error(error.message);
      return res.status(500).send(INTERNAL_ERROR_MESSAGE);
    }
  }
);

router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    //let success = false;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ error: LOGIN_ERROR_MESSAGE });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({ error: LOGIN_ERROR_MESSAGE });
      }

      // const data = {
      //   user: {
      //     id: user.id,
      //   },
      // };

      const authToken = jwt.sign({ user: { id: user.id } }, JWT_SECRET);

      return res.json({ success: true, authtoken: authToken });
    } catch (error) {
      console.error(error.message);
      return res.status(500).send(INTERNAL_ERROR_MESSAGE);
    }
  }
);

router.post("/getuser", fetchuser, async (req, res) => {
  const userId = req.user.id;
  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send("User not found");
    }

    return res.json(user);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send(INTERNAL_ERROR_MESSAGE);
  }
});
module.exports = router;
