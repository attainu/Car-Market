var express = require('express');
var router = express.Router();
const Car = require("../models/car")
const {
    createCar,
    allCars,
    oneCar,
    updateCar,
    deleteCar
} = require("../controllers/cars")



//This route is used for show all the cars from databse
router.post('/',createCar);
router.get('/',allCars);
router.get('/:id',oneCar);
router.put('/:id',updateCar);
router.delete('/:id',deleteCar);





module.exports = router;
 