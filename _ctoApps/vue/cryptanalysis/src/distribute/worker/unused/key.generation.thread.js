import Threads from 'threads';

export default function KeyGenerationThread() {
    const spawn = Threads.spawn;

    this.thread = spawn(function (obj, done, progress) {
        console.log('Hi, i am worker number: ' + obj.cloneNumber);
        let cal = calc(obj.alpha, obj.keyRange, obj.workerRange, obj.number, obj.cloneNumber);

        /*
        let n = 0;
        for (let k = 0; k < obj.keyValue.length; k++) {
            if (obj.keyValue[k].indexOf('*') > -1) {
                n++;
            }
        }
        */

        let arr = [];
        for (let k = cal.start; k < cal.end; k++) {
            arr.push(obj.alpha[k]);
        }
        //console.log(arr);

        var finishKeys = [];
        var arrText;
        if (obj.alpha.length !== arr.length) {
            arrText = generateN(arr, obj.alpha, obj.keyValue, cal.start, cal.end);
        } else {
            arrText = generate(arr, obj.keyValue, cal.start, cal.end);
        }

        function isfinish(key) {
            if (key.indexOf('*') !== -1)  {
                return false;
            }
            finishKeys.push(key);
            if (finishKeys.length > 204) {
                //console.debug(finishKeys);
                progress(finishKeys);
                finishKeys = [];
            }
            return true;
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

        function generateN(list, rev, input, start, end) {
            var perm = [].map.call(list, function(val) {
                return [val];
            });
            var sec = [].map.call(rev, function(val) {
                return [val];
            });

            console.log('start n key generation');
            input = input.replace(/\s/g, '');
            var arr = [input];
            console.log(arr);

            do {
                for (let k = 0; k < arr.length; k++) {
                    let str = arr[k];
                    var ind = str.lastIndexOf('*');
                    if (ind > -1) {
                        if (ind !== str.indexOf('*')) {
                            arr.splice(k, 1);
                            sec.forEach(function (val) {
                                var first = str.substring(0, ind);
                                var secon = str.substring(ind+1, str.length);
                                arr.push(first.concat(val, secon));
                                //console.log(first.concat(val, secon));
                            });
                        } else if (ind === str.indexOf('*')) {
                            arr.splice(k, 1);
                            //console.log(k);
                            perm.forEach(function (val) {
                                var first = str.substring(0, ind);
                                var secon = str.substring(ind + 1, str.length);
                                arr.push(first.concat(val, secon));
                                //console.log(arr.length);
                            });
                        }
                        k = 0;
                    } else {
                        if (isfinish(str)) {
                            arr.splice(k, 1);
                            k = 0;
                        }
                    }
                }
                if (arr.length > 0) {
                    ind = arr[0].indexOf('*');
                }
            } while (ind > -1);
            console.log('end n key generation');

            finishKeys.push(arr[0]);
            return finishKeys;
        }

        function generate(list, input, start, end) {
            var perm = [].map.call(list, function(val) {
                return [val];
            });

            console.log('start key generation');
            input = input.replace(/\s/g, '');
            var arr = [input];
            console.log(arr);

            do {
                for (let k = 0; k < arr.length; k++) {
                    let str = arr[k];
                    var ind = str.indexOf('*');
                    if (ind > -1) {
                        arr.splice(k, 1);
                        //console.log(k);
                        perm.forEach(function (val) {
                            var first = str.substring(0, ind);
                            var secon = str.substring(ind+1, str.length);
                            arr.push(first.concat(val, secon));
                            //console.log(arr.length);
                        });
                        k = 0;
                    } else {
                        if (isfinish(str)) {
                            arr.splice(k, 1);
                            k = 0;
                        }
                    }
                }
                if (arr.length > 0) {
                    ind = arr[0].indexOf('*');
                }
            } while (ind > -1);
            console.log('end key generation');

            finishKeys.push(arr[0]);
            return finishKeys;
        }

        done(arrText);
    });

    this.kill = function() {
        this.thread.kill();
    }
}
