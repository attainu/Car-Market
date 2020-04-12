const db = require('../Database/connect');
const Sequelize = require('sequelize');

let User = db.define('users', {
    name: {
        type: Sequelize.STRING,
        allowNull : false
    },
    email: {
        type: Sequelize.STRING,
        allowNull : false
    },
    password: {
        type: Sequelize.STRING,
        allowNull : false
    }
    
}, {
    timestamps: false
});
db.sync().then(res=>{
    console.log('user db has been created');
});
module.exports = User;