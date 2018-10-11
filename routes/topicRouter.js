const topicRouter = require('express').Router();
const { sendAllTopics, sendTopicArticles, postTopicArticle } = require('../controllers/topicCons')

topicRouter.get('/', sendAllTopics)

topicRouter
.route('/:belongs_to/articles')
.get(sendTopicArticles)
.post(postTopicArticle)

module.exports = topicRouter;