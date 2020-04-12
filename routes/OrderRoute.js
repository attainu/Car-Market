const express = require('express');
const router = express.Router();

const cars = require('../Controllers/OrderController');
const verify = require('../verifyToken/verifyToken');

//Add a cars
router.post('/createcars',verify, cars.create);

//Get all cars
router.get('/order/:orderid',verify, cars.findAll);


//Remove cars
router.delete('/order/:orderid',verify,cars.delete);

module.exports = router;
