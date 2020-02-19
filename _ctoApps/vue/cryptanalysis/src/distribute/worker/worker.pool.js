import AESMaster from "./aes.slave";
import KeyGenSlave from "./keygen.slave";

export default function WorkerPool(worker = 1) {

    var workerCount = worker;
    var threads = [];
    var keyThreads = [];
    this.keys = [];

    this.changeCount = function(value) {
        if (value < 2) {
            workerCount = 1;
        } else {
            workerCount = value;
        }
    };

    this.changeWorkerSize = change;
    function change(count) {
        if (count == threads.length) {
            workerCount = count;
            changeKeyThreads();
            return;
        }
        if (count > threads.length) {
            threads.push(new AESMaster());
        } else {
            let thread = threads.pop();
            console.log(thread);
            thread.kill();
        }
        console.log('tl ' + threads.length);
        change(count);
    }

    this.create = function() {
        killThreads();
        createKeyThreads();
        for (let k = 0; k < workerCount; k++) {
            threads.push(new AESMaster());
        }
    };

    function createKeyThreads() {
        for (let k = 0; k < getOptKeyWorkerSize(); k++) {
            keyThreads.push(new KeyGenSlave());
        }
    }

    function getOptKeyWorkerSize() {
        let keyWorker = 1;
        if (workerCount > 15) {
            keyWorker = 16;
        } else if (workerCount > 7) {
            keyWorker = 8;
        } else if (workerCount > 3) {
            keyWorker = 4;
        } else if (workerCount > 1) {
            keyWorker = 2;
        }/*
        let keyWorker = 16;
        if (workerCount < 2) {
            keyWorker = 1;
        } else if (workerCount < 4) {
            keyWorker = 2;
        } else if (workerCount < 8) {
            keyWorker = 4;
        } else if (workerCount < 16) {
            keyWorker = 8;
        }*/
        return keyWorker;
    }

    function changeKeyThreads() {
        let keyWorker = getOptKeyWorkerSize();

        if (keyWorker >= keyThreads.length) {
            keyWorker = keyWorker - keyThreads.length;
            for (let k = 0; k < keyWorker; k++) {
                keyThreads.push(new KeyGenSlave());
            }
        } else if (keyWorker < keyThreads.length) {
            keyWorker = keyThreads.length - keyWorker;
            for (let k = 0; k < keyWorker; k++) {
                let thread = keyThreads.pop();
                thread.kill();
            }
        }
    }

    this.manDecryptText = function(obj, callFunction) {
        console.log(callFunction);
        if (threads.length < 0) { this.create(); }
        threads[0].decryptText(obj, callFunction);
    };

    this.stop = function() {
        //killThreads();
        this.create();
    };

    function killThreads() {
        for (let k = 0; k < threads.length; k++) {
            threads[k].kill();
        }
        for (let k = 0; k < keyThreads.length; k++) {
            keyThreads[k].kill();
        }
        threads = [];
        keyThreads = [];
    }

    this.getComputedKeysCount = function() {
        let sum = 0, max = 0;
        for (let k = 0; k < threads.length; k++) {
            sum += threads[k].getComputedKeysCount()[0];
            //max += threads[k].getComputedKeysCount()[1];
        }

        for (let k = 0; k < keyThreads.length; k++) {
            max += keyThreads[k].getKeysCount();
        }
        return [sum, max];
    };

    var run = false;
    this.start = function(obj, control, jQueue) {
        run = false;
        let keyWorkerSize = getOptKeyWorkerSize();
        obj.workerRange = getWorkerRange(obj.keyRange, keyWorkerSize);
        let nobj = cloneObject(obj, keyWorkerSize);
        nobj = calcBegin(nobj, obj.alpha, keyWorkerSize);

        for (let k = 0; k < workerCount; k++) {
            threads[k].sendData(nobj[0], control);
        }

        for (let k = 0; k < keyThreads.length; k++) {
            keyThreads[k].sendData(nobj[k], control);
        }
    };

    this.force = function() {
        if (run) { return; }
        run = true;

        for (let k = 0; k < workerCount; k++) {
            threads[k].bruteForce();
        }
    };

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

    function getWorkerRange(keyRange, workerCount) {
        var range = keyRange/workerCount;
        if (keyRange % workerCount !== 0) {
            range =  parseInt(range) + 1;
        }
        return range;
    }

    function cloneObject(obj, count = 1) {
        let clones = [];
        let cloneNr = 1;
        do {
            let newObj = {};
            for (let value in obj) {
                newObj[value] = obj[value];
            }
            newObj.cloneNumber = cloneNr;
            if (typeof newObj.begin === 'undefined') {
                newObj.begin = '';
            }
            clones.push(newObj);
            cloneNr++;
        } while (cloneNr <= count);
        console.log(clones);
        return clones;
    }
}