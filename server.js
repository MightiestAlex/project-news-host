const apiRouter = require('./routes/apirouter.js');

const {handleStatus400, handleStatus500, handlePSQLerrors} = require('./controllers/errorhandlers.js');
const express = require('express');

const app  = express();
app.use(express.json());

app.use('/api', apiRouter);

app.use(handlePSQLerrors);
app.use(handleStatus400);
app.use(handleStatus500);


module.exports = app; 
