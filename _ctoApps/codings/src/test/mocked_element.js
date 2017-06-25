"use strict";

exports.MockedElement = function(childs) {
    this.childs = childs;
    this.getElementsByClassName = (className) => {
        let result = [];
        if (this.childs[className]) { result.push(this.childs[className]); }
        return result;
    }
};