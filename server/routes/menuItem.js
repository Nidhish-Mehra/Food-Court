const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const requireSignin = require('../middleware/requireSignin')
const menuItem = mongoose.model("menuItem")

router.get('./getMenuItems',requireSignin,(req,res)=>{
    menuItem.find()
    .then(menu=>{
        res.json({menu:menu})
    })
    .catch(error=>{
        console.log(error)
    })
})

router.post('./createMenuItem',requireSignin,(req,res)=>{
    const {itemName,itemPrice} = req.body
    if(!itemName || !itemPrice){
        return res.status(422).json({error:"Please add all the fields"})
    }
    const newItem = new menuItem({
        itemName,
        itemPrice
    })
    newItem.save().then(result=>{
        res.json({menuItem:result})
    })
    .catch(error=>{
        console.log(error)
    })

})

module.exports = router