'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = Server;
function Server(hostname, port) {
    var http = require('http');

    var server = http.createServer(function (req, res) {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Welcome\n');
    });

    server.listen(port, hostname, function () {
        console.log('Server running at http://' + hostname + ':' + port + '/');
    });

    return server;
}