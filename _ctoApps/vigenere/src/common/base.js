"use strict";

    // jQuery lite

    function $(id) {
        return document.getElementById(id);
    }

    // Underscore lite

    const _ = {
        forEach(c, f) {
            for (let k in c) {
                if (c.hasOwnProperty(k)) {
                    f(c[k], k);
                }
            }
        }
    };

    // state handling

@@include('./alphabets.js')

    const state = new function State() {
        this.encrypting = true;

        this.$plain = $('plain');
        this.$cipher = $('cipher');
        this.$key = $('key');

        this.$direction = $('direction');

        this.$alphabets = [];
        this.$keyAlphabets = undefined;

        this.setEncrypting = function () {
            if (!this.encrypting) {
                this.$direction.classList.remove('flip');
                this.$direction.classList.add('flop');
                this.encrypting = true;
            }
        };

        this.setDecrypting = function () {
            if (this.encrypting) {
                this.$direction.classList.remove('flop');
                this.$direction.classList.add('flip');
                this.encrypting = false;
            }
        };

        this.$direction.addEventListener('click', event => {
            if (state.encrypting) {
                state.setDecrypting();
            } else {
                state.setEncrypting();
            }
            event.preventDefault();
        });
        this.$plain.addEventListener('keyup', () => {
            state.setEncrypting();
            update();
        });
        this.$cipher.addEventListener('keyup', () => {
            state.setDecrypting();
            update();
        });
        this.$key.addEventListener('keyup', update);
    };

    // options

    let opts = new function () {
        this.$deleteWhitespace = $('deleteWhitespace');
        this.$groupBy5s = $('groupBy5s');
        this.$deleteNonLetters = $('deleteNonLetters');
        this.$convertToUpcase = $('convertToUpcase');
        this.$skipNonLetterKeys = $('skipNonLetterKeys');
        _.forEach(this, function (opt) {
            opt.addEventListener('change', update);
        });
    };

    let crypt = new Crypt(algo, state, opts);

    function update() {
        validateAllAlphabets();
        const $from = state.encrypting ? state.$plain : state.$cipher;
        const $to = state.encrypting ? state.$cipher : state.$plain;

        $to.value = crypt.process($from.value, state.encrypting);
    }

    (() => {
        setupAlphabets(state);
        const $page = $('page');
        if ($page) { $page.appendChild($('alphabet-details')); }
    })();