const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const app = express()
const PORT = 3000

app.use(cors())
app.use(express.urlencoded({extended: false}))
app.use(express.json())

const apiRoute = require('./routes/api')
app.use('/api', apiRoute)

// connect to database
mongoose.connect("mongodb://localhost/pertemuan5", { 
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection
db.on('error', (error)=> console.error(error))
db.once('connected', () => console.log('Database Connected'))

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))