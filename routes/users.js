const express = require('express');
const router = express.Router();

const registerController = require('../Controllers/Register');
const loginController = require('../Controllers/Login');


router.post('/register', registerController.register);
router.post('/login', loginController.login);

module.exports = router;