const mongoose = require('mongoose')
const orderSchema = new mongoose.Schema({
    orderedBy:{
        type:String,
        required:true
    },
    sandwich:{
        type:Number
    },
    coffee:{
        type:Number
    },
    poha:{
        type:Number
    },
    upma:{
        type:Number
    },
    tea:{
        type:Number
    },
    BreadButterJam:{
        type:Number
    },
    orderDate:{
        type:Date,
        required:true
    }
})

module.exports = mongoose.model("Order",orderSchema)