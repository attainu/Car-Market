var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require("./db")

var usersRouter = require('./routes/users');
var carsRouter = require('./routes/cars')
var ordersRouter = require('./routes/orders')

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/users', usersRouter);
app.use('/cars', carsRouter);
app.use('/orders',ordersRouter)

module.exports = app;
