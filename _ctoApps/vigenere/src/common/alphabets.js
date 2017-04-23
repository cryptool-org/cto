"use strict";

let validateAllAlphabets;

function setupAlphabets(state) {
    const $alphaContainer = $('alphabets');
    const $keyAlphaContainer = $('key-alphabets');

    function closeAlphabetDetails() {
        jQuery('#alphabet-details').modal('hide');
        $activeAlphabet = undefined;
        $activeInput = undefined;
        $activeOffset = undefined;
    }

    function updateAlphabetLen() {
        const $len = $('alphabet-length');
        while ($len.firstChild) {
            $len.removeChild($len.firstChild);
        }
        $len.appendChild(document.createTextNode('' + $activeInput.value.length));
    }

    function updateFromCompressedAlphabet() {
        $activeInput.value = expandAlphabet($('compressed-alphabet').value);
        updateAlphabetLen();
        update();
    }

    $('compressed-alphabet').addEventListener('keyup', () => {
        $keywordForAlphabet.value = '';
        updateFromCompressedAlphabet();
    });
    const $keywordForAlphabet = $('keyword-for-alphabet');
    $keywordForAlphabet.addEventListener('keyup', () => {
        let idx;
        let result = '';
        let source = $activeInput.value.split('').sort();
        for (idx = 0; idx < $keywordForAlphabet.value.length; ++idx) {
            const i = source.indexOf($keywordForAlphabet.value[idx]);
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
    const $offsetForAlphabet = $('offset-for-alphabet');
    $offsetForAlphabet.addEventListener('keyup', () => {
        if ($offsetForAlphabet.value.match(/^[+-]?[0-9]+$/)) {
            while ($activeOffset.firstChild) {
                $activeOffset.removeChild($activeOffset.firstChild);
            }
            $activeOffset.appendChild(document.createTextNode($offsetForAlphabet.value));
            update();
        }
    });
    function addCompressedExpression(expr) {
        return event => {
            const $input = $('compressed-alphabet');
            $input.value += expr;
            updateFromCompressedAlphabet();
            event.preventDefault();
        }
    }

    for ($child = $('alphabet-detail-buttons').firstChild; $child; $child = $child.nextSibling) {
        if ($child.id && $child.id.substring(0, 4) === "add-") {
            $child.addEventListener('click', addCompressedExpression($child.id.substring(4)));
        }
    }
    $('reverse-alphabet').addEventListener('click', event => {
        let result = '';
        for (let idx = $activeInput.value.length - 1; idx >= 0; --idx) {
            result += $activeInput.value[idx];
        }
        $('compressed-alphabet').value = compressAlphabet(result);
        updateFromCompressedAlphabet();
        event.preventDefault();
    });
    $('permute-alphabet').addEventListener('click', event => {
        let chars = $activeInput.value.split('');
        for (let i = chars.length - 1; i > 0; --i) {
            const j = Math.floor(Math.random() * i);
            const tmp = chars[j];
            chars[j] = chars[i];
            chars[i] = tmp;
        }
        $('compressed-alphabet').value = compressAlphabet(chars.join(''));
        updateFromCompressedAlphabet();
        event.preventDefault();
    });
    $('shift-alphabet-left').addEventListener('click', event => {
        const value = $activeInput.value;
        const result = value.substr(1) + value.substr(0, 1);
        $('compressed-alphabet').value = compressAlphabet(result);
        updateFromCompressedAlphabet();
        event.preventDefault();
    });
    $('shift-alphabet-right').addEventListener('click', event => {
        const value = $activeInput.value;
        const result = value.substr(value.length - 1) + value.substr(0, value.length - 1);
        $('compressed-alphabet').value = compressAlphabet(result);
        updateFromCompressedAlphabet();
        event.preventDefault();
    });
    $('clone-alphabet-to-other-case').addEventListener('click', event => {
        event.preventDefault();

        let result = '';
        const source = $activeInput.value;
        for (let i = 0; i < source.length; ++i) {
            if (source[i] === source[i].toUpperCase()) {
                result += source[i].toLowerCase();
            } else {
                result += source[i].toUpperCase();
            }
        }

        addAlphabet(result, $activeAlphabet.parentNode, parseInt($activeOffset.innerText));
        closeAlphabetDetails();
        update();
    });
    $('delete-alphabet').addEventListener('click', event => {
        state.$alphabets.splice(state.$alphabets.indexOf($activeInput), 1);
        $activeAlphabet.parentNode.removeChild($activeAlphabet);
        closeAlphabetDetails();
        update();
        event.preventDefault();
    });
    let $activeAlphabet;
    let $activeInput;
    let $activeOffset;

    function compressAlphabet(expanded) {
        if (expanded.length < 3) {
            return expanded;
        }
        let result = '';
        let start = 0;
        while (start < expanded.length) {
            if (expanded[start] === '-') {
                result += '---';
                ++start;
                continue;
            }
            let val = expanded[start].charCodeAt(0);
            let end = start + 1;
            if (end < expanded.length) {
                if (val === expanded[end].charCodeAt(0) - 1) {
                    while (end < expanded.length && val === expanded[end].charCodeAt(0) - 1) {
                        ++end;
                        ++val;
                    }
                } else if (val === expanded[end].charCodeAt(0) + 1) {
                    while (end < expanded.length && val === expanded[end].charCodeAt(0) + 1) {
                        ++end;
                        --val;
                    }
                }
            }
            if (end - start >= 3) {
                result += expanded[start] + '-' + expanded[end - 1];
            } else {
                for (let i = start; i < end; ++i) {
                    result += expanded[i];
                }
            }
            start = end;
        }
        return result;
    }

    function expandAlphabet(compressed) {
        let result = '';
        let idx = 0;
        while (idx < compressed.length) {
            if (idx + 2 < compressed.length && compressed[idx + 1] === '-') {
                if (compressed[idx].charCodeAt(0) < compressed[idx + 2].charCodeAt(0)) {
                    for (let i = compressed[idx].charCodeAt(0); i <= compressed[idx + 2].charCodeAt(0); ++i) {
                        result += String.fromCharCode(i);
                    }
                } else {
                    for (let j = compressed[idx].charCodeAt(0); j >= compressed[idx + 2].charCodeAt(0); --j) {
                        result += String.fromCharCode(j);
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
        $activeInput = $container.getElementsByClassName('alphabet')[0];
        $activeOffset = $container.getElementsByClassName('offset')[0];
        $('compressed-alphabet').value = compressAlphabet($activeInput.value);
        $('keyword-for-alphabet').value = '';
        $('offset-for-alphabet').value = $activeOffset.innerText;
        updateAlphabetLen();
        jQuery('#alphabet-details').modal('show');
    }

    let $child;
    for ($child = $alphaContainer.firstChild; $child; $child = $child.nextSibling) {
        if ($child.className === 'form-group') {
            ($ref => {
                const $inner = $ref.getElementsByTagName('div')[0];
                const $input = $inner.getElementsByTagName('input')[0];
                state.$alphabets.push($ref);
                $input.addEventListener('keyup', update);
                const $span = $inner.getElementsByTagName('span')[0];
                const $button = $span.getElementsByTagName('button')[0];
                $button.addEventListener('click', event => {
                    showAlphabetDetails($ref);
                    event.preventDefault();
                });
            })($child);
        }
    }

    if ($keyAlphaContainer) {
        state.$keyAlphabets = [];
        for ($child = $keyAlphaContainer.firstChild; $child; $child = $child.nextSibling) {
            if ($child.className === 'form-group') {
                ($ref => {
                    const $inner = $ref.getElementsByTagName('div')[0];
                    const $input = $inner.getElementsByTagName('input')[0];
                    state.$keyAlphabets.push($ref);
                    $input.addEventListener('keyup', update);
                    const $span = $inner.getElementsByTagName('span')[0];
                    const $button = $span.getElementsByTagName('button')[0];
                    $button.addEventListener('click', event => {
                        showAlphabetDetails($ref);
                        event.preventDefault();
                    });
                })($child);
            }
        }
    }
    function addAlphabet(value, $parent, offset) {
        const $container = document.createElement('div');
        $container.classList.add('form-group');
        const $inner = document.createElement('div');
        $inner.classList.add('input-group');
        $container.appendChild($inner);
        const $input = document.createElement('input');
        $input.setAttribute('type', 'text');
        $input.classList.add('form-control');
        $input.classList.add('alphabet');
        $input.value = value;
        $input.addEventListener('keyup', update);
        state.$alphabets.push($container);
        $inner.appendChild($input);

        const $span = document.createElement('span');
        $span.classList.add('input-group-btn');
        const $details = document.createElement('button');
        $details.appendChild(document.createTextNode('…'));
        $details.classList.add('btn');
        $details.classList.add('btn-default');
        $details.addEventListener('click', event => {
            showAlphabetDetails($container);
            event.preventDefault();
        });
        $span.appendChild($details);
        $inner.appendChild($span);
        const $offset = document.createElement('span');
        $offset.classList.add('offset');
        $offset.appendChild(document.createTextNode('' + offset));
        $container.appendChild($offset);
        const $error = document.createElement('div');
        $error.classList.add('alert');
        $error.classList.add('alert-danger');
        $error.classList.add('alert-hidden');
        $container.appendChild($error);
        $parent.appendChild($container);
        update();
    }

    $('add-alphabet').addEventListener('click', function (event) {
        addAlphabet('', $alphaContainer);
        event.preventDefault();
    });
    const $btn = $('add-key-alphabet');
    if ($btn) {
        $btn.addEventListener('click', function (event) {
            addAlphabet('', $keyAlphaContainer);
            event.preventDefault();
        });
    }

    function validateAlphabets($parent, searchForDuplicates) {
        if (!$parent) {
            return;
        }

        function countChars($parent) {
            let result = {};
            for (let $alphabet = $parent.firstChild; $alphabet; $alphabet = $alphabet.nextSibling) {
                const $input = $alphabet.firstChild.firstChild;
                const value = $input.value;
                for (let i = 0; i < value.length; ++i) {
                    result[value[i]] = result[value[i]] ? result[value[i]] + 1 : 1;
                }
            }
            return result;
        }

        const counts = countChars($parent);
        for (let $alphabet = $parent.firstChild; $alphabet; $alphabet = $alphabet.nextSibling) {
            const $input = $alphabet.firstChild.firstChild;
            const value = $input.value;
            const $error = $alphabet.firstChild.nextSibling.nextSibling;
            let message = '';
            if (value.length === 0) {
                message = "${{ alphabet.EMPTY_ALPHABET }}$";
            } else if (searchForDuplicates) {
                let doubles = '';
                let count = 0;
                let found = {};
                for (let i = 0; i < value.length; ++i) {
                    if (counts[value[i]] > 1) {
                        if (!found[value[i]]) {
                            if (count) {
                                doubles += ', ';
                            }
                            doubles += value[i];
                            found[value[i]] = true;
                        }
                        ++count;
                    }
                }
                if (doubles.length) {
                    message = count > 1 ? "${{ alphabet.DOUBLE_CHARS }}$" : "${{ alphabet.DOUBLE_CHAR }}$";
                    message = message.replace('$1', doubles);
                }
            }
            if (message !== $error.innerHTML) {
                while ($error.firstChild) {
                    $error.removeChild($error.firstChild);
                }
                $error.appendChild(document.createTextNode(message));
                if (message.length) {
                    $error.classList.remove('alert-hidden');
                } else {
                    $error.classList.add('alert-hidden');
                }
            }
        }
    }

    validateAllAlphabets = () => {
        validateAlphabets($alphaContainer, true);
        validateAlphabets($keyAlphaContainer, false);
    }
}