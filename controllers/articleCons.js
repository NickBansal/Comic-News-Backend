const { Article } = require('../models')

exports.sendAllArticles = (req, res, next) => {
    Article.find()
    .populate({ 
        path: 'created_by'
        // select: 'name -_id', 
    })
    .then(articles => res.send(articles))
    .catch(err => {
        console.log(err);
    })
}