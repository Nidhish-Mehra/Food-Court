const express = require('express')
const app = express()
const mongoose = require('mongoose')
const PORT = 5000
const { MONGOURI } = require('./keys')
const authRoute = require('./routes/auth')
const menuItemRoute =require('./routes/menuItem')
const orderRoute =require('./routes/order')
const User = require('./models/user')


mongoose.connect(MONGOURI,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

require('./models/menuItem')
require('./models/order')
app.use(express.json())

app.use('/',authRoute)
app.use('/',menuItemRoute)
app.use('/',orderRoute)

mongoose.connection.on('connected',()=>{
    console.log("successfully connected to the database")
})
mongoose.connection.on('error',(error)=>{
    console.log("There was an error while connecting to the database",error)
})

app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`)
})