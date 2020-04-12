const db = require('../Database/connect');
const Sequelize = require('sequelize');

let cars = db.define("cars1",{

    userid: {
        type: Sequelize.INTEGER
    },
    carid: {
      type: Sequelize.INTEGER
    },
    brand:{
        type:Sequelize.STRING,allowNull:true
      },
    model:{
      type: Sequelize.STRING, allowNull: true
    },
    year:{
      type: Sequelize.CHAR(5), allowNull: true
    },
    fuel:{
      type: Sequelize.STRING, allowNull: true
    },
    drivenKM:{
      type: Sequelize.CHAR(10), allowNull: true
    },
    price:{
      type: Sequelize.CHAR(20), allowNull: true
    },
    additionINFO:{
      type: Sequelize.STRING
    },
    sellerPhoneNo:{
      type:Sequelize.CHAR(10),allowNull:true
    }    
   
}, {
    timestamps: false
  });
  db.sync().then(res=>{
    console.log('carss db has been created');
});

module.exports = cars;