const Usermodel = require('../models/user.model')
const bcryptjs = require('bcryptjs')

class authController {
    static signup = async (req,res)=>{
        const {username,email,password} = req.body
        const hashpassword = bcryptjs.hashSync(password,10);
        const user = new Usermodel({username,email,password:hashpassword})
        try {
            await user.save()
            res.status(201).json("user created successfully");
        } catch (error) {
            res.status(500).json(error.message);
        }
    }
}


module.exports = authController