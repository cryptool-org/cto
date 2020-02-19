import Threads from 'threads';

export default function KeyGenerationThread() {
    const spawn = Threads.spawn;

    this.thread = spawn(function (obj, done, progress) {
        console.log('Hi, i am worker number: ' + obj.cloneNumber);

        obj.keyValue = obj.keyValue.replace(/\s/g, '');

        let n = 0, rep = 0, indexes = [], alpha = obj.alpha;
        if (typeof obj.begin !== 'undefined' && obj.begin.length > 0) {
            console.debug(true);
            let key = obj.keyValue;
            for (let k = 0; k < key.length; k++) {
                if (key[k].indexOf('*') > -1) {
                    if (obj.begin.length > rep) {
                        obj.keyValue = buildKey(key, obj.begin[rep], k);
                        alpha = alpha.concat(obj.alpha);
                        rep++;
                    } else {
                        indexes.push(k);
                        n++;
                    }
                }
            }
        } else {
            console.debug(false);
            for (let k = 0; k < obj.keyValue.length; k++) {
                if (obj.keyValue[k].indexOf('*') > -1) {
                    indexes.push(k);
                    n++;
                }
            }
        }
        //console.debug(indexes);

        let cal = calc(alpha, obj.keyRange, obj.workerRange, obj.number, obj.cloneNumber);

        let arr = [];
        for (let k = cal.start; k < cal.end; k++) {
            arr.push(alpha[k]);
        }

        var finishKeys = [];
        function isfinish(key) {
            if (key.indexOf('*') !== -1)  {
                return false;
            }
            if (finishKeys.indexOf(key) > -1) {
                return;
            }
            finishKeys.push(key);
            if (finishKeys.length > 20768) { //16384
                //console.debug(finishKeys);
                progress(finishKeys);
                finishKeys = [];
            }
            return true;
        }

        function preGenerateKeys(arr, keyValue) {
            var keys = new Set();
            for (let k = 0; k < arr.length; k++) {
                let val = arr[k];
                let str = keyValue;
                for (let ind = 0; ind < keyValue.length; ind++) {
                    let char = keyValue[ind];
                    if (char.indexOf('*') > -1) {
                        str = buildKey(str, val, ind);
                    }
                }
                keys.add(str);
            }
            return keys;
        }

        function generateKeys(keys, alpha) {
            let tmpKeys = Array.from(keys);

            for (let k = 1; k < indexes.length; k++) {
            //if (indexes.length > 1) {
                let ind = indexes[k];
                [].map.call(alpha, function (val) {
                    let keyss = keys;//tmpKeys[n];
                    keyss.forEach(function (key) {
                        if (key[ind] !== val) {
                            key = buildKey(key, val, ind);
                            if (!keys.has(key)) {
                                if (k != n-1) {
                                    keys.add(key);
                                }
                                isfinish(key);
                            }
                        }
                    })
                });
                //n--;
            }

            return tmpKeys.concat(finishKeys);
        }

        function buildKey(str, val, index) {
            var first = str.substring(0, index);
            var secon = str.substring(index+1, str.length);
            return first.concat(val, secon);
        }

        function calc(alpha, keyRange, workerRange, number = 1, cloneNumber = 1) {
            let start = keyRange * (number-1);
            let end = keyRange * number;

            if (workerRange !== keyRange) {
                start = (keyRange * (number-1)) + (workerRange * (cloneNumber-1));
                end = (keyRange * (number-1)) + (workerRange * cloneNumber);
            }
            if (end > alpha.length) {
                end = alpha.length;
            }

            return {start: start, end: end};
        }

        let pre = preGenerateKeys(arr, obj.keyValue);
        let arrText = generateKeys(pre, alpha);

        done(arrText);
    });

    this.kill = function() {
        this.thread.kill();
    }
}
