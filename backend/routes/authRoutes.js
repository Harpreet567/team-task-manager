const express = require("express");

const router = express.Router();

const {
  registerUser,
  loginUser,
  getUsers,
} = require(
  "../controllers/authController"
);



// REGISTER
router.post(
  "/register",
  registerUser
);



// LOGIN
router.post(
  "/login",
  loginUser
);



// GET USERS
router.get(
  "/users",
  getUsers
);

module.exports = router;