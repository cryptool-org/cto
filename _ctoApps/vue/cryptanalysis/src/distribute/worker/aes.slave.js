import Unicode from '../../model/utf-8';
import ArmourHexadecimal from '../../model/armour.hex';
import {AESData} from './aes.data';
import AESDecryptThread from './aes.decrypt.thread';
import Entropy from '../../model/entropy';

export default function AESSlave() {
    var entropy = new Entropy();
    var unicode = new Unicode();
    var armourHex = new ArmourHexadecimal();
    var decryptThread = null;
    var ciphertext = '', currentJob, jobQueue, socket, ctrl;
    var computedKeys = 0, data, cutLen = 128;
    var maxKeys = 0, keyObj, count = 0, minLimit;

    function initThreads() {
        if (decryptThread !== null) {
            decryptThread.kill();
        }
        decryptThread = new AESDecryptThread();
    }

    this.getComputedKeysCount = function() {
        return [computedKeys, maxKeys];
    };

    this.sendData = function(obj, control, jQueue) {
        initThreads();
        console.debug(obj);
        //objectToByte(obj);

        ctrl = control;
        socket = control.socket;
        jobQueue = control.jobQueue;
        currentJob = jobQueue.getJob(obj.job._id);
        keyObj = currentJob.tmpObj;
        console.log(currentJob);
        setConfig(obj);
        //obj.job = 'undefined';
    };

    function setConfig(obj) {
        computedKeys = 0;
        //console.debug('init ' + currentJob.ctxt.toUpperCase());
        ciphertext = armourHex.disarm_hex(currentJob.ctxt.toUpperCase());
        //console.debug('initc ' + ciphertext);
        // key is hex string, not convert, yet
        let key = obj.keyValue.replace(/\s/g, '');
        //console.debug('init key ' + key.length);
        console.debug('init key ' + key);

        if (!ciphertext || !key || typeof ciphertext == "string") { return; }
        if (!obj.mode) { obj.mode = "ECB"; }

        data = AESData;
        data.keySizeInBits = key.length*4;
        data.key = key;
        data.mode = obj.mode;
        data.ctxt = ciphertext.slice(0, cutLen);
        //console.debug('initd ' + data.ctxt);
        data.maxComputeLen = obj.maxComputeLen;
        if (obj.maxComputeLen < 16) {
            data.maxComputeLen = 16;
        }
        minLimit = data.ctxt.length / 4;
        if (data.ctxt.length > data.maxComputeLen) {
            minLimit = data.maxComputeLen / 4;
        }
    }

    this.bruteForce = bruteForce;
    function bruteForce() {
        computedKeys = 1;
        data.obj = keyObj.keys.pop();
        startDecrypt(data, set);
    }

    this.byteToString = byteToString;
    function byteToString(result) {
        if (!result) return;

        var plaintext = "";
        for (let k = 0; k < result.length; k++) {
            //if (result[k] > 200) { continue; }
            plaintext += String.fromCharCode(result[k]);
        }

        //  That's it; plug plaintext into the result field
        return unicode.decode_utf8(plaintext);
    }

    function set(result) {
        //console.debug(result);
        //let tmp = ConvertHex.byteArrayToHex(result.key).toUpperCase();
        //let com = data.maxComputeLen / 4;
        let obj = result.obj;
        obj.otxt = byteToString(result.otxt);
        obj.calc = entropy.analyse(obj.otxt);
        if (obj.calc > minLimit) {
          currentJob.addData(obj);
          currentJob.datas = currentJob.cutSortDatas(20);
        }
    }

    //	Decrypt ciphertext with key, place result in plaintext field
    this.decryptText = function(obj, callFunction) {
        if (isLengthNull(obj.key)) { return; }
        //if (isLengthNull(obj.ctxt)) { return; }

        let key = obj.key.replace(/\s/g, '');

        initThreads();

        let ct = armourHex.disarm_hex(currentJob.ctxt.toUpperCase());
        AESData.maxComputeLen = ct.length;
        AESData.ctxt = ct;
        AESData.obj.key = key;
        AESData.mode = obj.mode;
        AESData.keySizeInBits = key.length*4;

        decryptThread.thread.send(AESData)
            .on('message', function (response) {
                console.log(response);
                let result = byteToString(response.otxt);
                console.log(result);
                callFunction(result);
            });
    };

    function isLengthNull(value) {
        return value.length === 0;
    }

    this.kill = function() {
        if (typeof jobQueue !== 'undefined') {
            currentJob.clear();
            jobQueue.storeJob(currentJob._id);
        }
        if (decryptThread !== null) {
            decryptThread.kill();
        }
    };

    function decrypt(ciphertext, key, mode, callFunction) {

        if (!ciphertext || !key || typeof ciphertext == "string") { return; }
        if (key.length*8 != AESData.keySizeInBits) { return; }
        if (!mode) { mode = "ECB"; }

        AESData.maxComputeLen = 64;
        AESData.ctxt = ciphertext;
        AESData.key = key;
        AESData.mode = mode;

        startDecrypt(AESData, callFunction);
    }

    function startDecrypt(Data, callFunction) {
        let time = {start: new Date()};
        decryptThread.thread.send(Data)
            .on('message', function (response) {
                if (callFunction !== null) {
                    callFunction(response);
                }

                if (keyObj.keys.length > 0) {
                    computedKeys++;
                    Data.obj = keyObj.keys.pop();
                    decryptThread.thread.send(Data);
                } else {
                    count = 0;
                    time.end = new Date();
                    console.log('done: ' + keyObj.keys.length);
                    currentJob.datas = currentJob.cutSortDatas(20);
                    ctrl.fine(currentJob);
                    //decryptThread.kill();
                    console.debug(time.start);
                    console.debug(computedKeys);
                    console.debug(time.end);
                }
            })
            .on('error', onError)
            .on('exit', onExit);
    }

    function onError(error) {
        console.error('Worker errored:', error);
        computedKeys--;
        ctrl.fine(currentJob);
    }

    function onExit() {
        console.log('Worker has been terminated.');
        console.debug(new Date());
    }

}