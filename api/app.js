const express = require('express')
const app = express()
const redirectRoute = require('./routes/redirect')
const shortenRoute = require('./routes/shorten')
const fetchRoute = require('./routes/fetch')
const mongoose = require('mongoose')
let cors = require('cors')

app.use(cors({
    origin: '*'
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const connectionString = `mongodb://mongo:27017`;
mongoose.connect(connectionString, {
  useNewUrlParser : true,
  useUnifiedTopology : true
})
mongoose.connection.on('connected', function() {
  console.log("connected to db")
})

// Routes
app.use('/shorten', shortenRoute)
app.use('/fetch', fetchRoute)
app.use('/', redirectRoute)


// Error request,
app.use((req, res, next) => {
    const error = new Error('Route Not Found')
    error.status = 404
    next(error)
})

// Catch all errors from all parts of the app
app.use((error, req, res, next) => {
    res.status(error.status || 500)
    console.log(error.message)
    res.json({
        error: {
            message: error.message
        }
    })
})

app.listen('3001', () => {
    console.log("server is listening on port 3001")
})

module.exports = app