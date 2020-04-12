const express = require('express');
const router = express.Router();

const favourites = require('../Controllers/FavouritesController');
const verify = require('../verifyToken/verifyToken');

//Add a favourites
router.post('/favourites',verify, favourites.create);

//Get all favourites
router.get('/getAllFavourites',verify, favourites.findAll); 

//Remove favourites
router.delete('/favourites/:carid',verify, favourites.delete);

module.exports = router;