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

            const {password , ...res}  =updatesUser._doc;
            res.status(200).json(res);

        } catch (error) {
            next(error);
        }
    }
}

module.exports = userController