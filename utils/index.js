exports.formatArticle = (data, docsOne, docsTwo) => {
    let belongs_to;
    return data.map(article => {
        
        const newBelongs = docsOne.find(topic => topic.slug === article.topic).slug
        if (newBelongs == undefined) {
            belongs_to = docsTwo.find(topic => topic.username === article.created_by)._id
        } else {
            belongs_to = newBelongs
        }

        const created_by = docsTwo.find(user => user.username === article.created_by)._id
        console.log(belongs_to)
        return {...article, belongs_to, created_by}
    })
}

