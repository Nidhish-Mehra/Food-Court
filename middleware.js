const jwt = require('jsonwebtoken')
const {JWT_KEY} = require('./keys')
const mongoose = require('mongoose')
const User = mongoose.model("User")
const {userSchema,orderSchema,menuItemSchema} = require('./schemas')
const ExpressError = require('./utils/ExpressError')

module.exports.requireSignin = (req,res,next)=>{
     const {authorization} = req.headers
     if(!authorization){
         return res.status(401).json({error:"You must be signed in"})
     }
     const token = authorization.replace("Bearer ","")
     jwt.verify(token,JWT_KEY,(error,payload)=>{
         if(error){
             return res.status(401).json({error: "You must be signed in"})
         }
         const{ _id } = payload
         User.findById(_id).then(userdata=>{
             req.user = userdata
             next()
         })
     })
}

module.exports.validateUser = (req,res,next) => {
    const {error} = userSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        return res.status(422).json({error:msg})
    } else {
        next();
    }
}

module.exports.validateOrder = (req,res,next) => {
    const {error} = orderSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        return res.status(422).json({error:msg})
    } else {
        next();
    }
}

module.exports.validateMenuItem = (req,res,next) => {
    const {error} = menuItemSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        return res.status(422).json({error:msg})
    } else {
        next();
    }
}
