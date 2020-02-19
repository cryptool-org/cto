'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.JobStatus = undefined;
exports.Job = Job;
exports.default = JobQueue;

var _data = require('./data.obj');

var _data2 = _interopRequireDefault(_data);

var _pouch = require('./pouch.db');

var _pouch2 = _interopRequireDefault(_pouch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var JobStatus = exports.JobStatus = {
    OPEN: 'open',
    CLOSE: 'close',
    PROCESS: 'process'
};

function Job() {

    this.name = 'none';
    this.ctxt = '';
    this.datas = [];

    this.addData = function (obj) {
        var data = new _data2.default();
        data.init(obj);
        this.datas.push(data);
        //console.log(datas);
    };

    this.addDatas = function () {
        var array = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

        var bool = false;
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = array[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var obj = _step.value;
                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {
                    for (var _iterator2 = this.datas[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                        var dat = _step2.value;

                        if (dat.key === obj.key) {
                            bool = true;
                            break;
                        }
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

                if (!bool) {
                    this.addData(obj);
                } else {
                    bool = false;
                }
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
    };

    this.getDatas = function () {
        return this.datas;
    };
}

function JobQueue() {
    var dbase = new _pouch2.default();
    //dbase.createDB('https://ccad78e5-44d7-4cb1-90c8-d7755399b83d-bluemix:a3c0768923110f30af9f12f16d06452921b74767b77b85ba1b64db497bc45985@ccad78e5-44d7-4cb1-90c8-d7755399b83d-bluemix.cloudant.com/cto');
    dbase.createDB('cto');

    var openJobs = [];
    var closedJobs = [];

    this.createJob = function () {
        var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Date.now();
        var arrayData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

        var job = new Job();
        //console.log(job);
        job._id = id.toString();
        job.date = new Date().toJSON();
        if (arrayData !== null) {
            job.datas = arrayData;
        }
        job.status = JobStatus.OPEN;
        openJobs.push(job);

        return job;
    };

    this.addJob = function (obj) {
        for (var k = 0; k < openJobs.length; k++) {
            if (openJobs[k]._id === obj._id) {
                return false;
            }
        }

        var job = new Job();
        job._id = obj._id;
        job.name = obj.name;
        job.ctxt = obj.ctxt;
        job.date = obj.date;
        job.status = obj.status;
        openJobs.push(job);
        return job;
    };

    this.setJobStatus = function (id) {
        var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : JobStatus.CLOSE;

        for (var k = 0; k < openJobs.length; k++) {
            if (openJobs[k]._id === id) {
                openJobs[k].status = value;
                break;
            }
        }
    };

    this.moveJob = moveJob;
    function moveJob(id) {
        for (var k = 0; k < openJobs.length; k++) {
            var job = openJobs[k];
            if (job._id === id) {
                openJobs.splice(k, 1);
                job.status = JobStatus.CLOSE;
                closedJobs.push(jobs);
                break;
            }
        }
    }

    this.getJob = getJob;
    function getJob(id) {
        for (var k = 0; k < openJobs.length; k++) {
            if (openJobs[k]._id === id) {
                return openJobs[k];
            }
        }
        return null;
    }

    this.updateJob = function (id, key, value) {
        if (id === 'id') {
            return false;
        }
        var job = getJob(id);
        if (job.status !== JobStatus.OPEN) {
            return false;
        }
        job[key] = value;
        return true;
    };

    this.storeJob = function (id) {
        var job = getJob(id);
        job.status = JobStatus.PROCESS;
        var prom = dbase.getObjPromise(job._id);
        prom.then(function (doc) {
            console.log('update');
            dbase.updateObject(doc._id, job);
        }).catch(function (error) {
            console.log(error);
            dbase.storeObject(job);
        });
        job.status = JobStatus.OPEN;
        //moveJob(job);
    };

    this.clearCache = function () {
        closedJobs = [];
    };
}
//export {JobStatus, JobQueue};