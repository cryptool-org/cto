"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = SocketServer;

var _exists = require("../helper/exists");

var _exists2 = _interopRequireDefault(_exists);

var _socket = require("./socket.pool");

var _socket2 = _interopRequireDefault(_socket);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function SocketServer(server) {
    (0, _exists2.default)(server);

    var socketPools = []; // Namespaces = Groups
    var names = [];
    var socket = require('socket.io');
    var io = socket.listen(server, { 'pingInterval': 2000, 'pingTimeout': 5000 });
    //io.set("transports", ["websocket"]);

    io.on('connection', function (socket) {
        socket.emit('news', { hello: 'world' });
        socket.on('test', function (data) {
            console.log(data);
        });
        socketRooms(socket);
    });

    this.listenForRooms = socketRooms;
    function socketRooms(socket) {
        socket.on('g.names', function (msg) {
            sendPools(socket);
        });
    }

    this.sendPools = sendPools;
    function sendPools(socket) {
        var array = [];
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = getPools()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var pool = _step.value;

                var obj = { name: pool.get().name, status: pool.get().status, jobName: pool.get().jobName };
                array.push(obj);
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }

        socket.emit('r.names', { namespaces: array });
    }

    this.sendAllPools = sendAllPools;
    function sendAllPools(jobName) {
        var array = [];
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
            for (var _iterator2 = getPools()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var pool = _step2.value;

                var obj = { name: pool.get().name, status: pool.get().status, jobName: pool.get().jobName };
                array.push(obj);
            }
        } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                    _iterator2.return();
                }
            } finally {
                if (_didIteratorError2) {
                    throw _iteratorError2;
                }
            }
        }

        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
            for (var _iterator3 = getPools()[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                var _pool = _step3.value;

                _pool.sendAll('r.names', { namespaces: array });
                _pool.sendAll('message', 'A new job with name ' + jobName + ' is available');
            }
        } catch (err) {
            _didIteratorError3 = true;
            _iteratorError3 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion3 && _iterator3.return) {
                    _iterator3.return();
                }
            } finally {
                if (_didIteratorError3) {
                    throw _iteratorError3;
                }
            }
        }
    }

    this.createConnection = function (namespace) {
        var nsp = io.of('/' + namespace);
        socketPools.push(new _socket2.default(nsp, this));
        names.push(nsp.name);
        console.log('There are ' + socketPools.length + ' pool sockets');
    };

    this.getNamespaces = function () {
        return Array.from(names);
    };

    this.getPools = getPools;
    function getPools() {
        return Array.from(socketPools);
    }

    this.sendAll = function (message) {
        io.sockets.emit('message', 'An event sent to all connected clients');
        io.emit('message', { news: message });
    };
}