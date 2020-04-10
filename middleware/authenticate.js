var models = require('../db');
const User = require("../models/user")
const jwt=require('jsonwebtoken');
const dotenv = require('dotenv')
dotenv.config();


module.exports={ async authenticate(req,res,next){
    
    const token=req.header('Authorization');
    if(!token) return res.status(401).send('Access denied.Please provide the Token');
    try{
    const verified=await jwt.verify(token,process.env.JWT_SECRET_KEY)
    if(!verified.id) return res.status(403).send("not a verified user");
    const user=await User.findOne({where:{id:verified.id,jwt:token}})
    if(!user)
    {
        return res.status(401).send("No admin found with this Authorization");
    }
    else{
        req.user=user;
        console.log(req.user);
        next();
    }
   
  }
catch(err)
{
    return res.send(err);
}
} 
};