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
    .then(article => res.send(article))
    .catch(next)
}

exports.sendCommentsByArticles = (req, res, next) => {
    const { article_id } = req.params
    Comment.find({ belongs_to: article_id })
    .then(comments => res.send(comments))
    .catch(console.log)
}

exports.postCommentByArticle = (req, res, next) => {
    res.send('POST COMMENT')
}

exports.voteArticleUpOrDown = (req, res, next) => {
    res.send('PATCH ARTICLE')
}

