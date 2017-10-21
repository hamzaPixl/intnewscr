const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('../tools/logger');

const modules = require('./modules');

class Server {

  constructor() {
    this.app = express();
    this.router = express.Router();
  }

  /**
   * Set differentes midelware that will be used
   * @memberof Server
   */
  setMidelwares() {
    this.app.use((req, res, next) => { logger.log(`${req.ip} - ${req.method} - ${req.baseUrl} - ${req.path}`); next(); });

    this.router.use('/', modules);

    this.app.use(bodyParser.urlencoded({ extended: false }));

    this.app.use(cookieParser());

    this.app.use(bodyParser.json());
  }

  /**
   * Start the server
   * @memberof Server
   */
  start() {
    this.app.listen(process.env.PORT || 3000);
  }

}

module.exports = Server;
