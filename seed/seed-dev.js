const seedDB = require('./seed');
const mongoose = require('mongoose');
const DB_URL  = 'mongodb://Nick:bansal321@ds131753.mlab.com:31753/ncnews'
const { articles, comments, topics, users } = require('./devData');


mongoose.connect(DB_URL, {useNewUrlParser: true})
    .then(() => seedDB(topics, users, articles, comments))
    .then(() => mongoose.disconnect())
    .then(console.log('Finished'))