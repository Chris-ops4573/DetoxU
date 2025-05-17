const express = require('express')
const mongoose = require('mongoose')
const app = express()
require('dotenv').config()

app.get('/', (req, res) => {
    res.json({mssg: "Tracker"})
})

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('server running on mango db and port:', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })