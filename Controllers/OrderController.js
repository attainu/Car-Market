const car = require('../Models/OrderModel');

//Add a car
exports.create = async (req, res) => {
    console.log(req.user,"jddjdj")
    try {
        let cars = await car.create({
                
            carid: req.body.carid,
            orderid:req.body.orderid,            
            userid: req.user.id
        })
        res.status(200).json(cars);  
    } catch (error) {
        res.status(400).send(error);
    }
}

//Fetch all cars for a particular user's car
exports.findAll = async (req, res) => {
    try {
        let cars = await car.findAll({
            where: {
                userid: req.user.id
            }
        })
        res.status(200).send(cars);  
    } catch (error) {
        res.status(400).send(error);
    }
}

//Update a car 
exports.update = async (req, res) => {
    console.log(req.user.id)
    try {
        let cars = await car.update({
            carid: req.body.carid,
            brand:req.body.brand,
            model:req.body.model,
            year:req.body.year,
            fuel:req.body.fuel,
            drivenKM:req.body.drivenKM,
            price:req.body.price,
            additionINFO:req.body.additionINFO,
            sellerPhoneNo:req.body.sellerPhoneNo,
            userid: req.user.id
        },{
            where: {
                userid: req.user.id,
                id: req.params.id
            }
            
        })
        res.status(200).send("updated");
    } catch (error) {
        res.status(400).send(error);
    }
}

// Delete a car from car for a particular user's car
exports.delete = async (req, res) => {
    console.log("delete >>>",req.user.id);
    console.log(req.params.userid);
    try {
        const id = req.params.carid;
         let cars = await car.destroy({
            where: {
                 userid: req.user.id,
                carid: req.params.carid
            }
        })
        res.status(200).send(cars);  
        
    } catch (error) {
        res.status(400).send(error);
    }
}