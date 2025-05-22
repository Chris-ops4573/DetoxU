const express = require('express')
const mongoose = require('mongoose')
const app = express()
require('dotenv').config()
const authRoutes = require("./routes/authRoutes")
const cookieParser = require("cookie-parser")
const mainPageRoutes = require('./routes/mainPageRoutes')

app.get('/', (req, res) => {
    res.json({mssg: "Tracker"})
})

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})
app.use(express.json())
app.use(cookieParser())

app.use(authRoutes)
app.use(mainPageRoutes)

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('server running on mango db and port:', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })