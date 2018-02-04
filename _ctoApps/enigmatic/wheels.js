"use strict";

    const wheel_from_reflector = (str, $base) => {
        const result = { mapping: {}, inv_mapping: {}, ring: 1, overflow: '' };
        let last_ch = undefined;
        for (let i = 0; i < str.length; ++i) {
            const ch = str[i].toUpperCase();
            if (ch >= 'A' && ch <= 'Z') {
                if (last_ch) {
                    result.mapping[ch] = last_ch;
                    result.mapping[last_ch] = ch;
                    result.inv_mapping[ch] = last_ch;
                    result.inv_mapping[last_ch] = ch;
                    last_ch = undefined;
                } else {
                    last_ch = ch;
                }
            }
        }
        if (last_ch) { err($base, "pending char"); return null; }
        result.pretty_from = "ABCDE FGHIJ KLMNO PQRST UVWXY Z";
        result.pretty_to = "";
        for (let i = 0; i < result.pretty_from.length; ++i) {
            const key = result.pretty_from[i].toUpperCase();
            if (key >= 'A' && key <= 'Z') {
                if (! result.mapping[key]) {
                	result.mapping[key] = key;
                	result.inv_mapping[key] = key;
                }
                result.pretty_to += result.mapping[key];
            } else {
                result.pretty_to += key;
            }
        }
        return result;
    };

    const wheel_from_to = (str, $base) => {
        const result = { mapping: {}, inv_mapping: {}, ring: 1, overflow: '' };
        result.pretty_from = "ABCDE FGHIJ KLMNO PQRST UVWXY Z";
        result.pretty_to = "";
        str = str.toUpperCase();
        let j = 0;
        for (let i = 0; i < result.pretty_from.length; ++i) {
            const key = result.pretty_from[i];
            if (key >= 'A' && key <= 'Z') {
            	while (j < str.length && (str[j] < 'A' || str[j] > 'Z')) { ++j; }
            	if (j >= str.length) { err($base, "too short"); return null; }
            	const val = str[j];
            	if (result.inv_mapping[val]) { err($base, "key used twice"); return null; }
            	result.mapping[key] = val;
            	result.inv_mapping[val] = key;
                result.pretty_to += val;
                ++j;
            } else {
                result.pretty_to += key;
            }
        }
        return result;
    };

exports.from_reflector = wheel_from_reflector;
exports.from_to = wheel_from_to;
