const Server = require('./core/Server');
const Database = require('./database');
const config = require('./config');

const server = new Server();
const database = new Database();

config.searchENV();

database.connect().then(() => {
  server.start();
}).catch();

