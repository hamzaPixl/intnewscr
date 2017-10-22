const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const jsend = require('jsend');
const logger = require('../tools/logger');

const modules = require('./modules');

class Server {

  constructor() {
    this.app = express();
    this.setMidelwares();
  }

  /**
   * Set differentes midelware that will be used
   * @memberof Server
   */
  setMidelwares() {
    this.app.use((req, res, next) => { logger.log(`${req.ip} - ${req.method} - ${req.originalUrl} - ${req.baseUrl} - ${req.path}`); next(); });

    this.app.use(bodyParser.urlencoded({ extended: false }));

    this.app.use(cookieParser());

    this.app.use(bodyParser.json());

    this.app.use(jsend.middleware);

    this.app.use('/', modules);
  }

  /**
   * Start the server
   * @memberof Server
   */
  start() {
    logger.log(`The server is started on URL : ${process.env.APP_URL}${process.env.PORT}`);
    this.app.listen(process.env.PORT || 3000);
  }

}

module.exports = Server;
