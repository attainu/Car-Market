const Sequelize = require('sequelize');

const db = new Sequelize('shashistore', 'postgres', '123456', {
    host: 'localhost',
    dialect: 'postgres'
});



module.exports = db;
