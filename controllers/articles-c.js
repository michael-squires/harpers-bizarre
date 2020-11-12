const {
    removeArticleById,
    amendArticleVotes,
    createComment,
    fetchArticleComments,
    fetchArticles,
} = require('../models/articles-m');

const { fetchUserByUsername } = require('../models/users-m');

exports.getArticles = (req, res, next) => {
    const { sort_by, order, author, topic } = req.query
    fetchArticles({ sort_by, order, author, topic })
        .then(articles => {
            console.log('first article', article[0])
            res.status(200).send(articles)
        })
        .catch(next);
};

exports.getArticleComments = (req, res, next) => {
    const { article_id } = req.params;
    const { sort_by, order } = req.query;
    fetchArticleComments(article_id, sort_by, order)
        .then(comments => {
            res.status(200).send(comments)
        })
        .catch(next);
}

exports.deleteArticleById = (req, res, next) => {
    const { article_id } = req.params;
    removeArticleById(article_id)
        .then((deletedArticle) => {
            if (deletedArticle.length === 0) {
                res.status(404).send({ msg: `article ${article_id} not found` })
            }
            else res.status(204).send()
        })
        .catch(next);
};

exports.patchArticleById = (req, res, next) => {
    const { article_id } = req.params;
    const { inc_votes } = req.body;
    amendArticleVotes(article_id, inc_votes)
        .then(articles => {
            res.status(201).send(articles[0])
        })
        .catch(next);
};

exports.addCommentToArticle = (req, res, next) => {
    const { article_id } = req.params;
    const { username, body } = req.body;
    fetchUserByUsername(username)
        //if username does not exist will -> error handling chain
        .then(() => {
            return createComment(article_id, username, body)
        })
        .then(comment => {
            res.status(201).send(comment[0])
        })
        .catch(next);
}

