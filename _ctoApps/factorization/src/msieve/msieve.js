"use strict";

window.addEventListener('load', function() {
    @@include('../../node_modules/expr-eval/dist/bundle.min.js')
    @@include('../common/msieve.js', { "msieveWorkerPath": "/_ctoApps/msieve/worker/msieveWorker.js" })
    @@include('../common/factorizer.js')
    @@include('../common/base.js')
})