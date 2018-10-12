const commentsRouter = require('express').Router();
const { sendAllComments, updateVoteCountForComment, deleteCommentById } = require('../controllers/commentCons')

commentsRouter.get('/', sendAllComments)

commentsRouter
.route('/:comment_id')
.patch(updateVoteCountForComment)
.delete(deleteCommentById)

module.exports = commentsRouter;