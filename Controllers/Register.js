const User = require('../Models/User');
const bcrypt = require('bcryptjs');


exports.register = async (req, res) => {
    
    try {
        //Validate the data before create
       

        //Checking if the user is already in database
        const emailExist = await User.findOne({where: {email: req.body.email}});
        if(emailExist) return res.status(400).send('Email already exists!');

        //Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        //Create a new user
        const {body} = req;
        let user = await User.create({name: body.name, email: body.email, password: hashedPassword});
        res.send(user);
    } catch (error) {
        console.log(error);
    }
};
