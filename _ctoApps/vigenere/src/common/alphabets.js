"use strict";

let validateAllAlphabets;

function setupAlphabets(state) {
    const $alphaContainer = jQuery('#alphabets');
    const $keyAlphaContainer = jQuery('#key-alphabets');

    function closeAlphabetDetails() {
        jQuery('#alphabet-details').modal('hide');
        $activeAlphabet = undefined;
        $activeInput = undefined;
        $activeOffset = undefined;
    }

    function updateAlphabetLen() {
        jQuery('#alphabet-length').text('' + $activeInput.value.length);
    }

    function updateFromCompressedAlphabet() {
        $activeInput.value = expandAlphabet(jQuery('#compressed-alphabet').val());
        updateAlphabetLen();
        update();
    }

    const $keywordForAlphabet = jQuery('#keyword-for-alphabet');
    jQuery('#compressed-alphabet').on('keyup', () => {
        $keywordForAlphabet.val('');
        updateFromCompressedAlphabet();
    });
    $keywordForAlphabet.on('keyup', () => {
        let idx;
        let result = '';
        let source = $activeInput.value.split('').sort();
        let val = $keywordForAlphabet.val();
        for (idx = 0; idx < val.length; ++idx) {
            const i = source.indexOf(val[idx]);
            if (i >= 0) {
                result += source[i];
                source.splice(i, 1);
            }
        }
        for (idx = 0; idx < source.length; ++idx) {
            result += source[idx];
        }
        jQuery('#compressed-alphabet').val(compressAlphabet(result));
        updateFromCompressedAlphabet();
    });
    const $offsetForAlphabet = jQuery('#offset-for-alphabet');
    $offsetForAlphabet.on('keyup', () => {
        let val = $offsetForAlphabet.val();
        if (val.match(/^[+-]?[0-9]+$/)) {
            while ($activeOffset.firstChild) {
                $activeOffset.removeChild($activeOffset.firstChild);
            }
            $activeOffset.appendChild(document.createTextNode(val));
            update();
        }
    });
    function addCompressedExpression(expr) {
        return event => {
            const $input = jQuery('#compressed-alphabet');
            $input.val($input.val() + expr);
            updateFromCompressedAlphabet();
            event.preventDefault();
        }
    }

    jQuery('#alphabet-detail-buttons').children().each(function() {
        const $child = jQuery(this);
        const id = $child.prop('id');
        if (id && id.substring(0, 4) === "add-") {
            $child.on('click', addCompressedExpression(id.substring(4)));
        }
    });
    jQuery('#reverse-alphabet').on('click', event => {
        let result = '';
        for (let idx = $activeInput.value.length - 1; idx >= 0; --idx) {
            result += $activeInput.value[idx];
        }
        jQuery('#compressed-alphabet').val(compressAlphabet(result));
        updateFromCompressedAlphabet();
        event.preventDefault();
    });
    jQuery('#permute-alphabet').on('click', event => {
        let chars = $activeInput.value.split('');
        for (let i = chars.length - 1; i > 0; --i) {
            const j = Math.floor(Math.random() * i);
            const tmp = chars[j];
            chars[j] = chars[i];
            chars[i] = tmp;
        }
        jQuery('#compressed-alphabet').val(compressAlphabet(chars.join('')));
        updateFromCompressedAlphabet();
        event.preventDefault();
    });
    jQuery('#shift-alphabet-left').on('click', event => {
        const value = $activeInput.value;
        const result = value.substr(1) + value.substr(0, 1);
        jQuery('#compressed-alphabet').val(compressAlphabet(result));
        updateFromCompressedAlphabet();
        event.preventDefault();
    });
    jQuery('#shift-alphabet-right').on('click', event => {
        const value = $activeInput.value;
        const result = value.substr(value.length - 1) + value.substr(0, value.length - 1);
        jQuery('#compressed-alphabet').val(compressAlphabet(result));
        updateFromCompressedAlphabet();
        event.preventDefault();
    });
    jQuery('#clone-alphabet-to-other-case').on('click', event => {
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
    jQuery('#delete-alphabet').on('click', event => {
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
        jQuery('#compressed-alphabet').val(compressAlphabet($activeInput.value));
        jQuery('#keyword-for-alphabet').val('');
        jQuery('#offset-for-alphabet').val($activeOffset.innerText);
        updateAlphabetLen();
        jQuery('#alphabet-details').modal('show');
    }

    function alphabetDecorator($container) {
        return function() {
            const $ref = jQuery(this);
            const $inner = $ref.children('div').first();
            const $input = $inner.children('input').first();
            $container.push($ref.get()[0]);
            $input.on('keyup', update);
            const $span = $inner.children('span').first();
            const $button = $span.children('button').first();
            $button.on('click', event => {
                showAlphabetDetails($ref.get()[0]);
                event.preventDefault();
            });
        }
    }
    jQuery('.form-group', $alphaContainer).each(alphabetDecorator(state.$alphabets));
    let $child;
    if ($keyAlphaContainer.length) {
        state.$keyAlphabets = [];
        jQuery('.form-group', $keyAlphaContainer).each(alphabetDecorator(state.$keyAlphabets));
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

    jQuery('#add-alphabet').on('click', event => {
        addAlphabet('', $alphaContainer.get()[0]);
        event.preventDefault();
    });
    const $btn = jQuery('#add-key-alphabet');
    if ($btn) {
        $btn.on('click', event => {
            addAlphabet('', $keyAlphaContainer.get()[0]);
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
        validateAlphabets($alphaContainer.get()[0], true);
        validateAlphabets($keyAlphaContainer.get()[0], false);
    }
}