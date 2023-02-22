const apiRouter = require('express').Router();
const topicsRouter = require('./topicsrouter.js');
const articlesRouter = require('./articlesrouter.js');
const usersRouter = require('./usersrouter')

apiRouter.use('/topics', topicsRouter);
apiRouter.use('/articles', articlesRouter);
apiRouter.use('/users', usersRouter)

module.exports = apiRouter;

