const { Topic, Article, Comment } = require('../models')

exports.sendAllTopics = (req, res, next) => {
    Topic.find()
    .then(topics => res.send(topics))
    .catch(next)
}

exports.sendTopicArticles = (req, res, next) => {
    const { belongs_to } = req.params;
    return Promise.all([Article.find({ belongs_to }).lean(), Comment.find().lean()])
    .then(([articles, comments]) => {
        if (articles.length === 0) return Promise.reject({ status: 400, msg: `${belongs_to} does not have any articles available` })
        const articlesComments = articles.map(article => {
            const comment_count = comments.filter(comment => comment.belongs_to.toString() === article._id.toString()).length
            return { ...article, comment_count }
        })
        res.send(articlesComments)
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