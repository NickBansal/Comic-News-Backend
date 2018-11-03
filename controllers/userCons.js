const { User, Article, Comment } = require('../models')

exports.sendAllUsers = (req, res, next) => {
    User.find()
    .then(users => res.send(users))
    .catch(next)
}

exports.sendUserByUsername = (req, res, next) => {
    const { username } = req.params
    User.findOne({ username })
    .then(user => {
        if (!user) return Promise.reject({ status: 400, msg: `${username} is not a valid profile` })
        res.send(user)
    })
    .catch(next)
}

exports.sendAllArticlesByUser = (req, res, next) => {
    const { username } = req.params
    Article.find()
    .populate('created_by')
    .then(articles => {
        const newArticles = [];
        articles.forEach(article => {
            if (article.created_by.username === username) {
                newArticles.push(article)
            }
        })
        return newArticles
    })
    .then(articles => res.send(articles))
    .catch(next)
}

exports.sendCommentsByUsername = (req, res, next) => {
    const { username } = req.params
    Comment.find()
    .populate('created_by')
    .then(comments => {
        const newComments = [];
        comments.forEach(comment => {
            if (comment.created_by.username === username) {
                newComments.push(comment)
            }
        })
        return newComments
    })
    .then(comments => res.send(comments))
    .catch(next)
}