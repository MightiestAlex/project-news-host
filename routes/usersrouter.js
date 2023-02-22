const usersRouter = require('express').Router();
const {getUsers} = require('../controllers/userscontroller.js');

usersRouter.use('/', getUsers);

module.exports = usersRouter;