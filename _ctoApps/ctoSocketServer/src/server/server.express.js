
export default function Server(hostname, port) {
    var express = require('express');
    var app = express();
    const http = require('http');

    var path = require('path');
    app.use('/crypt', express.static(path.join(__dirname, '/lib')));
    app.use('/crypt', express.static(path.join(__dirname, '/model')));

    var server = http.createServer(app, (req, res) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Welcome\n');
    });

    server.listen(port, hostname, () => {
        console.log(`Server running at http://${hostname}:${port}/`);
    });

    var options = {
        root: __dirname + '/public/',
        dotfiles: 'deny',
        headers: {
            'x-timestamp': Date.now(),
            'x-sent': true
        }
    };

    app.get('/', function (req, res) {
        res.type('html');
        res.sendFile('index.html', options, function (err) {
            if (err) {
                console.log(err);
                res.status(err.status).end();
            }
            else {
                console.log('Sent:', 'index');
            }
        });
    });

    app.get('/chat', function (req, res) {
        res.sendfile('public/chat.html');
    });

    app.get('/test', function (req, res) {
        res.sendFile('test.html', options);
    });

    app.get('/crypt', function (req, res) {
        res.sendFile('crypt.html', options);
    });

    return server;
}

