const articlesRouter = require('express').Router();
const { 
    sendAllArticles, 
    sendArticleById, 
    sendCommentsByArticles,
    voteArticleUpOrDown,
    postCommentByArticle 
} = require('../controllers/articleCons')

articlesRouter.get('/', sendAllArticles)

articlesRouter
.route('/:article_id')
.get(sendArticleById)
.patch(voteArticleUpOrDown)

articlesRouter
.route('/:article_id/comments')
.get(sendCommentsByArticles)
.post(postCommentByArticle)


module.exports = articlesRouter;