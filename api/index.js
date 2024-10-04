const express = require('express')
const {config} = require('dotenv')
const mongoose = require('mongoose')
const routes = require("./routes/index.js")
const cors = require('cors')

config()

const app = express()

app.use(cors())

app.use(express.json())
app.use(express.urlencoded())

app.use(routes)

app.use((error, req, res, next) => {
    res.status(error.status || 500)
    .json({
        error: error.message || 'Problem While Executing Request'
    })
})

const listener = app.listen(process.env.API_PORT, process.env.API_HOST, async function() {
    console.log(`Server started at http://${listener.address().address}:${listener.address().port}`)
    console.log('Press Ctrl + C to stop');

    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log('MongoDB Connected')
    } catch (err) {
        console.log('Problem While Connecting ');
        
    }

})