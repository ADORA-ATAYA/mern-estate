const Usermodel = require('../models/user.model')
const bcryptjs = require('bcryptjs')
const errorHandler = require('../utils/error')

class authController {
    static signup = async (req,res,next)=>{
        const {username,email,password} = req.body
        const hashpassword = bcryptjs.hashSync(password,10);
        const user = new Usermodel({username,email,password:hashpassword})
        try {
            await user.save()
            res.status(201).json("user created successfully");
        } catch (error) {
            next(error);
        }
    }
}


module.exports = authController