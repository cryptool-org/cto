if (self.importScripts) {
    //Runs in browser:
    self.importScripts('./msieve.js');
} else {
    //Runs in unit test (NodeJS):

    //set to folder in which auto-generated msieve.js script resides in, so it can find wasm file:
    __dirname = './worker';
    const tmpImportScripts = importScripts;
    //undefine this function to not confuse auto-generated msieve.js script (should treat as "node", not as worker):
    importScripts = undefined;
    tmpImportScripts('./worker/msieve.js');
}

Module.onRuntimeInitialized = function () {
    self.postMessage({ type: 'ready' });
}

self.addEventListener('message', function (e) {
    doSieve(e.data);
}, false);

function doSieve(input) {
    try {
        const msieve = Module;
        if (!msieve) {
            throw new Error("Msieve not ready yet.");
        }
        msieve.publishState = function (numRelations, fullRelations, combinedRelations, partialRelations, maxRelations) {
            self.postMessage({ type: 'state', numRelations, fullRelations, combinedRelations, partialRelations, maxRelations });
        };
        msieve.publishFactor = function (factorType, factorNumber) {
            self.postMessage({ type: 'factor', factorType, factorNumber });
        }

        const result = msieve.ccall("sieve", 'number', ['string'], [input]);
        self.postMessage({ type: 'finish', result });
    } catch (error) {
        self.postMessage({ type: 'error', error: error.message ? error.message : error });
    }
}