const mongoose = require('mongoose');
const { User, Article, Comment, Topic } = require('../models')
const { formatArticle } = require('../utils')


const seedDB = (topicsData, usersData, articlesData, commentsData) => {
    return mongoose.connection
    .dropDatabase()
    .then(() => {
        const topicRaw = Topic.insertMany(topicsData)
        const userRaw = User.insertMany(usersData)
        return Promise.all([ topicRaw, userRaw ])
    })
    .then(([ topicDocs, userDocs ]) => {
        const newArticle = formatArticle(articlesData, topicDocs, userDocs)
        const articelRaw = Article.insertMany(newArticle);
        return Promise.all([articelRaw, userDocs])
    })
    .then(([articlesDocs, userReDocs ]) => {
        const newComment = formatArticle(commentsData, articlesDocs, userReDocs)
        return Comment.insertMany(newComment)
    })
    .then(console.log)
    .catch(console.log);
}


module.exports = seedDB;




