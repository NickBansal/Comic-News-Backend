const { Topic, Article, User } = require('../models')

exports.sendAllTopics = (req, res, next) => {
    Topic.find()
    .then(topics => res.send(topics))
    .catch(err => console.log(err))
}

exports.sendTopicArticles = (req, res, next) => {
    const { belongs_to } = req.params;
    Article.find({ belongs_to })
    .then(articles => { 
        if (articles.length === 0) return Promise.reject({ status: 400, msg: `${belongs_to} does not have any articles available` })
        res.send(articles)
    })
    .catch(next)
}

exports.postTopicArticle = (req, res, next) => {
    const { belongs_to } = req.params; 
    const { title, body, created_by } = req.body;
    Article.create({ ...req.body, belongs_to })
    .then(articles => {
        res.send(articles)
    })
    .catch(next)
}