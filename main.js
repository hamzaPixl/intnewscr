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
    console.log(requestClient)
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

Object.keys(servicesAuth).forEach((index) => {
  const aut = new AuthController(servicesAuth[index].name);
  aut.initialize();
  app.use(aut.getPassport().initialize());
  app.use(aut.getPassport().session());
  app.get('/complete', (req, res) => {
    res.send('Acces token is set correctly');
  });
  app.get(`/auth/${servicesAuth[index].name}`, aut.getPassport().authenticate(aut.getAuthenticateKey(), aut.getAuthenticateScope()), (req, res) => {});
  app.get('/authorize', aut.getPassport().authenticate(aut.getAuthenticateKey(), {failureRedirect: '/error'}), (req, res) => {
    res.redirect('/complete');
  });
});

server.listen(process.env.PORT || 3000);

console.log('Server started');
