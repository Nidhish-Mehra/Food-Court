const Order = require('../models/order')

module.exports.getOrders = (req,res)=>{
    Order.find()
    .then(orders=>{
        res.json({orders})
    })
    .catch(error=>{
        console.log(error)
    })
}

module.exports.createOrder = (req,res)=>{
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

}