const express = require('express') 
const app = express()
const api = require( './server/routes/api' ) 
const path = require('path')
const bodyParser = require('body-parser') 
const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/pictureDB', { useNewUrlParser: true })

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'dist'))) 
app.use(express.static(path.join(__dirname, 'node_modules')))
app.use('/', api)

const port = process.env.PORT || 5000
app.listen(port, function () {
    console.log(`Running on port ${port}`)
})