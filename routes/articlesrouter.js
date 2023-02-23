const articlesRouter = require('express').Router();
const {getArticles, getArticle, getArticleComments} = require('../controllers/articlescontrollers.js'); 


articlesRouter.use('/:articles/comments', getArticleComments)
articlesRouter.use('/:articles', getArticle);
articlesRouter.use('/', getArticles);


module.exports = articlesRouter;
