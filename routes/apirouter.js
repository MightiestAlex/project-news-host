const apiRouter = require('express').Router();
const topicsRouter = require('./topicsrouter.js');
const articlesRouter = require('./articlesrouter.js');

apiRouter.use('/topics', topicsRouter);
apiRouter.use('/articles', articlesRouter);

module.exports = apiRouter;

