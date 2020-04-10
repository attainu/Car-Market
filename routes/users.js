var express = require('express');
var router = express.Router();
const User = require("../models/user")
const {
  registerUser,
  loginUser,
  deleteUser
} = require("../controllers/user")


router.post("/register", registerUser);
//router.get("/login", loginUser);
//router.delete("/:id", deleteUser);




module.exports = router;
