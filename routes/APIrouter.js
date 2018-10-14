const APIrouter = require('express').Router();
const { articlesRouter, commentsRouter, topicRouter, userRouter } = require('./')

APIrouter.get('/', (req, res) => {
    res.render('homepage')
})

APIrouter
.use('/articles', articlesRouter)
.use('/comments', commentsRouter)
.use('/topics', topicRouter)
.use('/users', userRouter)



module.exports = APIrouter