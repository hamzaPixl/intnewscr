const server = require('http').createServer();
const io = require('socket.io')(server);
const Controller = require('./core/controllers/Controller');
const controller = new Controller();


io.on('connection', function(client) {

    client.on('request', function(requestClient) {
        controller.request(requestClient).then(function(data) {
            client.emit('response', { 'data': data, 'name': requestClient.name });
        }, function(err) {
            console.log(err);
        });
    });

    client.on('disconnect', function() {});

});

server.listen(3000);
console.log('Server started');