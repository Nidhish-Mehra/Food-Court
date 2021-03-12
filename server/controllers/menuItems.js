const menuItem = require('../models/menuItem')

module.exports.getMenuItems = (req,res)=>{
    menuItem.find()
    .then(menu=>{
        res.json(menu)
    })
    .catch(error=>{
        console.log(error)
    })
}

module.exports.createMenuItem = (req,res)=>{
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

}