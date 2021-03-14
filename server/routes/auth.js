const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { JWT_KEY } = require('../keys')
const {requireSignin,validateUser} = require('../middleware')
const { signup,signin } = require('../controllers/auths')

router.post('/signin',validateUser,signin)

router.post('/signup',validateUser,signup)



module.exports = router