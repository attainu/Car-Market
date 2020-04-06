const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const mongoose = require('mongoose')
const passport = require('passport')
const dotenv = require('dotenv')
const app = express();
dotenv.config();
require('./config/database')

const carsRoutes = require('./routes/cars');
const orderRoutes = require('./routes/orders');

app.use(morgan('dev'));

//body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

const port = process.env.PORT || 8080

app.use('/cars',carsRoutes);
app.use('/orders',orderRoutes);

//passport middleware
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport)

// require all the routes through appa and passport
require('./routes/routes')(app,passport);




//Error hndleres
app.use((req,res,next) => {
    const error = new Error('Not Found');
    error.status=404;
    next(error);
})
//Error handler for DAtabae
app.use((error,req,res,next) => {
    res.status(error.status || 500);
    res.json({
        error:{
            message:error.message
        }
    })
})


app.listen(port,function(){
    console.log(`server is running on port no : ${port}`)
})