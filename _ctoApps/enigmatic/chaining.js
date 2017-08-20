'use strict';

function encode_cbc(state, expandedKey) {
    let current = state.iv ? state.iv.slice() : new Array(state.blockSize);
    const result = [];
    let i, j, k;
    for (i = 0, j = 0; i + state.blockSize <= state.input.length; i += state.blockSize, ++j) {
        current = _.map(current, function(val, idx) { return val ^ state.input[i + idx]; });
        current = encode(j, current, state, expandedKey);
        _.each(current, function(val) { result.push(val); });
    }
    const tmp = [];
    for (k = 0; i < state.input.length; ++i, ++k) {
        tmp.push(state.input[i]);
    }
    const pad = state.blockSize - k;
    for (; k < state.blockSize; ++k) { tmp.push(pad); }
    current = _.map(current, function(val, idx) { return val ^ tmp[idx]; });
    current = encode(j, current, state, expandedKey);
    _.each(current, function(val) { result.push(val); });
    return result;
}

function encode_ecb(state, expandedKey) {
    const result = [];
    let tmp = new Array(state.blockSize);
    let i, j, k;
    for (i = 0, j = 0; i + state.blockSize <= state.input.length; i += state.blockSize, ++j) {
        tmp = _.map(tmp, function (_, idx) { return state.input[i + idx]; });
        tmp = encode(j, tmp, state, expandedKey);
        _.each(tmp, function(val) { result.push(val); });
    }
    for (k = 0; i < state.input.length; ++i, ++k) {
        tmp[k] = state.input[i];
    }
    const pad = state.blockSize - k;
    for (; k < state.blockSize; ++k) { tmp[k] = pad; }
    tmp = encode(j, tmp, state, expandedKey);
    _.each(tmp, function(val) { result.push(val); });
    return result;
}

function encode_chain(state, expandedKey) {
    const $computation = jQuery('#rounds');
    const $computation_end = jQuery('#rounds-end');
    removeBetween($computation, $computation_end);

    let result;
    switch (state.chaining) {
        case Chaining.None:
            result = encode(0, state.input, state, expandedKey);
            break;
        case Chaining.CBC:
            result = encode_cbc(state, expandedKey);
            break;
        default:
            result = encode_ecb(state, expandedKey);
            break;
    }

    writeBytes(jQuery('#output'), result, 'out-', true, state.colored);
    return result;
}

function decode_cbc(input, state, expandedKey) {
    let current = state.iv ? state.iv.slice() : new Array(state.blockSize);
    const result = [];
    let i, j, tmp, tmp2;
    for (i = 0, j = 0; i + state.blockSize <  input.length; i += state.blockSize, ++j) {
        tmp = _.map(current, function (val, idx) { return input[i + idx]; });
        tmp2 = decode(j, tmp, state, expandedKey);
        tmp2 = _.map(tmp2, function(val, idx) { return val ^ current[idx]; });
        current = tmp;
        _.each(tmp2, function(val) { result.push(val); });
    }
    tmp = _.map(current, function (val, idx) { return input[i + idx]; });
    tmp2 = decode(j, tmp, state, expandedKey);
    tmp2 = _.map(tmp2, function(val, idx) { return val ^ current[idx]; });
    const valid = state.blockSize - tmp2[state.blockSize - 1];
    for (i = 0; i < valid; ++i) {
        result.push(tmp2[i]);
    }
    return result;
}

function decode_ecb(input, state, expandedKey) {
    const result = [];
    let tmp = new Array(state.blockSize);
    let i, j;
    for (i = 0, j = 0; i + state.blockSize <  input.length; i += state.blockSize, ++j) {
        tmp = _.map(tmp, function (val, idx) { return input[i + idx]; });
        tmp = decode(j, tmp, state, expandedKey);
        _.each(tmp, function(val) { result.push(val); });
    }
    tmp = _.map(tmp, function (val, idx) { return input[i + idx]; });
    tmp = decode(j, tmp, state, expandedKey);
    const valid = state.blockSize - tmp[state.blockSize - 1];
    for (i = 0; i < valid; ++i) {
        result.push(tmp[i]);
    }
    return result;
}

function decode_chain(input, state, expandedKey) {
    const $computation = jQuery('#decode-rounds');
    const $computation_end = jQuery('#decode-rounds-end');
    removeBetween($computation, $computation_end);

    let result;
    switch (state.chaining) {
        case Chaining.None:
            result = decode(0, input, state, expandedKey);
            break;
        case Chaining.CBC:
            result = decode_cbc(input, state, expandedKey);
            break;
        default:
            result = decode_ecb(input, state, expandedKey);
            break;
    }
    writeBytes(jQuery('#decoded'), result, 'dec-', true, state.colored);

    return result;
}

exports.encode_chain = encode_chain;
exports.decode_chain = decode_chain;
