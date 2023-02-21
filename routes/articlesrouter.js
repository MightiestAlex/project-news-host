const articlesRouter = require('express').Router();
const {getArticles} = require('../controllers/articlescontrollers.js'); 

articlesRouter.use('/', getArticles);

module.exports = articlesRouter;
