import AESMaster from "./aes.master";

export default function WorkerPool(worker = 1) {

    var workerCount = worker;
    var threads = [];

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
        for (let k = 0; k < workerCount; k++) {
            threads.push(new AESMaster());
        }
    };

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
        threads = [];
    }

    this.getComputedKeysCount = function() {
        let sum = 0, max = 0;
        for (let k = 0; k < threads.length; k++) {
            sum += threads[k].getComputedKeysCount()[0];
            max += threads[k].getComputedKeysCount()[1];
        }
        return [sum, max];
    };

    this.start = function(obj, control, jQueue) {
        obj.workerRange = getWorkerRange(obj.keyRange, workerCount);
        let nobj = cloneObject(obj, workerCount);
        nobj = calcBegin(nobj, obj.alpha, workerCount);

        for (let k = 0; k < workerCount; k++) {
            threads[k].sendData(nobj[k], control, jQueue);
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