const order = require('../models/order')
const Order = require('../models/order')

module.exports.getOrders = async (req,res)=>{
    const date = new Date();
    const todayDate = new Date(date.getTime());
    const yesterdayDate = new Date(todayDate.toISOString().slice(0,10));
    const tenMinuteDate = new Date(date.getTime() - (10*60*1000))
    const prevWeekDate = new Date(date.getTime() - (7*24*60*60*1000))
    // const yesterdayDate = new Date(date.getTime() -(24*60*60*1000));
    // console.log('Today Date is',yesterdayDate)
    // console.log('Ten Date is',tenMinuteDate)
    // console.log('prev week Date is',prevWeekDate)
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