require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('./config');
const errorHandler = require('./error-handler');
const nomsRouter = require('../noms/noms-router');
const authRouter = require('./auth/auth-router')


const app = express();

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());

app.use(express.json());

app.use('/api/noms', nomsRouter);
app.use('/api/auth', authRouter);

app.use(errorHandler);

module.exports = app;