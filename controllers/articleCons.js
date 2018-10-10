const { Article } = require('../models')

exports.sendAllArticles = (req, res) => {
    Article.find()
    .populate({ 
        path: 'created_by', 
        select: 'name -_id', 
    })
    .then(articles => res.send(articles))
    .catch(console.log)
}