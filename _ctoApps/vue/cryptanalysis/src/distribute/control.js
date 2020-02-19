import JobQueue from "./db/job.queue";
import Socket from "./socket";
import WorkerPool from "./worker/worker.pool";
import AppConfig from "../config/app.config";

export default function Control(vsb) {
    this.jobQueue = new JobQueue();
    this.socket = createSocket('/', this);
    console.log(this.socket);
    this.pool = new WorkerPool();
    this.pool.create();
    var currentJob, currentObj;
    var countFine = 0;

    this.getVSocketBox = function() {
        return vsb;
    };

    this.getCurrentJob = function() {
        return currentJob;
    };

    function createSocket(nsp, control) {
        let url = { url: AppConfig.data().url, path: AppConfig.data().path };
        return new Socket(url, nsp, control);
    }

    this.switchSocket = function (nsp) {
        for (let room of this.socket.gRooms()) {
            if (room.name === nsp && room.status === 'free') {
                console.debug(nsp);
                this.socket.close();
                this.socket = createSocket(nsp, this);
            }
        }
    };

    this.alone = function (obj) {
        currentObj = obj;
        if (typeof obj.job === 'undefined') {
            currentJob = this.jobQueue.createJob();
            currentJob.ctxt = obj.codtxt;
            this.jobQueue.storeJob(currentJob._id);
            obj.job = currentJob;
        } else {
            currentJob = this.jobQueue.getJob(obj.job._id);
        }

        this.pool.start(obj, this, this.jobQueue);
    };

    this.fine = function(job) {
        countFine++;
        if (countFine === vsb.selectWorker) {
            countFine = 0;
            this.socket.send('result.distribute', {sid: this.socket.id(), job: job, datas: job.getDatas()});
            job.clear();
            this.jobQueue.storeJob(job._id);
            vsb.fine(false, currentObj);
            vsb.decrypt(currentJob.datas[0]);
        }
    };

    this.complete = function (obj) {
        this.updateResult(obj);
        vsb.isJobCreate = false;
        console.debug(obj.endTime);
        vsb.date = obj.endTime;
        //this.calcStats(currentObj);
        vsb.fine(true, currentObj);
        vsb.decrypt(currentJob.datas[0]);
    };

    this.define = function (obj) {
        if (obj.is) {
            currentJob = obj.job;
        }
        vsb.isJobCreate = obj.is;
    };

    this.compute = function (obj) {
        //tPool.create();
        currentObj = obj;
        currentJob = this.jobQueue.addJob(obj.job);
        console.log('compute');
        console.log(currentJob);

        this.pool.start(obj, this, this.jobQueue);
        vsb.exe();
    };

    // @deprecated, use in vsb
    this.calcStats = function(obj = currentObj) {
        window.clearInterval(vsb.inter);
        let date = new Date();
        vsb.date = date.toLocaleTimeString('en-GB');

        let n = 0;
        for (let k = 0; k < obj.keyValue.length; k++) {
            if (obj.keyValue[k].indexOf('*') > -1) {
                n++;
            }
        }
        vsb.numberAllKeys = Math.pow(obj.alpha.length, n);
        let diff = date.getTime() - vsb.startTime.getTime();
        console.log(diff);
        vsb.throughput = parseInt(vsb.numberAllKeys / (diff / 1000));
    };

    this.getResults = function () {
        console.log(this.getCurrentJob());
        if (typeof currentJob === 'undefined') { return []; }
        return currentJob.sortDatas();
    };

    this.updateResult = function (obj) {
        console.log('updateResult');
        currentJob = this.jobQueue.getJob(obj.job._id);

        console.log(obj);
        currentJob.addDatas(obj.datas);
        /*
        obj.datas.forEach( obj => {
            currentJob.addData(obj);
        });
        */
        currentJob.datas = currentJob.cutSortDatas(20);
        this.jobQueue.storeJob(currentJob._id);

        console.log(currentJob);
    };

    this.searchByKeywords = function (array) {
        let searches = [];
        if (typeof currentJob === 'undefined') { return searches; }
        let datas = currentJob.sortDatas();
        for (let word of array) {
            for (let obj of datas) {
                if (typeof obj.otxt === 'undefined') {
                    continue;
                }
                if (obj.otxt.includes(word) && !valueIn(searches, obj.otxt)) {
                    searches.push(obj);
                }
            }
        }
        return searches;
    };

    function valueIn(array, value) {
        for (let obj of array) {
            for (let item in obj) {
                if (obj[item] === value) {
                    return true;
                }
            }
        }
        return false;
    }
}