const User = require("../models/car")

const controller = {
    all_cars: async (req,res) => {
        
    },
    get_a_car: async (req,res) => {
        const { id } = req.params
        const car = await Car.findOne({where : { id }})
        res.json(car)
    },
    update_car: async (req,res) => {
        
    },
    delete_car:async (req,res) => {
        const { id } = req.params
        const car = await Car.findOne({where : { id }})
        res.json(car)
    }
}

module.exports = controller