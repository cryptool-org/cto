"use strict";

const MockedElement = require('./mocked_element').MockedElement;

exports.create = () => ({
    $alphabets: [
        new MockedElement({
            alphabet: {value: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'},
            offset: {innerText: '0'}
        }),
        new MockedElement({
            alphabet: {value: 'abcdefghijklmnopqrstuvwxyz'},
            offset: {innerText: '0'}
        })
    ],
    $key: {value: ' b'}
});
