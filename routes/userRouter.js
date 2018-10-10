const userRouter = require('express').Router();
const { sendAllUsers } = require('../controllers/userCons')

userRouter.get('/', sendAllUsers)

module.exports = userRouter;