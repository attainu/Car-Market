const mongoose = require('mongoose')
const config = require('../config/database')
const bcrypt = require('bcryptjs')

const userSchema = mongoose.Schema({
    
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique: true
    },
    password:{
        type:String,
        required:true
    }
});

const User = module.exports = mongoose.model('User',userSchema);

module.exports.getUserById = function(id,cb){
    User.findById(id,cb);
}

module.exports.getUserByEmail = function(email,cb){
    User.findOne({email:email},cb);
}

module.exports.createUser = function(newUser,cb){
    bcrypt.genSalt(10,(err,salt) => {
        bcrypt.hash(newUser.password,salt,(err,hash) => {
            if(err)  throw err;
            newUser.password = hash;
            newUser.save(cb);
        })
    })
}

module.exports.comparePassword = function(myPassword,hash,cb){
    bcrypt.compare(myPassword,hash,(err,isMatch) => {
        if(err) throw err;
        cb(null,isMatch)
    })
}