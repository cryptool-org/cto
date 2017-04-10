"use strict";

function MockedElement(childs) {
    this.childs = childs;
    this.getElementsByClassName = function(className) {
        var result = [];
        if (this.childs[className]) { result.push(this.childs[className]); }
        return result;
    }
}
exports.MockedElement = MockedElement;
exports.create = function() {
    return {
        $alphabets: [
            new MockedElement({
                alphabet: { value: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' },
                offset: { innerText: '0' }
            }),
            new MockedElement({
                alphabet: { value: 'abcdefghijklmnopqrstuvwxyz' },
                offset: { innerText: '0' }
            })
        ],
        $key: { value: ' b' }
    };
};
