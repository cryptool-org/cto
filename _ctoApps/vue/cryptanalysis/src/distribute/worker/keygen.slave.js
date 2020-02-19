import KeyGenerationThread from './key.generation.thread3';
import DataObj from '../db/data.obj';

export default function KeyGenSlave() {
    var keyGenThread = null;
    var currentJob, socket, ctrl;
    var maxKeys = 0, count = 0;

    function initThreads() {
        if (keyGenThread !== null) {
            keyGenThread.kill();
        }
        keyGenThread = new KeyGenerationThread();
    }

    this.getKeysCount = function() {
        return maxKeys;
    };

    this.sendData = function(obj, control) {
        initThreads();
        console.debug(obj);
        //objectToByte(obj);

        ctrl = control;
        socket = control.socket;
        //jobQueue = control.jobQueue;
        currentJob = control.getCurrentJob().tmpObj;//jobQueue.getJob(obj.job._id);
        //console.log(currentJob);
        obj.job = 'undefined';

        this.generateKeys(obj);
    };

    this.generateKeys = function(obj) {
        console.log(obj);
        maxKeys = 0;
        count = 0;
        //keys = []; //new Set();
        keyGenThread.thread.send(obj)
          .on('message', function (response) {
              handleKeys(obj, response);
          })
          .on('progress', function (progress) {
              handleKeys(obj, progress);
          })
          .on('error', onError)
          .on('exit', onExit);
    };

    function handleKeys(obj, response) {
        //console.debug(response.length);
        response.forEach(element => {
            obj.sid = socket.id();
            obj.from = socket.address();
            obj.key = element;
            //obj.ctxt = obj.codtxt;
            obj.date = new Date();
            var d = new DataObj();
            d.init(obj);
            //currentJob.addData(obj);
            //keys.add(d);
            currentJob.keys.push(d);
        });
        maxKeys += response.length;
        //console.debug(keys);
        if (count == 0) {
            ctrl.pool.force();
        }
        count++;
    }

    this.kill = function() {
        if (keyGenThread !== null) {
            keyGenThread.kill();
        }
    };

    function onError(error) {
        console.error('Worker errored:', error);
        //ctrl.fine(currentJob);
    }

    function onExit() {
        console.log('Worker has been terminated.');
        console.debug(new Date());
    }

}