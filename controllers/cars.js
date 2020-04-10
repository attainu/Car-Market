const Car = require("../models/car")

const controller = {
    // Create Operation
 createCar:async (req, res) => {
    try {
      const { body } = req;
      let car = await Car.create(body);
      res.json(car)
    } catch (err) {
      res.json(err)
    }
  },
  
  // Read All Operation
  allCars: async (req, res) => {
    try {
      let car = await Car.findAll();
      res.json(car)
    } catch (err) {
      res.json(err)
    }
  },
  
  // Read One Operation
  oneCar: async (req, res) => {
    try {
      const { id } = req.params;
      let car = await Car.findByPk(id);
      res.json(car);
    } catch (err) {
      res.json(err)
    }
  },
  
  // Update Operation
  updateCar: async (req, res) => {
    try {
      const { params, body } = req;
      let car = await Car.update(body, { where: { id: params.id } });
      res.json(car)
    } catch (err) {
      res.json(err)
    }
  },
  
  // Delete Operation
  deleteCar: async (req, res) => {
    try {
      const { params } = req;
      let car = await Car.destroy({ where: { id: params.id } });
      res.json(car)
    } catch (err) {
      res.json(err)
    }
  }
  
     
}


module.exports = controller