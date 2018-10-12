const userRouter = require('express').Router();
const { sendAllUsers, sendUserByUsername } = require('../controllers/userCons')

userRouter.get('/', sendAllUsers)

userRouter.get('/:username', sendUserByUsername)

module.exports = userRouter;