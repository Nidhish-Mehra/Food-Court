const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const requireSignin = require('../middleware/requireSignin')
const menuItem = require('../models/menuItem')
const { getMenuItems,createMenuItem,deleteMenuItem } =require('../controllers/menuItems')

router.get('/getMenuItems',getMenuItems)

router.post('/createMenuItem',requireSignin,createMenuItem)
router.post('/deleteMenuItem',deleteMenuItem)

module.exports = router;