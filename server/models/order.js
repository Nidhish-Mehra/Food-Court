const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types
const orderSchema = new mongoose.Schema({
    orderedBy:{
        type:String,
        required:true
    },
    orderDetails:[
        {
            itemName:{
                type:String,
            },
            itemPrice:{
                type:Number,
            },
            itemQuantity:{
                type:Number
            }
        }
    ],
    total:{
        type:Number,
        required:true
    },
    orderDate:{
        type:Date,
        required:true
    }
})

module.exports = mongoose.model("Order",orderSchema)