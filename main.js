require('./config').searchENV();
const Server = require('./core/Server');
const database = require('./database');

const server = new Server();

database.connect()
.then(() => {
  server.start();
}).catch();

