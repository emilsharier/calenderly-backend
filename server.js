// Global directory variable
global.__base = __dirname + '/'

// importing modules
const PORT = process.env.PORT || 3000
const express = require('express')
const morgan = require('morgan')

// Express init
const app = express()

// Middlewares
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Database init
require('./ORM/init')()

// Server
app.listen(PORT, () => {
    console.log(`Server up and running at ${PORT}`)
})