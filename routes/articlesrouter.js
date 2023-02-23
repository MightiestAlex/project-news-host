const articlesRouter = require('express').Router();
const {getArticles, getArticle, getArticleComments, postComment} = require('../controllers/articlescontrollers.js'); 


articlesRouter.use('/:article_id/comments', postComment);
articlesRouter.use('/:articles/comments', getArticleComments)
articlesRouter.use('/:articles', getArticle);
articlesRouter.use('/', getArticles);



module.exports = articlesRouter;
