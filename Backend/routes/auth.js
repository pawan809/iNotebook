const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser = require('./middleware/fetchuser');
const JWT_SECRET = "pawanisagoodboy@";

// Route 1:- Create a User using: POST "/api/auth/createuser" . No login required.
router.post(
  "/createuser",
  [
    body("name", "Enter a valid name. ").isLength({ min: 3 }),
    body("email", "Enter a valid email.").isEmail(),
    body("password", "Password must be atleast 5 chars.").isLength({ min: 5 }),
  ],
  async (req, res) => {
    // if there are errors , return bad request and errors.
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }

    try {
      // check whether the user with this email already exists.
      let user = await User.findOne({ success, email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ success, error: "Sorry user with this email already exist" });
      }
      // Create a new user
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({success, authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  }
);

// Route 2:- Authenticate a user using: POST "/api/auth/login" . No login required.

router.post(
  "/login",
  [
    body("email", "Enter a valid email.").isEmail(),
    body("password", "Password can't be blank.").exists(),
  ],
  async (req, res) => {
    // if there are errors , return bad request and errors.
   let  success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ success, error: "Please try to login with correct credentials." });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res
          .status(400)
          .json({ success, error: "Please try to login with correct credentials." });
      }

      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
       success = true;
      res.json({ success, authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  }
);

// Route 3:- Get logined in user details using: POST "/api/auth/getuser" . Login required.
router.post("/getuser", fetchuser, async (req, res) => {
  // if there are errors , return bad request and errors.
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    let userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
