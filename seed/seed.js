const mongoose = require('mongoose');
const { User, Article, Comment, Topic } = require('../models')
const { formatArticle, formatComment } = require('../utils')


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
        return Promise.all([articelRaw, userDocs, topicDocs])
    })
    .then(([articlesDocs, userDocs, topicDocs ]) => {
        const newComment = formatComment(commentsData, articlesDocs, userDocs)
        return Promise.all([topicDocs, userDocs, articlesDocs, Comment.insertMany(newComment)])
    })
    .then(([topicDocs, userDocs, articlesDocs, commentsDocs]) => {
        return [topicDocs[0], userDocs[0], articlesDocs[0], commentsDocs[0]] 
    })
    .catch(console.log);
}


module.exports = seedDB;




