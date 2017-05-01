"use strict";

exports.create = () => ({
    $deleteWhitespace: { prop: () => false },
    $groupBy5s: { prop: () => false },
    $deleteNonLetters: { prop: () => false },
    $convertToUpcase: { prop: () => false },
    $skipNonLetterKeys: { prop: () => true }
});
