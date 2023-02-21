const topicsRouter = require('express').Router();
const {getTopics} = require('../controllers/topicscontrollers.js')

topicsRouter.get('/', getTopics);

module.exports = topicsRouter;