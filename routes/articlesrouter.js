const articlesRouter = require('express').Router();
const {getArticles, getArticle, getArticleComments, patchArticleVotes} = require('../controllers/articlescontrollers.js'); 
const {postComment} = require('../controllers/commentscontrollers.js');

articlesRouter.patch('/:article_id/', patchArticleVotes);
articlesRouter.post('/:article_id/comments', postComment);

articlesRouter.get('/:articles/comments', getArticleComments)
articlesRouter.get('/:articles', getArticle);
articlesRouter.get('/', getArticles);


module.exports = articlesRouter;
