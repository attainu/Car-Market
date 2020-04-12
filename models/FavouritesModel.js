const db = require('../Database/connect');
const Sequelize = require('sequelize');

let favourite = db.define("favourites",{

    userid: {
        type: Sequelize.INTEGER
    },
    isfavourite : {
      type: Sequelize.BOOLEAN,
      allowNull : false,
      defaultValue: false
    },
    carid : {
      type: Sequelize.INTEGER
    }
  }, {
    timestamps: false
  });
  db.sync().then(res=>{
    console.log('favourites db has been created');
});

module.exports = favourite;