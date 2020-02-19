import PouchDB from 'pouchdb-browser';
//import WorkerPouch from 'worker-pouch';

export default function Database() {

    var db;

    this.createWorkerDB = function(dbname) {
        var workerPouch = require('worker-pouch');
        workerPouch.isSupportedBrowser().then(function (supported) {
            if (supported) {
                PouchDB.adapter('worker', workerPouch);
                db = new PouchDB(dbname, {adapter: 'worker'});
            } else { // fall back to a normal PouchDB
                db = new PouchDB(dbname);
            }
            db.info().then(function (info) { console.log(info); })
        }).catch(console.log.bind(console)); // shouldn't throw an error
    };

    this.createDB = function(dbname) {
        db = new PouchDB(dbname);
        db.info().then(function (info) { console.log(info); })
    };

    this.storeObject = function(obj) {
        obj = normalize(obj);
        db.put(obj, callHandler);
    };

    this.getObject = function(_id) {
        let doc = db.get(_id).then(function (doc) {
            console.log(doc);
            return doc;
        });
        return doc;
    };

    this.getObjPromise = function (id) {
       return db.get(id);
    };

    this.removeObject = function(_id) {
        db.get(_id).then(function (doc) {
            return db.remove(doc);
        });
    };

    this.storeBulk = function(array) {
        array = normalize(array);
        db.bulkDocs(array, callHandler);
    };

    function callHandler(err, response) {
        if (err) {
            return console.log(err);
        }
        return console.log(response);
    }

    this.updateObject = updateObject;
    function updateObject(id, obj) {
        obj = normalize(obj);
        db.get(id).then(function (doc) {
            console.log(doc);
            obj._rev = doc._rev;
            db.put(obj, function (err, response) {
                if (err) {
                    updateObject(id, obj);
                    return console.log(err);
                }
                return console.log(response);
            });
        }).catch(function (err) {
            console.log(err);
        });
    }

    function normalize(value) {
        console.log(value);
        return JSON.parse(JSON.stringify(value));
    }

    this.getBulk = function(start, end, desc = true) {
        let options = {skip: start, limit : end, descending: desc };
        let docs = db.allDocs(options).then(function (response) {
            console.log(response);
            return response;
        }).catch(function (err) {
            console.log(err);
        });
        return docs;
    };

    this.getAllIds = function() {
        return db.allDocs().then(function (response) {
            console.log(response);
            return response;
        }).catch(function (err) {
            console.log(err);
        });
    };

    this.close = function() {
        db.close(function() {
            console.log('pouchdb closed');
        });
    }

}