const { DataTypes } = require("sequelize")
const sequelize  = require("../db")

const carSchema = sequelize.define("cars",{
    brand:{
        type:DataTypes.STRING,
        allowNull:true
    },
    model:{type: DataTypes.STRING, allowNull: true},
    year:{type: DataTypes.CHAR(5), allowNull: true},
    fuel:{type: DataTypes.STRING, allowNull: true},
    drivenKM:{type: DataTypes.CHAR(10), allowNull: true},
    price:{type: DataTypes.CHAR(20), allowNull: true},
    additionINFO:{type: DataTypes.STRING},
    sellerPhoneNo:{type:DataTypes.CHAR(10),allowNull:true},
    carImage:{type:DataTypes.STRING, allowNull: true}
})

module.exports = carSchema