const articlesRouter = require('express').Router();
const {getArticles, getArticle, postComment} = require('../controllers/articlescontrollers.js'); 



articlesRouter.use('/:article_id/comments', postComment);
articlesRouter.use('/:articles', getArticle);
articlesRouter.use('/', getArticles);



module.exports = articlesRouter;
