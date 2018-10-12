const { Comment } = require('../models')

exports.sendAllComments = (req, res, next) => {
    Comment.find()
    .populate('created_by')
    .populate('belongs_to')
    .then(comments => res.send(comments))
    .catch(next)
}

exports.updateVoteCountForComment = (req, res, next) => {
    const { comment_id } = req.params
    const { vote } = req.query
    let value = (vote === 'up') ? 1 : -1
    Comment.findByIdAndUpdate(comment_id, { $inc: { votes: value }}, { new: true })
    .then(comment => {
        if (!comment) return Promise.reject({ status: 400, msg: `${comment_id} is not a correct comment_id` })
        res.send(comment)
    })
    .catch(next)
}

exports.deleteCommentById = (req, res, next) => {
    const { comment_id } = req.params
    Comment.findByIdAndRemove(comment_id)
    .then(deleted => {
        if (!deleted) return Promise.reject({ status: 400, msg: `${comment_id} has no associated comments` })
        res.status(204).send([])
    })
    .catch(next)
}