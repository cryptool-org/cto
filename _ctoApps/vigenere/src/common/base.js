"use strict";

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

        this.$plain = jQuery('#plain');
        this.$cipher = jQuery('#cipher');
        this.$key = jQuery('#key');

        this.$direction = jQuery('#direction');

        this.$alphabets = [];
        this.$keyAlphabets = undefined;

        this.setEncrypting = function () {
            if (!this.encrypting) {
                this.$direction.removeClass('flip');
                this.$direction.addClass('flop');
                this.encrypting = true;
            }
        };

        this.setDecrypting = function () {
            if (this.encrypting) {
                this.$direction.removeClass('flop');
                this.$direction.addClass('flip');
                this.encrypting = false;
            }
        };

        this.$direction.on('click', event => {
            if (state.encrypting) {
                state.setDecrypting();
            } else {
                state.setEncrypting();
            }
            event.preventDefault();
        });
        this.$plain.on('keyup', () => {
            state.setEncrypting();
            update();
        });
        this.$cipher.on('keyup', () => {
            state.setDecrypting();
            update();
        });
        this.$key.on('keyup', update);
    };

    // options

    let opts = new function () {
        this.$deleteWhitespace = jQuery('#deleteWhitespace');
        this.$groupBy5s = jQuery('#groupBy5s');
        this.$deleteNonLetters = jQuery('#deleteNonLetters');
        this.$convertToUpcase = jQuery('#convertToUpcase');
        this.$skipNonLetterKeys = jQuery('#skipNonLetterKeys');
        _.forEach(this, function (opt) {
            opt.on('change', update);
        });
    };

    let crypt = new Crypt(algo, state, opts);

    function update() {
        validateAllAlphabets();
        const $from = state.encrypting ? state.$plain : state.$cipher;
        const $to = state.encrypting ? state.$cipher : state.$plain;

        $to.val(crypt.process($from.val(), state.encrypting));
    }

    (() => {
        setupAlphabets(state);
        const $page = jQuery('#page');
        if ($page) { $page.append(jQuery('#alphabet-details')); }
    })();