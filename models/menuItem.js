const mongoose = require('mongoose')

const menuItemSchema = new mongoose.Schema({
    itemName:{
        type : String,
        required : true
    },
    itemPrice:{
        type: Number,
        required : true
    }
})

module.exports = mongoose.model("menuItem",menuItemSchema)