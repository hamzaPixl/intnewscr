require('dotenv').config();
const express = require('express');
const Controller = require('./core/controllers/Controller');
const AuthController = require('./core/auth0/Controller');
const servicesAuth = require('./core/auth0/config.json');

const controller = new Controller();
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

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

Object.keys(servicesAuth).forEach((index) => {
  const aut = new AuthController(servicesAuth[index].name);

  aut.initialize();

  app.use(aut.getPassport().initialize());
  app.use(aut.getPassport().session());

  app.get('/auth', aut.getPassport().authenticate(aut.getAuthenticateKey(), aut.getAuthenticateScope()), (req, res) => {});

  app.get('/authorize', aut.getPassport().authenticate(aut.getAuthenticateKey(), {failureRedirect: '/error'}), (req, res) => {
    res.send('http://localhost:3000');
  });
});

server.listen(process.env.PORT || 3000);

console.log('Server started');
