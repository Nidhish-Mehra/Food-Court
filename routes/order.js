const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const requireSignin = require('../middleware')
const { getOrders, createOrder } = require('../controllers/orders')

router.get('/getOrders',getOrders)

router.post('/createOrder',createOrder)

module.exports = router