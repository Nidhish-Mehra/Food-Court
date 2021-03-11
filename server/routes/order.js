const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const requireSignin = require('../middleware/requireSignin')
const Order = mongoose.model("Order")

router.get('/allOrders',requireSignin,(req,res)=>{
    Order.find()
    .then(orders=>{
        res.json({orders})
    })
    .catch(error=>{
        console.log(error)
    })
})

router.post('/createOrder',requireSignin,(req,res)=>{
    const{ orderedBy , orderDetails } =req.body
    if(!orderedBy || !orderDetails){
        return res.status(422).json({error:"Order not placed"})
    }
    const newOrder = new Order({
        orderedBy,
        orderDetails
    })
    newOrder.save().then(PlacedOrder=>{
        res.json({newOrder:PlacedOrder})
    })
    .catch(error=>{
        console.log(error)
    })

})

module.exports = router