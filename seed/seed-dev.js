const seedDB = require('./seed');
const mongoose = require('mongoose');
const DB_URL = 'mongodb://localhost:27017/nc_news';
const { articles, comments, topics, users } = require('./testData');


mongoose.connect(DB_URL, {useNewUrlParser: true})
    .then(() => seedDB(topics, users, articles, comments))
    .then(({ articlesDocs, commentsDocs, topicsDocs, usersDocs }) => {
        mongoose.disconnect()
    })
    .then(console.log('Finished'))