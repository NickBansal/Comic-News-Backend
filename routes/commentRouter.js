const commentsRouter = require('express').Router();
const { sendAllComments } = require('../controllers/commentCons')

commentsRouter.get('/', sendAllComments)

module.exports = commentsRouter;