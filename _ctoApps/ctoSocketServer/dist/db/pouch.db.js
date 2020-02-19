'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = Database;

var _pouchdbNode = require('pouchdb-node');

var _pouchdbNode2 = _interopRequireDefault(_pouchdbNode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Database() {

    var db;

    this.createDB = function (dbname) {
        //PouchDB.plugin(require('pouchdb-adapter-http'));
        db = new _pouchdbNode2.default(dbname);
        db.info().then(function (info) {
            console.log(info);
        });
    };

    this.storeObject = function (obj) {
        obj = normalize(obj);
        db.put(obj, callHandler);
    };

    this.getObject = function (_id) {
        var doc = db.get(_id).then(function (doc) {
            console.log(doc);
            return doc;
        });
        return doc;
    };

    this.getObjPromise = function (id) {
        return db.get(id);
    };

    this.removeObject = function (_id) {
        db.get(_id).then(function (doc) {
            return db.remove(doc);
        });
    };

    this.storeBulk = function (array) {
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
            //console.log(doc);
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
        return JSON.parse(JSON.stringify(value));
    }

    this.getBulk = function (start, end) {
        var desc = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

        var options = { skip: start, limit: end, descending: desc };
        var docs = db.allDocs(options).then(function (response) {
            console.log(response);
            return response;
        }).catch(function (err) {
            console.log(err);
        });
        return docs;
    };

    this.getAllIds = function () {
        return db.allDocs().then(function (response) {
            console.log(response);
            return response;
        }).catch(function (err) {
            console.log(err);
        });
    };

    this.close = function () {
        db.close(function () {
            console.log('pouchdb closed');
        });
    };
}