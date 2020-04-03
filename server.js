const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const morgan = require('morgan')
const mongoose = require('mongoose')
const cors = require('cors')
const passport = require('passport')

const config = require('./config/database')
const port = process.env.PORT || 8080
const app = express();

//connect to Database
mongoose.connect(config.db)
//on connection
mongoose.connection.on('connected',() =>{
    console.log('connected to database '+config.db);
})
//if any error when connection to databse
mongoose.connection.on('error',(err) => {
    console.log("database error:"+err);
})


//node server will point our index file will be displayed into the browser
//set static folder
app.use(express.static(path.join(__dirname + '/client')))

//body aprser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(morgan('dev'));
//cors middleware
app.use(cors({
    origin:"http://localhost:1234",
    allowedHeaders:["Content-Type"]
    //credentials: true
}));
//passport middleware
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport)

// require all the routes through appa and passport
require('./routes/routes')(app,passport);



app.listen(port,function(){
    console.log(`server is running on port no : ${port}`)
})