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
        if (articles.length === 0) next({ status: 400, msg: `${belongs_to} does not have any articles available` })
        else res.send(articles)
    })
    .catch(console.log)
}

exports.postTopicArticle = (req, res) => {
    const { belongs_to } = req.params; 
    const { title, body } = req.body;
    const created_by = '5bbf0d9de3d615050c48b3cd'
    Article.create({ ...req.body, belongs_to, created_by })
    .then(articles => res.send(articles))
    .catch(console.log)
}


// USERS

// {
//     "_id": "5bbf0d9be3d615050c48b3cb",
//     "username": "butter_bridge",
//     "name": "jonny",
//     "avatar_url": "https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg",
//     "__v": 0
// },


// ARTICLES

// {
//     "_id": "5bbf0d9de3d615050c48b3cd",
//     "title": "Living in the shadow of a great man",
//     "created_by": {
//         "_id": "5bbf0d9be3d615050c48b3cb",
//         "username": "butter_bridge",
//         "name": "jonny",
//         "avatar_url": "https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg",
//         "__v": 0
//     },
//     "body": "I find this existence challenging",
//     "belongs_to": "mitch",
//     "__v": 0
// },