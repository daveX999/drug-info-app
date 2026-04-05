const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleware/errorMiddleware')
console.log('MONGO_URI:', process.env.MONGO_URI)
const connectDB = require('./config/db')
const port = process.env.PORT || 5000

const app = express()

connectDB()

// Middleware
app.use(express.json())

app.use('/api/drugs', require('./routes/drugRoutes'))

app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`))