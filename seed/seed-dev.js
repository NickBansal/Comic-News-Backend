process.env.NODE_ENV = 'production'
const seedDB = require('./seed');
const mongoose = require('mongoose');
const { DB_URL } = require('../config')
const { articles, comments, topics, users } = require('./devData');


mongoose.connect(DB_URL, { useNewUrlParser: true })
    .then(() => seedDB(topics, users, articles, comments))
    .then(() => mongoose.disconnect())
    .then(console.log('Finished'))