var express = require('express');
var router = express.Router();
const Car = require("../models/car")

/* cars listing. */
router.post("/", async function(req,res,next){
  
  const car = await Car.create ({...req.body})
  res.json(car)
})

router.get("/:carid",async function(req,res,next){
    const { id } = req.params
    const car = await Car.findOne({where : { id }})
    res.json(car)
})



module.exports = router;
 