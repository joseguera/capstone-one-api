require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('./config');
const nomsRouter = require('../noms/noms-router');
const usersRouter = require('../users/users-router');
const listsRouter = require('../lists/lists-router');
const recipesRouter = require('../recipes/recipes-router');

const app = express();

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());

app.use('/noms', nomsRouter);
app.use('/users', usersRouter);
app.use('/lists', listsRouter);
app.use('/recipes', recipesRouter);


app.use(function errorHandler(error, req, res, next) {
    let response
    if (NODE_ENV === 'production') {
        response = { error: { message: 'server error' } }
    } else {
        console.error(error)
        response = { message: error.message, error }
    }
    res.status(500).json(response)
});

module.exports = app;