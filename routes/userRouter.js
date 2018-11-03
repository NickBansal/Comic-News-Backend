const userRouter = require('express').Router();
const { 
    sendAllUsers, 
    sendUserByUsername, 
    sendAllArticlesByUser, 
    sendCommentsByUsername 
} = require('../controllers/userCons')

userRouter.get('/', sendAllUsers)

userRouter.get('/:username', sendUserByUsername)

// userRouter.get('/:username/articles', sendAllArticlesByUser)

// userRouter.get('/:username/comments', sendCommentsByUsername)

module.exports = userRouter;