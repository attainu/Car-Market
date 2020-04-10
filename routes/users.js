var express = require('express');
var router = express.Router();
const User = require("../models/user")
const {authenticate}=require('../middleware/authenticate');
const sequelize  = require("../db")
const {
  registerUser,
  loginUser,
  logoutUser,
  deleteUser
} = require("../controllers/user")


router.post("/register", registerUser);
router.get("/login", loginUser);
router.delete('/logout',authenticate,logoutUser);
router.delete("/:id",authenticate, deleteUser);




module.exports = router;
