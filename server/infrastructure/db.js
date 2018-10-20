const Promise = require('bluebird');
const logger = require('./logger');

const connect = function connect(mongoose, connectionString) {
  mongoose.Promise = Promise;

  mongoose.connect(connectionString, {
    reconnectTries: Number.MAX_VALUE,
    useNewUrlParser: true,
  });

  mongoose.connection.on('connected', () => {
    logger.info('Connected to MongoDb');
  });

  mongoose.connection.on('error', (err) => {
    logger.error('MongoDb error', err);
  });

  mongoose.connection.on('disconnected', (err) => {
    const runningIntegrationTests = !!process.env.NODE_ENV;
    if (!runningIntegrationTests) { logger.error('MongoDb disconnected', err); }
  });
};

module.exports = connect;
