const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('../tools/logger');

const modules = require('./modules');

class Server {

  constructor() {
    this.app = express();
    this.router = express.Router();
    this.router.use('/', modules);
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(cookieParser());
    this.app.use(bodyParser.json());
    this.app.use((req, res, next) => { logger.logger(`${req.ip} - ${req.method} - ${req.baseUrl} - ${req.path}`); next(); });
  }

  start() {
    this.app.listen(process.env.PORT || 3000);
  }

}

module.exports = Server;
