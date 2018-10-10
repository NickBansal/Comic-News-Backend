const { Article } = require('../models')

exports.sendAllArticles = (req, res) => {
    Article.find()
    .then(articles => res.send(articles))
    .catch(console.log)
}