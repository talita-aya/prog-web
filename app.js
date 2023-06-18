const express = require('express')
var userRoutes = require('./routes/user_routes')

const app = express()

//middlewares
app.use(express.json())

app.use(userRoutes)


module.exports = app