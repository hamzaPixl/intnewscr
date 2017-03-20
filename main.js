require('dotenv').config();
const server = require('http').createServer();
const io = require('socket.io')(server);
const Controller = require('./core/controllers/Controller');

const controller = new Controller();


io.on('connection', (client) => {
  client.on('request', (requestClient) => {
    controller.request(requestClient).then((data) => {
      client.emit('response', { data, name: requestClient.name });
    }, (err) => {
      console.log(err);
    });
  });
  client.on('disconnect', () => {});
});

server.listen(3000);
console.log('Server started');
