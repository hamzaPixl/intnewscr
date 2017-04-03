require('dotenv').config();
const server = require('http').createServer();
const io = require('socket.io')(server);
const Controller = require('./core/controllers/Controller');

const controller = new Controller();

io.on('connection', (client) => {
  client.on('request', (requestClient) => {
    const result = controller.request(requestClient, client);
    if (result) {
      result.then((data) => {
        client.emit('response', {data, name: requestClient.name, request: requestClient});
      }).catch((err) => {
        client.emit('response', {error: 'Error from the widget !', name: requestClient.name, request: requestClient});
      });
    } else {
      client.emit('response', {error: 'Error from the request !', name: requestClient.name, request: requestClient});
    }
  });
  client.on('disconnect', () => {});
});

server.listen(process.env.PORT || 3000);
console.log('Server started');
