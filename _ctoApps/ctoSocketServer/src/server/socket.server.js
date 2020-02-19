import Exists from "../helper/exists";
import SocketPool from "./socket.pool";

export default function SocketServer(server) {
    Exists(server);

    var socketPools = []; // Namespaces = Groups
    var names = [];
    var socket = require('socket.io');
    var io = socket.listen(server, {'pingInterval': 2000, 'pingTimeout': 5000});
    //io.set("transports", ["websocket"]);

    io.on('connection', function (socket) {
        socket.emit('news', { hello: 'world' });
        socket.on('test', function (data) { console.log(data); });
        socketRooms(socket);
    });

    this.listenForRooms = socketRooms;
    function socketRooms(socket) {
        socket.on('g.names', (msg) => {
            sendPools(socket);
        });
    }

    this.sendPools = sendPools;
    function sendPools(socket) {
        let array = [];
        for (let pool of getPools()) {
            let obj = { name: pool.get().name, status: pool.get().status, jobName: pool.get().jobName};
            array.push(obj);
        }
        socket.emit('r.names', { namespaces: array } );
    }

    this.sendAllPools = sendAllPools;
    function sendAllPools(jobName) {
        let array = [];
        for (let pool of getPools()) {
            let obj = { name: pool.get().name, status: pool.get().status, jobName: pool.get().jobName};
            array.push(obj);
        }

        for (let pool of getPools()) {
            pool.sendAll('r.names', { namespaces: array } );
            pool.sendAll('message', 'A new job with name ' + jobName + ' is available');
        }
    }

    this.createConnection = function(namespace) {
        var nsp = io.of('/' + namespace);
        socketPools.push(new SocketPool(nsp, this));
        names.push(nsp.name);
        console.log('There are ' + socketPools.length + ' pool sockets');
    };

    this.getNamespaces = function() {
        return Array.from(names);
    };

    this.getPools = getPools;
    function getPools() {
        return Array.from(socketPools);
    }

    this.sendAll = function(message) {
        io.sockets.emit('message', 'An event sent to all connected clients');
        io.emit('message', { news: message });
    };

}