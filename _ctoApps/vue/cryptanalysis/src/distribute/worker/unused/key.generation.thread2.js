import Threads from 'threads';

export default function KeyGenerationThread() {
    const spawn = Threads.spawn;

    this.thread = spawn(function (obj, done, progress) {
        console.log('Hi, i am worker number: ' + obj.cloneNumber);
        let cal = calc(obj.alpha, obj.keyRange, obj.workerRange, obj.number, obj.cloneNumber);

        obj.keyValue = obj.keyValue.replace(/\s/g, '');
        let arr = [];
        for (let k = cal.start; k < cal.end; k++) {
            arr.push(obj.alpha[k]);
        }

        let n = 0, indexes = [];
        for (let k = 0; k < obj.keyValue.length; k++) {
            if (obj.keyValue[k].indexOf('*') > -1) {
                indexes.push(k);
                n++;
            }
        }
        //console.log(indexes);

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

        function generateKeys(arr, alpha, keyValue) {
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
            let tmpKeys = Array.from(keys);

            for (let k = 0; k < indexes.length-1; k++) {
            //if (indexes.length > 1) {
                let ind = indexes[k];
                [].map.call(alpha, function (val) {
                    let keyss = keys;//tmpKeys[n];
                    keyss.forEach(function (key) {
                        if (key[ind] !== val) {
                            key = buildKey(key, val, ind);
                            if (!keys.has(key)) {
                                if (k+1 != n-1) {
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

        var arrText = generateKeys(arr, obj.alpha, obj.keyValue);

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

        done(arrText);
    });

    this.kill = function() {
        this.thread.kill();
    }
}
