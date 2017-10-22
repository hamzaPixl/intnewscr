const config = require('./config');
const Server = require('./core/Server');

const server = new Server();

config.searchENV();

server.start();

