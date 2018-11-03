const { Article, Comment, User } = require('../models')


exports.sendAllArticles = (req, res, next) => {
  return Promise.all(
    [
      Article.find()
        .populate('created_by')
        .lean()
        .exec(),
      Comment.find()
        .lean()
    ]
  )
    .then(([articleDocs, commentDocs]) => {
      articles = articleDocs.map(article => {
        const comments = commentDocs.filter(comment => comment.belongs_to.toString() === article._id.toString()).length;
        return {
          ...article,
          comments
        };
      });
      res.status(200).send({ articles });
    })
    .catch(next);
};

exports.sendArticleById = (req, res, next) => {
  const { article_id } = req.params;
  return Promise.all(
    [
      Article.findById(article_id)
        .populate('created_by')
        .lean()
        .exec(),
      Comment.find({ belongs_to: article_id })
        .countDocuments()
    ])
    .then(([article, count]) => {
      if (!article) throw { status: 404, message: 'Article Not Found' };
      article.comments = count;
      res.status(200).send({ article });
    })
    .catch(next);
};

exports.sendCommentsByArticles = (req, res, next) => {
  const { article_id } = req.params;
  Comment.find({ belongs_to: article_id })
    .populate("created_by")
    .populate("belongs_to")
    .then(comments => res.send(comments))
    .catch(next);
};

exports.postCommentByArticle = (req, res, next) => {
    const { article_id } = req.params
    const { body, created_by } = req.body
    Comment.create({ body, created_by, belongs_to: article_id })
    .then(comment => {
      return comment.populate('created_by')
        .execPopulate();
    })
    .then(comment => res.send(comment))
    .catch(next)
}

exports.voteArticleUpOrDown = (req, res, next) => {
  const { article_id } = req.params;
  const { vote } = req.query;
  let value = vote === "up" ? 1 : -1;
  Article.findOneAndUpdate(
    { _id: article_id },
    { $inc: { votes: value } },
    { new: true }
  )
    .then(article => {
      res.send(article);
    })
    .catch(next);
};
