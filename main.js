const url = require('url');
require('dotenv').config();
const Controller = require('./core/controllers/Controller');

/**
 * This function handle all request that the server receive
 * @param request
 * @param response
 */
function onRequest (request, response) {
  const pathname = url.parse(request.url).pathname;
  const query = url.parse(request.url).query;
  switch (pathname) {
    default:
      break;
  }
}

const server = require('http').createServer(onRequest);
const io = require('socket.io')(server);

const controller = new Controller();

io.on('connection', (client) => {
  client.on('request', (requestClient) => {
    const result = controller.request(requestClient, client);
    if (result) {
      result.then((data) => {
        client.emit('response', {data, name: requestClient.name});
      }).catch(() => {
        client.emit('response', {error: 'Error from the widget !', name: requestClient.name});
      });
    } else {
      client.emit('response', {error: 'Error from the request !', name: requestClient.name});
    }
  });
  client.on('disconnect', () => {});
});

server.listen(process.env.PORT || 3000);

console.log('Server started');
