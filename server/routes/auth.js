const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model("User")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { JWT_KEY } = require('../keys')
const requireSignin = require('../middleware/requireSignin')

router.post('/signup',(req,res)=>{
    const { name, password } = req.body
    if(!name || !password){
        return res.status(422).json({error:"please add all the fields"})
    }
    User.findOne({name:name})
    .then((savedUser)=>{
        if(savedUser){
            return res.status(422).json({error:"user already exists"})
        }
        bcrypt.hash(password,12)
        .then(hashedpassword=>{
            const user = new User({
                name,
                password:hashedpassword
            })
            user.save()
            .then(user=>{
                res.json({message:"saved successfully"})
            })
            .catch(error=>{
                console.log(error)
            })
        })
    })
    .catch(error=>{
        console.log(error)
    }) 
})

router.post('/signin',(req,res)=>{
    const { name,password } = req.body
    if( !name || !password ){
        return res.status(422).json({error:"Please enter Name and Password"})
    }
    User.findOne({name:name})
    .then(savedUser=>{
        if(!savedUser){
            return res.status(422).json({error:"Invalid Name or Password"})
        }
        bcrypt.compare(password,savedUser.password)
        .then(Matched=>{
            if(Matched){
                // res.json({message:"successfully signed in"})
                const token =jwt.sign({_id:savedUser._id},JWT_KEY)
                res.json({token})
            }
            else{
                return res.status(422).json({error:"Invalid Name or Password"})
            }
        })
        .catch(error=>{
            console.log(error)
        })
    })
})


module.exports = router