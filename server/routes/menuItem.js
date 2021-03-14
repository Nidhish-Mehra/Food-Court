const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const {requireSignin,validateMenuItem} = require('../middleware')
const menuItem = require('../models/menuItem')
const { getMenuItems,createMenuItem,deleteMenuItem } =require('../controllers/menuItems')

router.get('/getMenuItems',getMenuItems)

router.post('/createMenuItem',requireSignin,validateMenuItem,createMenuItem)
router.post('/deleteMenuItem',validateMenuItem,deleteMenuItem)

module.exports = router;