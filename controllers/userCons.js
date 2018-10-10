const { User } = require('../models')

exports.sendAllUsers = (req, res) => {
    User.find()
    .then(users => res.send(users))
    .catch(console.log)
}