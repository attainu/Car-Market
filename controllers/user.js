const mongoose = require('mongoose');
const User = require('../models/user')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const mailer = require('../mailer')

//const nodemailer = require('nodemailer')
const dotenv = require('dotenv')
dotenv.config();

const transporter = nodemailer.createTransport({
    host:'smtp.gmail.com',
    port:465,
    secure:true,
    debug:process.env.NODE_ENV==='development',
    auth:{
        user:process.env.GMAIL_EMAIL,
        pass:process.env.PASS
    }
})          





exports.register_user = (req,res) => {
    
    
    //make sure that user not exist already in database
    User.find({email:req.body.email}).exec().then(user => {
        if(user.length >= 1){
            return res.status(409).json({message:"user already exist cant register"});
        } else {
            bcrypt.hash(req.body.password,10,(err,hash) => {
                if(err) {
                    return res.status(500).json({error:err});
                } else {
                   let verify;
                    const mailOption ={
                        from:'prakashjayaswal62@gmail.com',
                        to:req.body.email,
                        subject:'Accound Verfication',
                        html:`<h1>click here to very your email address</h1><a href="http://localhost:8080/user/register">Click Me</a>`
                    }
                    
                    let newUser = new User({
                        name:req.body.name,
                        email:req.body.email,
                        password: hash,
                        contactNo:req.body.contactNo,
                        active:false
                    });
                   
                        newUser.save().then(response => {
                            console.log(response);
                            transporter.sendMail(mailOption,(error,info) => {
                                if(error){
                                    console.log(error)
                                }else{
                                    newUser.active = verify;
                                    res.status(201).json({message:"Please Verify your Email",User:response})
                                }
                               })
                        }).catch(err => {
                            console.log(err);
                            res.status(500).json({error:err});
                        });
                    
                    
                    
                }
            })
        }
    }).catch();   
}

exports.login_user = (req,res,next) => {
    const email = req.body.email;
    const password = req.body.password;
    
    User.find({email:email}).exec().then(user => {
        if(user.length < 1){
            return res.status(401).json({message:"User Doesn't Exist"});
        }
        bcrypt.compare(password, user[0].password,(err,isMatch) => {
            if(err) {
               return res.status(401).json({message:"Authentication Failed"});
            } 
            if(!user[0].active){ 
                return res.status(401).json({message:"You need to verify email"});
            }
            
            if(isMatch){
                const token = jwt.sign({email: user[0].email, userId: user[0]._id},process.env.secretKey,{expiresIn:500000});
                return res.status(200).json({message:"Authentication successful",Token : token,Id: user[0]._id })
            }
            //if the accound is beign verified
           
            res.status(401).json({message:"Authentication Failed"});
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error:err});
    });
}

exports.delete_user = (req,res,next) => {
    User.deleteOne({_id: req.params.userId}).exec().then(response => {
        res.status(200).json({message:"User Deleted Succesfully"})
    }).catch(err => {
        console.log(err);
        res.status(500).json({error:err});
    });
}