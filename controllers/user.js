const User = require("../models/user")

const controller = {
    registerUser: async (req,res) => {
        try {
            const { name, email, password, contactNo} = req.body

  const user = await User.create ({name, email, password, contactNo})
  res.json(user)
        }
        catch(error){
            res.json({
                status : 400,
                message : "bad request" + error
            })
        }
    },
    loginUser: async (req,res) => {
        
    },
    deleteUser: async (req,res) => {
        
    }
}

module.exports = controller