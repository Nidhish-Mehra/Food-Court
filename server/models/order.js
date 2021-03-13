const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types
const orderSchema = new mongoose.Schema({
    orderedBy:{
        type:String,
        required:true
    },
    orderDetails:[
        {
            menuItem:{
                type:ObjectId,
                ref:"menuItem"
            },
            quantity:{
                type:Number,
                required:true
            }
        }
    ],
    orderDate:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model("Order",orderSchema)