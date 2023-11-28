const errorHandler = require("../utils/error")
const bcryptjs = require('bcryptjs')
const Usermodel = require('../models/user.model')

class userController {

    static test = (req,res)=>{
        res.send({
            message:"FIRST TIME"
        })
    }

    static updateUser= async (req,res,next)=>{
        if(req.user.id !== req.params.id){
            return next(errorHandler(401,'you can only update your own account'))
        }
        try {
            if(req.body.password){
                req.body.password = bcryptjs.hashSync(req.body.password)
            }
            const updatesUser = await Usermodel.findByIdAndUpdate(req.params.id,{
                $set:{
                    username : req.body.username,
                    email : req.body.email,
                    password : req.body.password,
                    avatar : req.body.avatar,
                }
            },{new:true}); //for store updates data

            const {password , ...rest}  =updatesUser._doc;
            res.status(200).json(rest);

        } catch (error) {
            next(error);
        }
    }
    static deleteUser= async (req,res,next)=>{
        if(req.user.id !== req.params.id){
            return next(errorHandler(401,'you can only Delete your own account'))
        }
        try {
            await Usermodel.findByIdAndDelete(req.params.id);
            res.clearCookie('access_token')
            res.status(200).json("User has been deleted!");

        } catch (error) {
            next(error);
        }
    }
}

module.exports = userController