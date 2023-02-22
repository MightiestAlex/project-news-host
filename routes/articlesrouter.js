const articlesRouter = require('express').Router();
const {getArticles, getArticle} = require('../controllers/articlescontrollers.js'); 

articlesRouter.use('/:articles', getArticle);
articlesRouter.use('/', getArticles);


module.exports = articlesRouter;
