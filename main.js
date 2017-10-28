const config = require('./config');
const Server = require('./core/Server');
const database = require('./database');

const server = new Server();

config.searchENV();

database.connect().then(() => {
  server.start();
});

