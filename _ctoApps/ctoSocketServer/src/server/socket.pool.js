import JobQueue from '../db/job.queue';

export default function SocketPool(nsp, server) {

    const SOCKET_EVENT_MESSAGE = 'message';
    const SOCKET_EVENT_FAIL = 'fail';
    const SOCKET_EVENT_RESULT = 'result';
    const SOCKET_EVENT_RESULT_DISTRIBUTE = 'result.distribute';
    const SOCKET_EVENT_COMPUTE = 'compute';
    const SOCKET_EVENT_CLOSE = 'close';
    const MESSAGE_CLIENT_CONNECT = 'A new client is connected with group ';
    const MESSAGE_CLIENT_CLOSE = 'A client is disconnected of group ';
    const MESSAGE_WELCOME = 'Hello, you are connect with group ';
    const MESSAGE_BYE = 'Ciao, you are disconnect with group ';
    const MESSAGE_NOT_FREE = 'Sorry, this room is not free, now!';
    const MESSAGE_FAIL_SID = 'The data sid is not equal your socket id!';
    const MESSAGE_FAIL_JID = 'Job id not found!';
    const STATUS_DEFINED = 'defined';
    const STATUS_FREE = 'free';
    const STATUS_COMPUTE = 'free';

    const name = nsp.name;
    var jQueue = new JobQueue();
    var currentJob = '';
    var sockets = [], pings = [];
    var status = STATUS_FREE;
    var resultCount = 0;
    var distributeNumbers = 0;

    this.getName = function() {
        return name;
    };

    this.getStatus = function () {
        return status;
    };

    this.get = function () {
        return {
            name: name,
            status: status,
            jobName: currentJob.name,
            sockets: sockets,
        }
    };

    function addSocket(socket) {
        sockets.push(socket);
        sendCount();
    }

    function removeSocket(socket) {
        //console.log(socket);
        for (var i = 0; i < sockets.length; i++) {
            if (sockets[i].id === socket.id) {
                sockets.splice(i, 1);
            }
        }
        sendAll(SOCKET_EVENT_MESSAGE, MESSAGE_CLIENT_CLOSE + name);
        sendCount();
    }

    function sendCount() {
        for (let socket of sockets) {
            socket.emit('connected.clients', sockets.length );
        }
    }

    this.sendAll = sendAll;
    function sendAll(header, message) {
        for (let socket of sockets) {
            socket.emit(header, message);
        }
    }

    nsp.on('connection', function (socket) {
        /*if (sockets.length > 16) {
            socket.send(MESSAGE_NOT_FREE);
            socket.emit('exit');
            return;
        }*/
        sendAll(SOCKET_EVENT_MESSAGE, MESSAGE_CLIENT_CONNECT + name);
        socket.emit(SOCKET_EVENT_MESSAGE, MESSAGE_WELCOME + name );
        addSocket(socket);
        //console.log(socket);
        server.listenForRooms(socket);

        connectLog(true);

        socket.on(SOCKET_EVENT_MESSAGE, (msg) => broadcast(msg));
        socket.on('abort', (obj) => {
            if (!checkSocketId(socket, obj.sid)) { return; }
            if (currentJob._id !== obj.job._id) { return; }

            distributeNumbers--;
            if (distributeNumbers === 0) {
                status = STATUS_FREE;
            }
        });
        socket.on(SOCKET_EVENT_RESULT, (obj) => {
            if (!checkSocketId(socket, obj.sid)) { return; }
            //socket.emit('result', {sid: socket.id, datas: datas});
            //console.log(obj);
            let job = jQueue.getJob(obj.job._id);
            obj.datas.forEach( obj => {
                job.addData(obj);
            });
            jQueue.storeJob(job._id);
            status = STATUS_FREE;
            socket.send('Thank you, for your result!');
        });

        socket.on(SOCKET_EVENT_RESULT_DISTRIBUTE, (obj) => {
            if (!checkSocketId(socket, obj.sid)) { return; }
            //if (status !== 'compute') { return; }

            console.log(SOCKET_EVENT_RESULT_DISTRIBUTE);
            //socket.emit('result', {sid: socket.id, datas: datas});
            ++resultCount;
            let job = jQueue.getJob(obj.job._id);
            if (typeof job === 'undefined' || job === null) {
                job = jQueue.addJob(obj.job);
            }
            job.addDatas(obj.datas);
            /*obj.datas.forEach( obj => {
                job.addData(obj);
            });*/
            //console.log(job);
            if (resultCount >= distributeNumbers) {
                console.log(resultCount);
                jQueue.storeJob(job._id);
                status = STATUS_FREE;
                resultCount = 0;
                currentJob = '';
                console.log(status);
                //nsp.emit('result', {sid: socket.id, job: job, datas: job.getDatas(), endTime: new Date().toLocaleTimeString('en-GB')});
                //nsp.emit('job.define', { is: false });
                sendAll('job.complete', {
                    sid: socket.id, job: job, datas: job.getDatas(),
                    endTime: new Date().toLocaleTimeString('en-GB'),
                    deliverCount: distributeNumbers
                });
                sendAll(SOCKET_EVENT_MESSAGE, 'The job ' + job.name + ' is finished');
            } else {
                socket.emit(SOCKET_EVENT_RESULT, {sid: socket.id, job: job, datas: job.getDatas(), deliverCount: resultCount });
            }
        });

        socket.on('result.get', (obj) => {
            if (!checkSocketId(socket, obj.sid)) {return; }
            if (status !== STATUS_COMPUTE) { return; }
            let job = jQueue.getJob(obj.jobId);
            socket.emit(SOCKET_EVENT_RESULT, {sid: socket.id, job: job, datas: job.getDatas() });
        });

        socket.on('job.create', (obj) => {
            if (!checkSocketId(socket, obj.sid)) { return; }

            let job = jQueue.createJob();
            job.name = obj.name;
            job.ctxt = obj.codtxt;
            job.mode = obj.mode;
            job.keyValue = obj.keyValue;
            job.maxComputeLen = obj.maxComputeLen;
            //socket.emit(SOCKET_EVENT_MESSAGE, 'The job with name ' + job.name + ' is created');
            socket.emit('job.define', { job: job, is: true });

            currentJob = job;

            status = STATUS_DEFINED;
            /*
            for (let socket of sockets) {
                server.sendPools(socket);
            }*/
            sendAll('bing', {});
            server.sendAllPools(job.name);
        });

        socket.on(SOCKET_EVENT_COMPUTE, (obj) => {
            if (!checkSocketId(socket, obj.sid)) { return; }

            if (!isStatusFree() || name.includes('/root')) {
                socket.send(MESSAGE_NOT_FREE);
                return;
            }
            sendAll('bing', {});

            let job = jQueue.getJob(obj.job._id);
            if (job === null) {
                socket.emit(SOCKET_EVENT_FAIL, MESSAGE_FAIL_JID);
                return;
            }
            //job.name = obj.name;
            //job.ctxt = obj.codtxt;

            if (obj.cmd === 'distribute') {
                /*if (pings.length < socket.length) {
                    sendAll('bing', '');
                    for (let socket of sockets) {
                        if (!pings.includes(socket)) {
                            removeSocket(socket);
                        }
                    }
                }*/
                //if (pings.length === socket.length) {

                    status = STATUS_COMPUTE;

                    var alpha = '0123456789ABCDEF';
                    distribute(job, alpha, obj.job);
                //}
            } /*else if (obj.cmd === 'withServer') {
                let keyRange = getKeyRange(alpha, 1, 1);
                socket.emit('compute', {cmd: 'withServer', job: job, ctxt: obj.ctxt, keyRange: keyRange, number: 2, alpha: alpha});
                var arrayText = crypto.bruteForce(alpha, obj.ctxt, keyRange);
                arrayText.forEach(element => {
                    obj.sid = socket.id;
                    obj.from = socket.conn.remoteAddress;
                    obj.key = element.key;
                    obj.otxt = element.text;
                    obj.alpha = alpha;
                    obj.date = new Date().toJSON();
                    job.addData(obj);
                });
                jQueue.storeJob(job._id);
                socket.emit('result', {sid: socket.id, job: job, datas: job.getDatas()});
            }*/
        });
        socket.on('bong', function () {
            console.log('bong');
            if (!pings.includes(socket)) {
               // pings.push(socket);
            }
        });
        socket.on('exit', function () {
            removeSocket(socket);
            //status = 'free';
            socket.emit(SOCKET_EVENT_MESSAGE, MESSAGE_BYE + name );
            connectLog(false);
        });

        socket.on('disconnect', function () {
            removeSocket(socket);
            //status = 'free';
            //broadcast('socket disconnected');
            connectLog(false);
        });
    });

    function connectLog(isConnected) {
        if (isConnected) {
            console.log('The socket connected. There are ' + sockets.length + ' connected sockets in '  + name );
        } else {
            console.log('The socket disconnected. There are ' + sockets.length + ' connected sockets in '  + name );
        }
    }

    this.broadcast = broadcast;
    function broadcast(message) {
        nsp.emit(SOCKET_EVENT_MESSAGE, message);
    }

    function sendTo(socket, eventString, message) {
        socket.emit(eventString, message);
    }

    function checkSocketId(socket, sid) {
        if (!socket.id.includes(sid)) {
            socket.emit(SOCKET_EVENT_FAIL, MESSAGE_FAIL_SID);
            return false;
        }
        return true;
    }

    function objectToByte(obj) {
        var bytes = [];
        for (let key in obj) {
            for (let k = 0; k < key.length; k++) {
                bytes.push(key.charCodeAt(k));
            }
        }
        console.log(bytes);
        console.log(bytes.length);
    }

    function getKeyRange(alpha, clientCount, serverCount = 0) {
        var keyRange = alpha.length/(clientCount + serverCount);
        if (alpha.length % (clientCount + serverCount) !== 0) {
            keyRange = keyRange + 1;
        }
        return keyRange;
    }

    function getKeyRange2(alpha, clientCount, serverCount = 0) {
        let clients = [];
        var keyRange = alpha.length/(clientCount + serverCount);
        if (alpha.length % (clientCount + serverCount) !== 0) {
            keyRange = parseInt(keyRange);
        }
        let total = 0;
        for (let k = 0; k < clientCount; k++) {
            let obj = {};
            obj.keyRange = keyRange;
            total += keyRange;
            clients.push(obj);
        }
        let idx = 0;
        console.log(clients);
        while (alpha.length !== total) {
            clients[idx].keyRange += 1;
            total = 0;
            for (let client of clients) {
                total += client.keyRange;
            }
            idx++;
        }
        return clients;
    }

    function distribute(job, alpha, cObj) {
        var keyRangeClients = getKeyRange2(alpha, sockets.length);
        let obj = {cmd: 'distribute', job: job, mode: cObj.mode, begin: '',
            keyValue: cObj.keyValue, maxComputeLen: cObj.maxComputeLen, keyRange: 0, number: 0, alpha: alpha};
        let nObj = cloneObject(obj, sockets.length);
        nObj = calcBegin(nObj, alpha, sockets.length);

        for (let k = 0; k < sockets.length; k++) {
            nObj[k].sid = sockets[k].id;
            nObj[k].keyRange = keyRangeClients[k].keyRange;
            sockets[k].emit(SOCKET_EVENT_COMPUTE, nObj[k]);
            sockets[k].emit(SOCKET_EVENT_MESSAGE, 'The job ' + job.name + ' is started');
        }
        distributeNumbers = sockets.length;
    }

    function cloneObject(obj, count = 1) {
        let clones = [];
        let cloneNr = 1;
        do {
            let newObj = {};
            for (let value in obj) {
                newObj[value] = obj[value];
            }
            newObj.number = cloneNr;
            clones.push(newObj);
            cloneNr++;
        } while (cloneNr <= count);
        console.log(clones);
        return clones;
    }

    function calcBegin(objs, alpha, count = 1) {
        if (alpha.length < count) {
            var range = parseInt(count / alpha.length);
            do {
                let number = count / (2 * range);
                let idx = 0;
                for (let n = 0; n < parseInt(number); n++) {
                    for (let k = 0; k < alpha.length; k++) {
                        for (let l = 0; l < range; l++) {
                            objs[idx].begin += alpha[k];
                            idx++;
                        }
                    }
                }
                range = parseInt(range / alpha.length);
            } while (range >= alpha.length);
        }
        return objs;
    }

    function isStatusFree() {
        return status !== STATUS_COMPUTE;
    }

}