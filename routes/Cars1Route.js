const express = require('express');
const router = express.Router();

const cars1 = require('../Controllers/Cars1Controller');
const verify = require('../verifyToken/verifyToken');

//Add a playlists
router.post('/cars1',verify, cars1.create);

//Get all playlists
router.get('/allcars1',verify, cars1.findAll);

//Update playlists
router.put('/cars1/:id', verify, cars1.update)

//Remove playlists
router.delete('/cars1/:id',verify, cars1.delete);

module.exports = router;
