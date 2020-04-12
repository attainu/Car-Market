const express = require('express');
const app = express();
const dotenv = require('dotenv');

//Import Routes
const usersRoute = require('./Routes/users');

const favouritesRoute = require('./Routes/favouritesRoute');
const Cars1Routes = require('./Routes/Cars1Route');
const OrderRoutes = require('./Routes/OrderRoute');


dotenv.config();

//Middleware
app.use(express.json());

//Routes Midddlewares
app.use('/user', usersRoute);
app.use('/', favouritesRoute);
app.use('/', Cars1Routes);
app.use('/', OrderRoutes);



module.exports = app;