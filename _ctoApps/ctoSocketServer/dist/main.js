"use strict";

var _server = require("./server/server");

var _server2 = _interopRequireDefault(_server);

var _socket = require("./server/socket.server");

var _socket2 = _interopRequireDefault(_socket);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var config = require('../server.config.json');

var server = new _server2.default(config.server.hostname, config.server.port);
var socket = new _socket2.default(server);
/*socket.createConnection('root');
socket.createConnection('crypt01');
socket.createConnection('crypt02');
socket.createConnection('crypt03');*/
//socket.sendAll('Hello');
for (var k = 1; k < 10; k++) {
    socket.createConnection('crypt' + k);
}
/*
var server2 = require('http').createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World\n');
});

port = 5001;
server2.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

var server3 = require('http').createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello\n');
});

port = 5002;
server3.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
*/