const  express= require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Order = require('../models/order');
const Car = require('../models/car')

router.get('/',(req,res,next)=>{

    //here if we populate from car only selected property then we do like this populate('car','property name what we want to display') 
   Order.find().populate('car').exec().then(docs => {
       res.status(200).json(docs);
   }).catch(err => {
       res.status(500).json({error:err});
   });
});

router.post('/',(req,res,next)=>{
        Car.findById(req.body.carId).then(car => {
            if(!car){
                return res.status(404).json({messsage:"car not found"});
            }
            const order = new Order ({
                _id : mongoose.Types.ObjectId(),
                car : req.body.carId
            });
           return order.save()
        }).then(result => {
            console.log(result);
            res.status(201).json({messsage:"order Created",createdOrder :{
                _id:result._id,
                car :result.car
            }
        })
        }).catch(err => {
            console.log(err);
            res.status(500).json({error:err})
        }); 
});

router.get('/:orderId',(req,res,next)=>{
    Order.findById(req.params.orderId).populate('car').exec().then(order => {
       if(!order){
           return res.status(404).json({messsage:"order not found"})
       }
        res.status(200).json({order : order })
    }).catch(err => {
        res.status(500).json({error:err})
    });
});

router.delete('/:orderId',(req,res,next)=>{
  Order.remove({ _id : req.params.orderId}).exec().then(result =>  {
      res.status(200).json({messsage:"order Deleted"});
  }).catch(err => {
    res.status(500).json({error:err})
});
});
module.exports = router;