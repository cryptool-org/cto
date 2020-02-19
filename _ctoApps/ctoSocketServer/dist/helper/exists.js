'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = Exists;
/**
 * @return {boolean}
 */
function Exists(data) {

    if (typeof data === 'undefined' || data === null) {
        return false;
    } else {
        return true;
    }
}