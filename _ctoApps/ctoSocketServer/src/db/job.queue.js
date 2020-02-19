import DataObj from './data.obj';
import Database from './pouch.db';

export const JobStatus = {
    OPEN: 'open',
    CLOSE: 'close',
    PROCESS: 'process'
};

export function Job() {

    this.name = 'none';
    this.ctxt = '';
    this.datas = [];

    this.addData = function(obj) {
        var data = new DataObj();
        data.init(obj);
        this.datas.push(data);
        //console.log(datas);
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

    this.getDatas = function() {
        return this.datas;
    }
}

export default function JobQueue() {
    var dbase = new Database();
    //dbase.createDB('https://ccad78e5-44d7-4cb1-90c8-d7755399b83d-bluemix:a3c0768923110f30af9f12f16d06452921b74767b77b85ba1b64db497bc45985@ccad78e5-44d7-4cb1-90c8-d7755399b83d-bluemix.cloudant.com/cto');
    dbase.createDB('cto');

    var openJobs = [];
    var closedJobs = [];

    this.createJob = function(id = Date.now(), arrayData = null) {
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
        return null;
    }

    this.updateJob = function(id, key, value) {
        if (id === 'id') { return false; }
        let job = getJob(id);
        if (job.status !== JobStatus.OPEN) { return false; }
        job[key] = value;
        return true;
    };

    this.storeJob = function(id) {
        let job = getJob(id);
        job.status = JobStatus.PROCESS;
        let prom = dbase.getObjPromise(job._id);
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

    this.clearCache = function() {
        closedJobs = [];
    }

}
//export {JobStatus, JobQueue};