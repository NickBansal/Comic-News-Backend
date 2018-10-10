const topicRouter = require('express').Router();
const { sendAllTopics } = require('../controllers/topicCons')

topicRouter.get('/', sendAllTopics)

module.exports = topicRouter;