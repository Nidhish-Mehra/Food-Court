const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const requireSignin = require('../middleware/requireSignin')
const menuItem = require('../models/menuItem')
const { getMenuItems,createMenuItem,deleteMenuItem } =require('../controllers/menuItems')

router.get('/getMenuItems',getMenuItems)

<<<<<<< HEAD
router.post('/createMenuItem',requireSignin,createMenuItem)
=======
router.post('/createMenuItem',createMenuItem)
router.post('/deleteMenuItem',deleteMenuItem)
>>>>>>> 391a8fe1ca5484c37aab5e4ff1d605cc62125cfd

module.exports = router;