'use strict';

const txt = {};

jQuery(function () {
    txt['show'] = (message, data, callback) => {
        setTxt(jQuery('#aestetic-textbox-header'), message);
        let current = '';
        _.each(data, function(byte, idx) {
            if (idx === 0) {}
            else if (idx % 4 === 0) { current += '   '; }
            else { current += ' '; }
            current += formatByte(byte);
        });
        const ta = jQuery('#aestetic-textarea');
        setTxt(ta, current);
        jQuery('#aestetic-textbox').modal('show');
        txt['callback'] = callback;
        ta.focus();
    };

    function isValidHexDigit(digit) {
        return ('0' <= digit) && ('9' >= digit) || ('a' <= digit) && ('f' >= digit) || ('A' <= digit) && ('F' >= digit);
    }

    txt['commit'] = function() {
        const entered = jQuery('#aestetic-textarea').val();

        const result = [];
        let lastNibble = 0;
        let hasLastNibble = false;
        for (let i = 0; i < entered.length; ++i) {
            if (i < entered.length && entered[i] <= ' ') {
                if (hasLastNibble) {
                    result.push(lastNibble);
                    lastNibble = 0;
                    hasLastNibble = false;
                }
            } else if (isValidHexDigit(entered[i])) {
                const value = lastNibble * 16 + parseInt(entered[i], 16);
                if (hasLastNibble) {
                    result.push(value);
                    lastNibble = 0;
                    hasLastNibble = false;
                } else {
                    lastNibble = value;
                    hasLastNibble = true;
                }
            } else {
                alert("${{ aestetic.NOT_VALID_HEX }}$".replace('##', entered[i]));
                return;
            }
        }
        if (hasLastNibble) {
            result.push(lastNibble);
        }

        if (txt.callback(result)) {
            txt.hide();
        }
    };

    txt['hide'] = function() {
        jQuery('#aestetic-textbox').modal('hide');
    };
    jQuery('#aestetic-textbox-ok').on('click', (evt) => {
        txt.commit();
        evt.preventDefault();
    });
    jQuery('#aestetic-textbox-cancel').on('click', (evt) => {
        txt.hide();
        evt.preventDefault();
    });

    function repairSelection(textarea) {
        const ta = textarea;
        if (ta.selectionStart === ta.selectionEnd && ta.selectionEnd < ta.val().length) {
            ta.selectionEnd = ta.selectionStart + 1;
        }
    }
    const textarea = jQuery('#aestetic-textarea');
    textarea.on('focus', (evt) => {
        if (jQuery(evt.target).val().length > 0) {
            this.selectionStart = 0;
            this.selectionEnd = 1;
        }
    });
    textarea.on('select', (evt) => {
        repairSelection(jQuery(evt.target));
    });
    textarea.on('keydown', (evt) => {
        const c = evt.keyCode;
        if (c === 13) {
            this.blur();
            txt.commit();
            evt.preventDefault();
        } else if (c === 8) {
            // delete
        } else if (c === 37) {
            const next = Math.max(0, this.selectionStart - 1);
            this.selectionStart = next;
            this.selectionEnd = Math.min(next + 1, this.value.length);
            evt.preventDefault();
        } else if (c >= 38 && c <= 40) {
            // cursor keys
        } else if (c >= 48 && c <= 57 || c >= 65 && c <= 70 || c >= 97 && c <= 102) {
            // hex digits
        } else {
            evt.preventDefault();
        }
    });
    textarea.on('keyup', (evt) => {
        repairSelection(jQuery(evt.target));
    });
    textarea.on('click', (evt) => {
        repairSelection(jQuery(evt.target));
    });

    const $page = jQuery('#page');
    if ($page) { $page.append(jQuery('#aestetic-textbox')); }
});