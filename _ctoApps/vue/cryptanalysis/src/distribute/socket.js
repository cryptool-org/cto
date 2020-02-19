import io from 'socket.io-client';

export default function Socket(url, nsp = '/', control) {

    this.room = nsp;
    var manager;
    var uri = url.url + url.path;
    var socket;
    var namespaces = [];
    var self = this;
    connect();
    connectSocket(nsp);

    function connect() {
        manager = io.connect(url.url, {path: url.path + '/socket.io'});
        //manager = io.connect('http://localhost:50000');
    }

    function connectSocket(nsp) {
        console.log(manager);
        if (nsp === '') {
            socket = manager.open();
        } else {
            socket = manager.io.socket(nsp, {});
        }
        socket.on('connect', function () {
            console.log(socket);
            socket.emit('g.names');
            socket.on('r.names', (obj) => { refreshNamespaces(obj.namespaces); });

            socket.on('job.define', (obj) => { control.define(obj) });
            socket.on('job.complete', (obj) => {
                control.complete(obj);
                socket.emit('g.names');
            });

            socket.on('compute', function (obj) {
                if (obj.cmd === 'withServer' || obj.cmd === 'distribute') {
                    control.compute(obj);
                }
            });

            socket.on('result', (obj) => {
                control.updateResult(obj);
                socket.emit('g.names');
            });

            socket.on('connected.clients', (obj) => {
                document.getElementById('connectClients').innerHTML = obj;
                socket.emit('g.names');
            });

            socket.on('bing', () => { socket.emit('bong'); });
            socket.on('message', (message) => { createMessageElement(message); });
            socket.on('fail', (message) => { createMessageElement(message); });
            socket.on('exit', (message) => { self.close(); });
        });
    }

    function refreshNamespaces(nsps) {
        nsps.forEach(function (obj) {
            addNamespaces(obj);
        });
    }

    function addNamespaces(obj) {
        for (let room of namespaces) {
            if (room.name.includes(obj.name)) {
                room.status = obj.status;
                room.jobName = obj.jobName;
                return false;
            }
        }
        namespaces.push(obj);
        return true;
    }

    this.send = function (messageName, obj) {
        if (messageName != '') {
            socket.emit(messageName, obj);
        }
    };

    this.switch = function (nsp) {
        for (let room of namespaces) {
            if (room.name === nsp && room.status !== 'compute') {
                socket.emit('exit');
                //console.debug(nsp);
                //this.close();
                connect();
                connectSocket(nsp);
                return true;
            }
        }
        return false;
    };

    this.gRooms = function() {
        return namespaces;
    };

    this.close = function() {
        socket.emit('exit');
        namespaces = [];
        socket.disconnect();
    };

    this.id = function () {
        return socket.id;
    };

    this.address = function () {
        return socket.localAddress;
    };

    function createMessageElement(message) {
        console.log(message);
        let count = document.getElementById('messages').getElementsByTagName('li').length+1;
        var messageNode = document.createTextNode(count + '. ' + message), messageElement = document.createElement('li');
        messageElement.appendChild(messageNode);
        document.getElementById('messages').appendChild(messageElement);
    }
}