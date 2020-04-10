const User = require("../models/user")
const sequelize  = require("../db")
var bcrypt=require('bcryptjs')
var jwt=require('jsonwebtoken');
const dotenv = require('dotenv')
dotenv.config();

const controller = {
    registerUser: async (req,res) => {
        try {
            if(!req.body.name||!req.body.email||!req.body.password||!req.body.contactNo)
              {
              return res.send("Message:user details field cannot be empty");
              }
            const foundUser=await User.findOne({where:{email:req.body.email}});
            if(foundUser)
                   return res.send("message:User already exist");
            req.body.password = await bcrypt.hash(req.body.password, 10);
            var result = await User.create({ ...req.body })
            res.json(result);
        } catch (err) {
            console.log(err)
            if (err.name === "SequelizeValidationError")
                return res.status(400).send(`Validation Error: ${err.message}`)
        }
    },
    loginUser: async (req,res) => {
        try{
            const email=req.body.email;
            const password=req.body.password;
            //CHECK IF EMAIL OR PASSWORD IS EMPTY 
            if(!email||!password) return res.status(400).send("Message:email or password cannot be null");  
            const user=await User.findOne({where:{email:email}});
          
            const isMatched=await bcrypt.compareSync(password,user.password);
            if(!isMatched) return res.status(404).send("Message:Invalid Email/Password Credentials");
            const token=await jwt.sign({id:user.id},process.env.JWT_SECRET_KEY,{expiresIn:1000*60*60*4});
            User.update({ jwt:token }, { where: { id: user.id }})
            return res.status(200).json({"Status":"successful login","jwttoken":token});        
           }
        catch (error)
          {
            res.status(400).json(error.message);
          }
        },
        logoutUser: async (req,res) =>{
          try {
            await User.update({ jwt:null }, { where: { id: req.user.id },  })
            res.json({ message: "Admin Logged and updated JWT" })
        } catch (err) {
            console.log(err)
            if (err.name === "SequelizeValidationError")
                return res.status(400).send(`Validation Error: ${err.message}`)
        }
        },
        deleteUser: async (req,res) => {
          try {
            if(!req.params.id)
                 return res.stats(403).send("Message:Enter an id");
            await User.destroy({ where: { id: req.params.id } })
            res.json({ message: "user deleted" })
        } catch (err) {
            console.log(err)
            if (err.name === "SequelizeValidationError")
                return res.status(400).send(`Validation Error: ${err.message}`)
        }
        }         
    
}

module.exports = controller