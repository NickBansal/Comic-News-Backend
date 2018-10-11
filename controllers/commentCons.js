const { Comment } = require('../models')

exports.sendAllComments = (req, res) => {
    Comment.find()
    .populate({ 
        path: 'created_by'
        // select: 'name -_id' 
    })
    .populate({
        path: 'belongs_to'
        // select: 'title -_id'
    })
    .then(comments => res.send(comments))
    .catch(console.log)
}