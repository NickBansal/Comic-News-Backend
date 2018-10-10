const articlesRouter = require('express').Router();
const { sendAllArticles } = require('../controllers/articleCons')

articlesRouter.get('/', sendAllArticles)

module.exports = articlesRouter;