"use strict";

exports.create = function() {
    return {
        $deleteWhitespace: {checked: false},
        $groupBy5s: {checked: false},
        $deleteNonLetters: {checked: false},
        $convertToUpcase: {checked: false},
        $skipNonLetterKeys: {checked: true}
    };
};
