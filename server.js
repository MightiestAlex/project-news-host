const apiRouter = require('./routes/apirouter.js');

const {statusCode400, statusCode500} = require('./controllers/errorhandlers.js');
const express = require('express');

const app  = express();
app.use(express.json());


app.use('/api', apiRouter);

app.use(statusCode400);
app.use(statusCode500);

//app.listen(9090, () => console.log('App listening on port 9090!'));

module.exports = app; 
