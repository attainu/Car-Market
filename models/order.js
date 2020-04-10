const { DataTypes } = require("sequelize")
const sequelize  = require("../db")

const orderSchema = sequelize.define("orders",{
    userId:{
        type:DataTypes.CHAR,
         allowNull: false
          },
      carId:{
          type:DataTypes.CHAR,
          allowNull: false
          },
    returnStatus:{
        type: DataTypes.BOOLEAN,
        allowNull:false
         } 
})

module.exports = orderSchema