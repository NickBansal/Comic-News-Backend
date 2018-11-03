const { User, Articles } = require('../models')

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
    Articles.find({ username })
    .populate('created_by')
    .then(articles => {
        res.send(articles)
    })
    .catch(next)
}

// exports.sendCommentsByUsername = (req, res, next) => {
//     const { username } = req.params
//     Articles.find({ username })
//     .then(articles => {
//         res.send(articles)
//     })
//     .catch(next)
// }