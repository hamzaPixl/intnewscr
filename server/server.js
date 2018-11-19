const config = require('config');
const bluebird = require('bluebird');
const passport = require('passport');
const mongoose = require('mongoose');
const expressSession = require('express-session');
const logger = require('./infrastructure/logger').init('intnewscr');

const express = require('express');
const middlewares = require('./middlewares');
const bodyParser = require('body-parser');
const cookiesParser = require('cookie-parser');
const morgan = require('morgan');

const controllers = require('./controllers');

// Global Promise
global.Promise = bluebird;
mongoose.Promise = global.Promise;

require('./infrastructure/db')(mongoose, config.mongo);

logger.info(`ENV ${config.env}`);

const server = express();

server.use(morgan('short', { stream: logger.stream }));
server.use(cookiesParser());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(expressSession({ secret: config.secret }));
server.use(passport.initialize());
server.use(passport.session());
server.use('/', controllers);

server.use(middlewares.notFoundMiddleware);
server.use(middlewares.errorLoggerMiddleware);
server.use(middlewares.errorHandlerMiddleware);

server.listen(config.port, () => logger.info(`INTERACTIVE NEWS SCREEN API running on port : ${config.port}`));

module.exports = server;
