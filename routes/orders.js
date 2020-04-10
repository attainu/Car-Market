var express = require('express');
var router = express.Router();
const Orders = require("../models/order")

const {
    addOrder,
    singleOrder,
    allOrders,
    updateOrder,
    deleteOrder
} = require("../controllers/orders")



//This route is used for show all the cars from databse
router.post('/', addOrder);
router.get('/:id',singleOrder);
router.get('/',allOrders);
router.patch('/:id',updateOrder);
router.delete('/:id',deleteOrder);





module.exports = router;
 