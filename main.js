require('./config').searchENV();
const Server = require('./core/Server');
const Database = require('./database');

const server = new Server();
const database = new Database();

database.connect().then(() => {
  server.start();
}).catch();

