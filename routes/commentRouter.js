const commentsRouter = require('express').Router();
const { sendAllComments, updateVoteCountForComment } = require('../controllers/commentCons')

commentsRouter.get('/', sendAllComments)

commentsRouter
.route('/:comment_id')
.patch(updateVoteCountForComment)

module.exports = commentsRouter;