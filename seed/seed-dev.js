const seedDB = require('./seed');
const mongoose = require('mongoose');
const { DB_URL } = require('../config')
const { articles, comments, topics, users } = require('./devData');


mongoose.connect('mongodb://Bansal321:75J0tryG!@ds131753.mlab.com:31753/ncnews', {useNewUrlParser: true})
    .then(() => seedDB(topics, users, articles, comments))
    .then(() => mongoose.disconnect())
    .then(console.log('Finished'))