const order = require('../models/order')
const Order = require('../models/order')

module.exports.getOrders = async (req,res)=>{
    const date = new Date();
    const indianTimeOffset = 5*60*60*1000 + 0.5*60*60*1000
    const todayDate = new Date(date.getTime()+indianTimeOffset);
    const yesterdayDate = new Date(todayDate.toISOString().slice(0,10));
    const tenMinuteDate = new Date(date.getTime() - (10*60*1000) + indianTimeOffset)
    const prevWeekDate = new Date(date.getTime() - (7*24*60*60*1000) + indianTimeOffset)
    try{
        const todayOrders = await Order.find({"orderDate":{$gt:yesterdayDate}})
        const tenMinuteOrders = await Order.find({"orderDate":{$gt:tenMinuteDate}})
        const prevWeekOrders = await Order.find({"orderDate":{$gt:prevWeekDate}})
        const allOrders = {
            todayOrders,
            tenMinuteOrders,
            prevWeekOrders
        }
        console.log(allOrders)
        if(allOrders){
            res.json(allOrders)
        }
    }catch(error){
        console.log(error)
    }
}

module.exports.createOrder = (req,res)=>{
    const{ orderedBy , orderDetails , orderDate } = req.body
    if(!(orderedBy && orderDetails && orderDate) ){
        return res.status(422).json({error:"Order not placed"})
    }
    const newOrder = new Order({
        orderedBy,
        orderDetails,
        orderDate
    })
    newOrder.save().then(PlacedOrder=>{
        res.json({newOrder:PlacedOrder})
    })
    .catch(error=>{
        console.log(error)
    })

}