import ArrayLib from '../lib/array.lib';

export default function ResultObject() {
    this.jobId = 0;
    this.matchValues = [];
    this.startTime = '';
    this.startDate = '';
    this.date = '';
    this.elapTime = '';
    this.inter = '';
    this.interComKeys = '';
    this.throughput = 0;
    this.numberAllKeys = 0;
    this.numberOfComKeys = 0;
    this.numberOfKeys = 0;

    this.setSettings = function (resultObj) {
        if (resultObj == null) { return; }

        this.jobId = resultObj.jobId;
        this.matchValues = resultObj.matchValues;
        this.startTime = resultObj.startTime;
        this.startDate = resultObj.startDate;
        this.date = resultObj.date;
        this.elapTime = resultObj.elapTime;

        window.clearInterval(resultObj.inter);
        window.clearInterval(resultObj.interComKeys);
        this.inter = resultObj.inter;
        this.interComKeys = resultObj.interComKeys;

        this.throughput = resultObj.throughput;
        this.numberAllKeys = resultObj.numberAllKeys;
        this.numberOfComKeys = resultObj.numberOfComKeys;
        this.numberOfKeys = resultObj.numberOfKeys;
    };

    this.searchByKeywords = function (array) {
        let searches = [];
        for (let word of array) {
            for (let obj of this.matchValues) {
                if (typeof obj.otxt === 'undefined') {
                    continue;
                }
                if (obj.otxt.includes(word) && !ArrayLib.valueIn(searches, obj.otxt)) {
                    searches.push(obj);
                }
            }
        }
        return searches;
    };
}