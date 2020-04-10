const Sequelize = require("sequelize")

const postgres = new Sequelize('carmarket', 'postgres', '123456', {
    host: 'localhost',
    port: 5432,
    dialect:'postgres',
},{
    logging : false
})



try {
    postgres.authenticate()
    console.log("sql database connected succesfully")
}
catch{
    console.log("error in the database connection")
}

postgres.sync()

module.exports = postgres