const mongoose = require('mongoose')

const menuItemSchema = new mongoose.Schema({
    itemName:{
        type : String,
        required : true
    },
    itemPrice:{
        type: Number,
        required : true
    },
    photo:{
        type : String,
        default : "no Photo"
    }
})

module.exports = mongoose.model("menuItem",menuItemSchema)