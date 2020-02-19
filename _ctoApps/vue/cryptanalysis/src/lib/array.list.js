/*
 @author D.Kuche
 @date 04.07.2017
 */
export default function ArrayList() {

    var list = [];

    this.init = function(number = 3, name = 'list') {
        for (let k = 1; k < number+1; k++) {
            let nam = name + k;
            list[nam] = [];
        }
    };

    this.get = function(key) {
        return list[key] ? list[key] : null;
    };

    this.set = function(key, value = []) {
        if (typeof list[key] !== 'undefined') {
            list[key] = value;
            return true;
        }
        return false;
    };

    this.reset = function(key) {
        return this.set(key);
    }

};