const express= require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');   
//importing the car model which have car details
const Car = require('../models/car');


//for image uploading
const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'uploads/')
    },
    filename: function(req,file,cb){
        cb(null,Date.now() + file.originalname)
    }
})

//make sure file Type of image
const fileFilter = (req,file,cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null,true);
    } else{
        cb(null,false);
    }
};

//functionaly apply on the upload
const upload = multer({
    storage: storage,
    limits:{
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});  



//This route is used for show all the cars from databse
router.get('/',(req,res,next)=>{
    Car.find().select("_id brand model price drivenKM carImage").exec().then(docs =>{
        console.log(docs);
        res.status(200).json(docs);
    }).catch(err => {
        console.log(err);
        res.status(500).json({error:err})
    });
})

//In this Route we can upload car with its details
router.post('/sell',upload.single('carImage'),(req,res,next)=>{
    console.log(req.file);
   
    const car = new Car ({
        _id : new mongoose.Types.ObjectId(),
        brand :req.body.brand,
        model:req.body.model,
        year:req.body.year,
        fuel:req.body.fuel,
        drivenKM:req.body.drivenKM,
        price:req.body.price,
        additionINFO:req.body.additionINFO,
        carImage:req.file.path
    }); 
    car
    .save()
    .then(response => {
        console.log(response);
        res.status(201).json({ 
            message:"car details added in the Database",
            createdCar :response
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json({error:err});
    });
});



//If we want to access any perticular car
router.get('/:carId',(req,res,next) => {
    const id = req.params.carId;
    //here i use exec() function for search among all
    Car.findById(id).exec().then(doc => {
        console.log("This car we are fething from our database",doc);
        if(doc){
            res.status(200).json(doc);
        } else {
            res.status(404).json({message:"No Car Found of this Id"});
        }
    }).catch(err => {
        console.log(err);
        res.status(500).json({error:err})
    });
})


//If u want to update car details then make sure u have to pass the data in the array format 
//JUST LIKE THIS [{"propertyName":"NEWDATA","value":"NEWDATA"}]

router.patch('/:carId',(req,res,next) => {
    const id = req.params.carId;
    const updateOps = {};
    for(const ops of req.body){
        updateOps[ops.propertyName] =ops.value;
    }
    Car.update({_id : id },{$set : updateOps}).exec().then(response => {
        console.log("Car Deatails Updated Scucesfully");
        res.status(200).json(response);
    }).catch(err => {
        console.log(err);
        res.status(500).json({error:err});
    });
})


//If we want to delete any car from DB then we will do it via carID
router.delete('/:carId',(req,res,next) => {
    const id = req.params.carId;
    Car.remove({ _id: id }).exec().then(response => {
        console.log("car deleted from database")
        res.status(200).json(response);
    }).catch(err => {
        console.log(err);
        res.status(500).json({error:err});
    });

    
})
module.exports = router;