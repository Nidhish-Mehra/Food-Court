const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const requireSignin = require('../middleware/requireSignin')
const { getOrders, createOrder } = require('../controllers/orders')

router.get('/getOrders',requireSignin,getOrders)

router.post('/createOrder',requireSignin,createOrder)

module.exports = router