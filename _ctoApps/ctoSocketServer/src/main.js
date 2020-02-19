import Server from "./server/server";
import SocketServer from "./server/socket.server";
var config = require('../server.config.json');

var server = new Server(config.server.hostname, config.server.port);
var socket = new SocketServer(server);
/*socket.createConnection('root');
socket.createConnection('crypt01');
socket.createConnection('crypt02');
socket.createConnection('crypt03');*/
//socket.sendAll('Hello');
for (let k = 1; k < 10; k++) {
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

