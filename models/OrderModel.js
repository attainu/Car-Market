const db = require('../Database/connect');
const Sequelize = require('sequelize');

let order = db.define("orders",{

  userid: {
    type: Sequelize.INTEGER
},

carid: {
    type: Sequelize.INTEGER
},
orderid : {
  type: Sequelize.INTEGER
}
  }, {
    timestamps: false
  });
  db.sync().then(res=>{
    console.log('orders db has been created');
});

module.exports = order;