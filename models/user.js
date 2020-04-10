const { DataTypes } = require("sequelize")
const sequelize  = require("../db")

const userSchema = sequelize.define("users",{
    name:{
        type:DataTypes.STRING,
        allowNull:true,
        unique: true,
    },
    email:{
        type:DataTypes.STRING,
        allowNull:true,
        unique: true,
        match:/^([0-9a-zA-Z]([-\.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/
    },
    password:{
        type:DataTypes.STRING,
        allowNull:true
    }
    ,
    contactNo:{
        type:DataTypes.CHAR(10),
        allowNull:true
    }
})


module.exports = userSchema