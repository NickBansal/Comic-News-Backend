const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { DB_URL } = require('./config')
const APIrouter = require('./routes/APIrouter')


app.use('/api', APIrouter)


mongoose.connect(DB_URL, { useNewUrlParser: true })
  .then(console.log(`Database is running on ${DB_URL}`))

module.exports = app; 