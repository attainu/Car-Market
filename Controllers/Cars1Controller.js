const car1 = require('../Models/Cars1Model');

//Create car1
exports.create = async (req, res) => {
    console.log(req.user);
    try {
        let cars1 = await car1.create({
            carid:req.body.carid,
            brand:req.body.brand,
            model:req.body.model,
            year:req.body.year,
            fuel:req.body.fuel,
            drivenKM:req.body.drivenKM,
            price:req.body.price,
            additionINFO:req.body.additionINFO,
            sellerPhoneNo:req.body.sellerPhoneNo,
            userid: req.user.id
        })
        res.status(200).send(cars1);  
    } catch (error) {
        res.status(400).send(error);
    }
}

//Fetch All cars1
exports.findAll = async (req, res) => {
    console.log(req.user.id);
    try {
        let cars1 = await car1.findAll({
            where: {
                userid: req.user.id
            }
        })
        res.status(200).send(cars1);  
    } catch (error) {
        res.status(400).send(error);
    }
}

//Update a car1 
exports.update = async (req, res) => {
    console.log(req.user.id)
    try {
        let cars1 = await car1.update({
            brand:req.body.brand,
            model:req.body.model,
            year:req.body.year,
            fuel:req.body.fuel,
            drivenKM:req.body.drivenKM,
            price:req.body.price,
            additionINFO:req.body.additionINFO,
            sellerPhoneNo:req.body.sellerPhoneNo
            
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

//Delete a car1
exports.delete = async (req, res) => {
    try {
        const id = req.params.id;
        let cars1 = await car1.destroy({
           where: {
               carsid: id,
               userid: req.user.id
           }
       })
       res.status(200).send(cars1);  
    } catch (error) {
        res.status(400).send(error);
    }
}