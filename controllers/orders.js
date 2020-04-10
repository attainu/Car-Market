const Order = require("../models/order")

const controller = {
    // Create Operation
    addOrder:async (req, res) => {
    try {
      const { body } = req;
      let order = await Order.create(body);
      res.json(order)
    } catch (err) {
      res.json(err)
    }
  },
  
  // Read All Operation
  allOrders: async (req, res) => {
    try {
      let order = await Order.findAll();
      res.json(order)
    } catch (err) {
      res.json(err)
    }
  },
  
  // Read One Operation
  singleOrder: async (req, res) => {
    try {
      const { id } = req.params;
      let order = await Order.findByPk(id);
      res.json(order);
    } catch (err) {
      res.json(err)
    }
  },
  
  // Update Operation
  updateOrder: async (req, res) => {
    try {
      const { params, body } = req;
      let order = await Order.update(body, { where: { id: params.id } });
      res.json(order)
    } catch (err) {
      res.json(err)
    }
  },
  
  // Delete Operation
  deleteOrder: async (req, res) => {
    try {
      const { params } = req;
      let order = await Order.destroy({ where: { id: params.id } });
      res.json(order)
    } catch (err) {
      res.json(err)
    }
  }
  
     
}


module.exports = controller