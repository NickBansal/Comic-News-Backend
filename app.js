// process.env.NODE_ENV = 'production';
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { DB_URL } = require('./config')
const APIrouter = require('./routes/APIrouter');
const bodyParser = require('body-parser');
const { handle404, handle400, handle500 } = require('./error-handlers')
const cors = require('cors')

mongoose.connect(DB_URL, { useNewUrlParser: true })
   .then(console.log(`Database is running on ${DB_URL}`))

app.set('view engine', 'ejs')
app.use(cors())
app.use(express.static('public'), bodyParser.json())
app.use('/api', APIrouter)
app.use('/*', (req, res, next) => next({ status: 404, msg: `${req.originalUrl} does not exist` }))
app.use(handle404)
app.use(handle400) // Bad request
app.use(handle500)

module.exports = app; 