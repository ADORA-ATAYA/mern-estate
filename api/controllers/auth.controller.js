const Usermodel = require('../models/user.model')
const bcryptjs = require('bcryptjs')
const errorHandler = require('../utils/error')
const jwt = require('jsonwebtoken')

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

    static signin = async (req,res,next)=>{
        const { email, password } = req.body;
        try {
            const validUser = await Usermodel.findOne({ email });
            if (!validUser) return next(errorHandler(404, 'User not found!'));
            const validPassword = bcryptjs.compareSync(password, validUser.password);
            if (!validPassword) return next(errorHandler(401, 'Wrong credentials!'));
            const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
            const { password: pass, ...rest } = validUser._doc;
            res
            .cookie('access_token', token, { httpOnly: true })
            .status(200)
            .json(rest);
        } catch (error) {
            next(error);
        }
    }
}


module.exports = authController