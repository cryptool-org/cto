import DataObj from './data.obj';
import Database from './pouch.db';

export const JobStatus = {
    OPEN: 'open',
    CLOSE: 'close',
    PROCESS: 'process'
};

export function Temp() {
    this.keys = [];
}

export function Job() {

    this.name = 'none';
    this.ctxt = '';
    this.datas = [];
    this.tmpObj = new Temp();

    this.addData = function(obj) {
        var data = new DataObj();
        data.init(obj);
        this.datas.push(data);
        //console.log(data);
    };

    this.addDatas = function(array = []) {
        var bool = false;
        for (let obj of array) {
          for (let dat of this.datas) {
              if (dat.key === obj.key) {
                  bool = true;
                  break;
              }
          }
          if (!bool) {
              this.addData(obj);
          } else {
              bool = false;
          }
        }
    };

    this.removeData = function(id) {
        for (let k = 0; k < this.datas.length; k++) {
            if (id === this.datas[k]._id) {
                this.datas.splice(k, 1);
                break;
            }
        }
    };

    this.getDatas = function() {
        return this.datas;
    };

    this.cutSortDatas = function(len) {
        return this.sortDatas().slice(0, len);
    };

    this.sortDatas = function() {
        this.datas.sort(function(a, b) {
            return b.calc - a.calc;
        });
        return this.datas;
    };

    this.clear = function() {
        if (this.tmpObj != null) {
            this.tmpObj.keys = [];
            this.tmpObj = null;
        }
    }
}

export default function JobQueue() {
    var dbase = new Database();
    dbase.createWorkerDB('cto');

    var openJobs = [];
    var closedJobs = [];

    this.createJob = function(id = Date.now(), arrayData = null) {
        let job = new Job();
        job._id = id.toString();
        job.date = new Date().toJSON();
        if (arrayData !== null) {
            job.datas = arrayData;
        }
        job.status = JobStatus.OPEN;
        openJobs.push(job);

        return job;
    };

    this.addJob = function(obj) {
        for (let k = 0; k < openJobs.length; k++) {
            if (openJobs[k]._id === obj._id) {
                return false;
            }
        }

        let job = new Job();
        job._id = obj._id;
        job.name = obj.name;
        job.ctxt = obj.ctxt;
        job.date = obj.date;
        job.status = obj.status;
        openJobs.push(job);
        return job;
    };

    this.setJobStatus = function(id, value = JobStatus.CLOSE) {
        for (let k = 0; k < openJobs.length; k++) {
            if (openJobs[k]._id === id) {
                openJobs[k].status = value;
                break;
            }
        }
    };

    this.moveJob = moveJob;
    function moveJob(id) {
        for (let k = 0; k < openJobs.length; k++) {
            let job = openJobs[k];
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
        for (let k = 0; k < openJobs.length; k++) {
            if (openJobs[k]._id === id) {
                return openJobs[k];
            }
        }
    }

    this.updateJob = function(id, key, value) {
        if (id === 'id') { return false; }
        let job = getJob(id);
        job[key] = value;
        return true;
    };

    this.storeJob = function(id) {
        let job = getJob(id);
        if (job.status === JobStatus.PROCESS) {
            setTimeout( () => {
                console.log('wait');
                this.storeJob(id);
            }, 200);
        }
        job.status = JobStatus.PROCESS;
        let prom = dbase.getObjPromise(job._id);
        prom.then(function (doc) {
            console.log('update');
            dbase.updateObject(doc._id, job);
        }).catch(function (error) {
            console.log(error);
            dbase.storeBulk([job]);
        });
        job.status = JobStatus.OPEN;
        console.log(job);
        //moveJob(job);
    };

    this.clearCache = function() {
        closedJobs = [];
    }

}
