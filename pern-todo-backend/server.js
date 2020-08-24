const express = require('express')
const cors = require('cors')
const pool = require('./db')
const todoRoute = require('./Routes/Todos')

const app = express()

app.use(cors())
app.use(express.json())

app.use('/todos', todoRoute)

app.listen(5000, () => console.log('server running on port 5000'))