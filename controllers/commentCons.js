const { Comment } = require('../models')

exports.sendAllComments = (req, res) => {
    Comment.find()
    .then(comments => res.send(comments))
    .catch(console.log)
}