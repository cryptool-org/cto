"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = Error;
function Error() {

    this.handle = function (error) {
        if (error) {
            return console.error(error);
        }
    };
}