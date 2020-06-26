"use strict";

class Msieve {

    constructor() {
        this.worker = new Worker("@@msieveWorkerPath");
        
        this.workerReadinessPromise = new Promise((resolve, reject) => {
            this.worker.addEventListener('message', e => {
                if (e.data.type == 'ready') {
                    resolve();
                } else {
                    if (this.handleWorkerMessage) {
                        this.handleWorkerMessage(e);
                    }
                }
            }, false);
        });
    }

    sieve(number, onProgress) {
        return new Promise((resolve, reject) => {
            this.workerReadinessPromise.then(() => {
                this.setupWorker(onProgress, resolve, reject);
                this.worker.postMessage(number);
            });
        });
    }

    getProgressText(sievingState) {
        const p1 = sievingState.numRelations;
        const p2 = sievingState.fullRelations;
        const p3 = sievingState.combinedRelations;
        const p4 = sievingState.partialRelations;
        const p5 = sievingState.maxRelations;
        //Parameters above are used in the following status text:
        return `${{ msieve.STATUS_TEXT }}$`;
    }

    setupWorker(onProgress, resolve, reject) {
        let factors = [];
        let numberInput = null;
        this.handleWorkerMessage = function (e) {
            switch (e.data.type) {
                case 'state':
                    const progress = e.data.numRelations / e.data.maxRelations;
                    onProgress(this.getProgressText(e.data), progress)
                    break;
                case 'factor':
                    factors.push(e.data.factorNumber);
                    break;
                case 'input':
                    numberInput = e.data.inputNumber;
                    break;
                case 'finish':
                    if (factors.length == 0) {
                        reject(new Error());
                    } else {
                        resolve({ factors, numberInput });
                    }
                    break;
                case 'error':
                    reject(new Error(JSON.stringify(e.data.error)));
                    break;
            }
        };
    }
}

let algo = (() => {
    const msieve = new Msieve();
    return (...args) => msieve.sieve(...args);
})();