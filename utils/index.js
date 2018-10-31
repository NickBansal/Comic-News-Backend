exports.formatArticle = (articlesData, topicDocs, userDocs) => {
    return articlesData.map(article => {
        const created_by = userDocs.find(user => user.username === article.created_by)._id
        const belongs_to = topicDocs.find(topic => topic.slug === article.topic).slug
        return {...article, belongs_to, created_by}
    })
}

exports.formatComment = (commentsData, articleDocs, userDocs) => {
    return commentsData.map(comment => {
        const created_by = userDocs.find(user => user.username === comment.created_by)._id
        const belongs_to = articleDocs.find(article => article.title === comment.belongs_to)._id
        return {...comment, created_by, belongs_to}
    })
}


