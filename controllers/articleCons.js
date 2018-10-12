const { Article, Comment } = require('../models')

exports.sendAllArticles = (req, res, next) => {
    Article.find()
    .populate('created_by')
    .then(articles => res.send(articles))
    .catch(err => console.log(err))
}

exports.sendArticleById = (req, res, next) => {
    const { article_id } = req.params
    Article.findById(article_id)
    .populate('created_by')
    .then(article => {
        if(!article) return Promise.reject({ status: 400, msg: `${article_id} is not a valid article Id` })
        res.send(article)
    })
    .catch(next)
}

exports.sendCommentsByArticles = (req, res, next) => {
    const { article_id } = req.params
    Comment.find({ belongs_to: article_id })
    .then(comments => res.send(comments))
    .catch(next)
}

exports.postCommentByArticle = (req, res, next) => {
    const { article_id } = req.params
    const { body } = req.body
    Comment.create({ body, created_by: article_id, belongs_to: article_id })
    .then(comment => res.send(comment))
    .catch(next)
}

exports.voteArticleUpOrDown = (req, res, next) => {
    const { article_id } = req.params
    const { vote } = req.query
    let value = (vote === 'up') ? 1 : -1
    Article.findOneAndUpdate({_id: article_id }, { $inc: { votes: value }}, {new: true})
    .then(article => {
        res.send(article)
    })
}

