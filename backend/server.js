const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const multer  = require('multer')

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, new Date().getTime() + '-' + file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

const app = express()
const PORT = 3000

app.use(cors())
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(multer({storage: fileStorage, fileFilter: fileFilter}).single('image'))
app.use('/uploads', express.static('uploads'))

const apiRoute = require('./routes/api')
app.use('/api', apiRoute)

// connect to database
mongoose.connect("mongodb+srv://andestta:L9DiTPnJUerttBZ3@cluster0.djaes2x.mongodb.net/?retryWrites=true&w=majority", { 
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('connected', () => console.log('Database Connected'))

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))