const { Topic } = require('../models')

exports.sendAllTopics = (req, res) => {
    Topic.find()
    .then(topics => res.send(topics))
    .catch(console.log)
}