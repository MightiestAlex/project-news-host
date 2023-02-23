const articlesRouter = require('express').Router();
const {getArticles, getArticle, getArticleComments} = require('../controllers/articlescontrollers.js'); 
const {postComment} = require('../controllers/commentscontrollers.js');

articlesRouter.post('/:article_id/comments', postComment);

articlesRouter.get('/:articles/comments', getArticleComments);
articlesRouter.get('/:articles', getArticle);
articlesRouter.get('/', getArticles);




module.exports = articlesRouter;
