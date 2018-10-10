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
        return Promise.all([articelRaw, userDocs, topicDocs])
    })
    .then(([articlesDocs, userDocs, topicDocs ]) => {
        const newComment = formatArticle(commentsData, articlesDocs, userDocs)
        return Promise.all([articlesDocs, userDocs, topicDocs, Comment.insertMany(newComment)])
    })
    .then(([articlesDocs, userDocs, topicDocs, commentsDocs]) => {
        return [articlesDocs[0], userDocs[0], topicDocs[0], commentsDocs[0]] 
    })
    .catch(console.log);
}

// .then(([actorsDocs, companiesDocs]) => {
//     const actorObj = changeId(actors, actorsDocs)
//     const companyObj = changeId(company, companiesDocs)
//     const formattedMovies = formatMovies(movie, actorObj, companyObj)
//     return Promise.all([actorsDocs, companiesDocs, Movies.insertMany(formattedMovies)])
// })
// .then(([actorDocs, companyDocs, movieDocs]) => {
//     return [actorDocs[0], companyDocs[0], movieDocs[0]]
// })



module.exports = seedDB;




