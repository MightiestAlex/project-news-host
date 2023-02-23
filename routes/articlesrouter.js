const articlesRouter = require('express').Router();
const {getArticles, getArticle, getArticleComments, patchArticleVotes} = require('../controllers/articlescontrollers.js'); 




articlesRouter.get('/:articles/comments', getArticleComments)
articlesRouter.get('/:articles', getArticle);
articlesRouter.get('/', getArticles);
articlesRouter.patch('/:article_id', patchArticleVotes)



module.exports = articlesRouter;
