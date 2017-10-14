require('dotenv').config();
const Server = require('./core/Server');

const server = new Server();

server.start();

/*
io.on('connection', (client) => {
  client.on('request', (requestClient) => {
    if (requestClient.name === 'viewChange') {
      io.sockets.emit('response', {request: {name: 'viewChange', view: requestClient.view}});
    } else {
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
    }
  });
  client.on('disconnect', () => {});
});
*/
