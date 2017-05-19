"use strict";

var assert = require('assert');
var mockedState = require('../../src/test/mocked_state.js');
var mockedOpts = require('../../src/test/mocked_opts.js');

@@include('../common/crypt.js')
@@include('../common/vigenere.js')
@@include('../common/porta.js')

describe('Porta', function() {
    var state;
    var opts;
    var crypt;

    beforeEach(function() {
        state = mockedState.create();
        opts = mockedOpts.create();
        crypt = new Crypt(algo, state, opts);
    });

    it('is symmetrical', function() {
        var plain = 'Just a Test';
        var encrypted = crypt.process(plain, true);
        assert.equal(plain, crypt.process(encrypted, true));
    });
    describe('1st reference value', function() {
        var plain = 'Stanleys Expeditionszug quer durch Afrika wird von jedermann bewundert.';
        var encoded = 'Iixcuyaa Vlfzttczdfibkr hapm uihxx Ywatsx lsgz bdi nqnzbxrjc wolkczygb.';

        beforeEach(function() {
            state.$key.value = 'Geheimer Schluessel';
        });

        it('can encrypt', function() {
            assert.equal(encoded, crypt.process(plain, true));
        });
        it('can decrypt', function() {
            assert.equal(plain, crypt.process(encoded, false));
        });
    });
    describe('2nd reference value', function() {
        var plain = 'The quick brown fox jumps over the lazy dog.';
        var encoded = 'Csq ljzxv padki qkc ugqeg jkvj ivv wzha ugr.';

        beforeEach(function() {
            state.$key.value = 'Secret Key';
        });

        it('can encrypt', function() {
            assert.equal(encoded, crypt.process(plain, true));
        });
        it('can decrypt', function() {
            assert.equal(plain, crypt.process(encoded, false));
        });
    });
});
