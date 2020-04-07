const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user');
const auth = require('../middleware/auth');

const dotenv = require('dotenv');
dotenv.config();

router.post('/register',UserController.register_user);
    
router.post('/login',UserController.login_user);

router.delete('/:userId',auth,UserController.delete_user);

module.exports = router;