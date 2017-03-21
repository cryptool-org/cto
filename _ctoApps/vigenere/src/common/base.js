"use strict";

    // jQuery lite

    function $(id) {
        return document.getElementById(id);
    }

    // Underscore lite

    var _ = {
        'forEach': function (c, f) {
            for (var k in c) {
                if (c.hasOwnProperty(k)) {
                    f(c[k], k);
                }
            }
        }
    };

    // state handling

    var state = new function State() {
        this.encrypting = true;

        this.$plain = $('plain');
        this.$cipher = $('cipher');
        this.$key = $('key');

        this.$direction = $('direction');

        this.$alphabets = [];

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

        this.$direction.addEventListener('click', function (event) {
            if (state.encrypting) {
                state.setDecrypting();
            } else {
                state.setEncrypting();
            }
            event.preventDefault();
        });
        this.$plain.addEventListener('keyup', function () {
            state.setEncrypting();
            update();
        });
        this.$cipher.addEventListener('keyup', function () {
            state.setDecrypting();
            update();
        });
        this.$key.addEventListener('keyup', update);

        function closeAlphabetDetails() {
            jQuery('#alphabet-details').modal('hide');
            $activeAlphabet = undefined;
            $activeInput = undefined;
        }

        function updateLen() {
            var $len = $('alphabet-length');
            while ($len.firstChild) {
                $len.removeChild($len.firstChild);
            }
            $len.appendChild(document.createTextNode('' + $activeInput.value.length));
        }

        function updateFromCompressedAlphabet() {
            $activeInput.value = expandAlphabet($('compressed-alphabet').value);
            updateLen();
            update();
        }
        $('compressed-alphabet').addEventListener('keyup', function() {
            $keywordForAlphabet.value = '';
            updateFromCompressedAlphabet();
        });
        var $keywordForAlphabet = $('keyword-for-alphabet');
        $keywordForAlphabet.addEventListener('keyup', function() {
            var result = '';
            var source = $activeInput.value.split('').sort();
            for (var idx = 0; idx < $keywordForAlphabet.value.length; ++idx) {
                var i = source.indexOf($keywordForAlphabet.value[idx]);
                if (i >= 0) {
                    result += source[i];
                    source.splice(i, 1);
                }
            }
            for (idx = 0; idx < source.length; ++idx) {
                result += source[idx];
            }
            $('compressed-alphabet').value = compressAlphabet(result);
            updateFromCompressedAlphabet();
        });
        function addCompressedExpression(expr) {
            return function(event) {
                var $input = $('compressed-alphabet');
                $input.value += expr;
                updateFromCompressedAlphabet();
                event.preventDefault();
            }
        }
        for ($child = $('alphabet-detail-buttons').firstChild; $child; $child = $child.nextSibling) {
            if ($child.id && $child.id.substring(0, 4) == "add-") {
                $child.addEventListener('click', addCompressedExpression($child.id.substring(4)));
            }
        }
        $('reverse-alphabet').addEventListener('click', function(event) {
            var result = '';
            for (var idx = $activeInput.value.length - 1; idx >= 0; --idx) {
                result += $activeInput.value[idx];
            }
            $('compressed-alphabet').value = compressAlphabet(result);
            updateFromCompressedAlphabet();
            event.preventDefault();
        });
        $('permute-alphabet').addEventListener('click', function(event) {
            var chars = $activeInput.value.split('');
            for (var i = chars.length - 1; i > 0; --i) {
                var j = Math.floor(Math.random() * i);
                var tmp = chars[j];
                chars[j] = chars[i];
                chars[i] = tmp;
            }
            $('compressed-alphabet').value = compressAlphabet(chars.join(''));
            updateFromCompressedAlphabet();
            event.preventDefault();
        });
        $('shift-alphabet-left').addEventListener('click', function(event) {
            var value = $activeInput.value;
            var result = value.substr(1) + value.substr(0, 1);
            $('compressed-alphabet').value = compressAlphabet(result);
            updateFromCompressedAlphabet();
            event.preventDefault();
        });
        $('shift-alphabet-right').addEventListener('click', function(event) {
            var value = $activeInput.value;
            var result = value.substr(value.length - 1) + value.substr(0, value.length - 1);
            $('compressed-alphabet').value = compressAlphabet(result);
            updateFromCompressedAlphabet();
            event.preventDefault();
        });
        $('clone-alphabet-to-other-case').addEventListener('click', function(event) {
            event.preventDefault();

            var result = '';
            var source = $activeInput.value;
            for (var i = 0; i < source.length; ++i) {
                if (source[i] == source[i].toUpperCase()) {
                    result += source[i].toLowerCase();
                } else {
                    result += source[i].toUpperCase();
                }
            }

            for (i = 0; i < state.$alphabets.length; ++i) {
                if (state.$alphabets[i].value == result) { return; }
            }

            addAlphabet(result);
            closeAlphabetDetails();
        });
        $('delete-alphabet').addEventListener('click', function(event) {
            state.$alphabets.splice(state.$alphabets.indexOf($activeInput), 1);
            $activeAlphabet.parentNode.removeChild($activeAlphabet);
            closeAlphabetDetails();
            update();
            event.preventDefault();
        });
        var $alphaContainer = $('alphabets');
        var $activeAlphabet;
        var $activeInput;

        function compressAlphabet(expanded) {
            if (expanded.length < 3) { return expanded; }
            var result = '';
            var start = 0;
            while (start < expanded.length) {
                if (expanded[start] == '-') {
                    result += '---';
                    ++start;
                    continue;
                }
                var val = expanded[start].charCodeAt(0);
                var end = start + 1;
                if (end < expanded.length) {
                    if (val == expanded[end].charCodeAt(0) - 1) {
                        while (end < expanded.length && val == expanded[end].charCodeAt(0) - 1) {
                            ++end;
                            ++val;
                        }
                    } else if (val == expanded[end].charCodeAt(0) + 1) {
                        while (end < expanded.length && val == expanded[end].charCodeAt(0) + 1) {
                            ++end;
                            --val;
                        }
                    }
                }
                if (end - start >= 3) {
                    result += expanded[start] + '-' + expanded[end - 1];
                } else {
                    for (var i = start; i < end; ++i) {
                        result += expanded[i];
                    }
                }
                start = end;
            }
            return result;
        }
        function expandAlphabet(compressed) {
            var result = '';
            var idx = 0;
            while (idx < compressed.length) {
                if (idx + 2 < compressed.length && compressed[idx + 1] == '-') {
                    if (compressed[idx].charCodeAt(0) < compressed[idx + 2].charCodeAt(0)) {
                        for (var i = compressed[idx].charCodeAt(0); i <= compressed[idx + 2].charCodeAt(0); ++i) {
                            result += String.fromCharCode(i);
                        }
                    } else {
                        for (var i = compressed[idx].charCodeAt(0); i >= compressed[idx + 2].charCodeAt(0); --i) {
                            result += String.fromCharCode(i);
                        }
                    }
                    idx += 3;
                } else {
                    result += compressed[idx];
                    ++idx;
                }
            }
            return result;
        }
        function showAlphabetDetails($container) {
            $activeAlphabet = $container;
            var $inner = $container.getElementsByTagName('div')[0];
            $activeInput = $inner.getElementsByTagName('input')[0];
            $('compressed-alphabet').value = compressAlphabet($activeInput.value);
            $('keyword-for-alphabet').value = '';
            updateLen();
            jQuery('#alphabet-details').modal('show');
        }
        for (var $child = $alphaContainer.firstChild; $child; $child = $child.nextSibling) {
            if ($child.className == 'form-group') {
                (function(self, $ref) {
                    var $inner = $ref.getElementsByTagName('div')[0];
                    var $input = $inner.getElementsByTagName('input')[0];
                    self.$alphabets.push($input);
                    $input.addEventListener('keyup', update);
                    var $span = $inner.getElementsByTagName('span')[0];
                    var $button = $span.getElementsByTagName('button')[0];
                    $button.addEventListener('click', function (event) {
                        showAlphabetDetails($ref);
                        event.preventDefault();
                    });
                })(this, $child);
            }
        }
        function addAlphabet(value) {
            var $container = document.createElement('div');
            $container.classList.add('form-group');
            var $inner = document.createElement('div');
            $inner.classList.add('input-group');
            $container.appendChild($inner);
            var $input = document.createElement('input');
            $input.setAttribute('type', 'text');
            $input.classList.add('form-control');
            $input.value = value;
            $input.addEventListener('keyup', update);
            state.$alphabets.push($input);
            $inner.appendChild($input);

            var $span = document.createElement('span');
            $span.classList.add('input-group-btn');
            var $details= document.createElement('button');
            $details.appendChild(document.createTextNode('…'));
            $details.classList.add('btn');
            $details.classList.add('btn-default');
            $details.addEventListener('click', function(event) {
                showAlphabetDetails($container);
                event.preventDefault();
            });
            $span.appendChild($details);
            $inner.appendChild($span);
            $alphaContainer.appendChild($container);
            update();
        }
        $('add-alphabet').addEventListener('click', function(event) {
            addAlphabet('');
            event.preventDefault();
        });
    };

    // options

    var opts = new function () {
        this.$deleteWhitespace = $('deleteWhitespace');
        this.$groupBy5s = $('groupBy5s');
        this.$deleteNonLetters = $('deleteNonLetters');
        this.$convertToUpcase = $('convertToUpcase');
        this.$skipNonLetterKeys = $('skipNonLetterKeys');
        _.forEach(this, function (opt) {
            opt.addEventListener('change', update);
        });
    };

    var crypt = new Crypt(algo, state, opts);

    function update() {
        var $from = state.encrypting ? state.$plain : state.$cipher;
        var $to = state.encrypting ? state.$cipher : state.$plain;

        $to.value = crypt.process($from.value, state.encrypting);
    }
