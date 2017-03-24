require('dotenv').config();
const server = require('http').createServer();
const io = require('socket.io')(server);
const Controller = require('./core/controllers/Controller');

const controller = new Controller();

io.on('connection', (client) => {
  client.on('request', (requestClient) => {
    const result = controller.request(requestClient);
    if (result) {
      result.then((data) => {
        client.emit('response', {data, name: requestClient.name});
      }).catch((err) => {
        client.emit('response', {error: err, name: requestClient.name});
      });
    } else {
      client.emit('response', {error: 'Error from the request !', name: requestClient.name});
    }
  });
  client.on('disconnect', () => {});
});

server.listen(3000);
console.log('Server started');
