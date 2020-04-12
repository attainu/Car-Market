const User = require('../Models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


exports.login = async (req, res) => {
    
    try {
        //Validate the data
       

        //Checking if the user exist or not in database
        const user = await User.findOne({where: {email: req.body.email}});
        if(!user) return res.status(400).send('Email is not found');

        //PASSWORD IS CORRECT OR NOT
        const validPassword = await bcrypt.compare(req.body.password, user.password)
        if(!validPassword) return res.status(400).send("Invalid Password");

        //CREATE and assign a token
        const token = jwt.sign({id: user.id}, process.env.TOKEN_SECRET);
        res.header('auth-token', token).send(token); 

        // res.send("Logged In");

    } catch (error) {
        console.log(error);
    }
};
