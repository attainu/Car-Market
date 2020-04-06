const passport = require('passport')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const config = require('../config/database');
const dotenv = require('dotenv');
dotenv.config();

module.exports = function(app,passport){
   /* app.get('/',function(req,res){
        res.json('welcome to the car market app')
    }); */
    
    app.post('/register',(req,res) => {
        let newUser = new User({
            name:req.body.name,
            email:req.body.email,
            password:req.body.password
        });
        User.createUser(newUser,(err,user) => {
            if(err) {
                res.json({success:false, message:'Failed to register user '})
            }else{
                res.json({success:true,message:'User registered'})
            }
        });
    });

    app.post('/login',(req,res) => {
        const email = req.body.email;
        const password = req.body.password;
        
        //checking the usern by email
        User.getUserByEmail(email,(err,user) => {
            if(err) throw err ;
            if(!user){
                return res.json({success:false,message:'User not found'});
            }

            //check the password
            User.comparePassword(password,user.password,(err,isMatch) => {
                if(err) throw err ;
                if(isMatch) {
                    const token = jwt.sign(user.toJSON(),process.env.secretKey,{expiresIn:604800});
                    res.json({success:true,token:'JWT '+token,user:{
                        id:user._id,
                        name:user.name,
                        email:user.email,
                        password:user.password
                    }
                });
                }else{
                    return res.json({success:false,message:'Password does not match'})
                      }
            })
        });
    })

    
    app.get('/profile',passport.authenticate('jwt',{session:false}),(req,res,next)=>{
        res.json({user: req.user});
    });

    app.get('/logout',(req,res)=>{
        req.logout();
        res.redirect('/');
    })
};