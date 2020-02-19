export default function DataObj() {

    this.init = function(json) {
        this._id = json.date;
        this.sid = json.sid;
        this.from = json.from;
        this.key = json.key;
        this.otxt = json.otxt;
        //this.ctxt = json.ctxt;
        this.alpha = json.alpha;
        this.date = json.date;
        this.mode = json.mode;
        this.calc = 0.0;
        if (typeof json.calc !== 'undefined') {
            this.calc = parseFloat(json.calc).toFixed(3);
        }
        this.init = '';

        return this;
    }

}