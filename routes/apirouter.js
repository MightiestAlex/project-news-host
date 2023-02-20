const apiRouter = require('express').Router();
const topicsRouter = require('./topicsrouter.js');

apiRouter.use('/topics', topicsRouter);

module.exports = apiRouter;

