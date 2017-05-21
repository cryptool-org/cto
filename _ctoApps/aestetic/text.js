'use strict';

var txt = {};

window.addEventListener('load', function () {
    txt['show'] = function(message, data, callback) {
        setTxt($('textbox-header'), message);
        var current = '';
        _.each(data, function(byte, idx) {
            if (idx == 0) {}
            else if (idx % 4 == 0) { current += '   '; }
            else { current += ' '; }
            current += formatByte(byte);
        });
        var ta = $('textarea');
        setTxt(ta, current);
        dom.removeClass($('dimmer'), 'hidden');
        txt['callback'] = callback;
        ta.focus();
    };

    function isValidHexDigit(digit) {
        return ('0' <= digit) && ('9' >= digit) || ('a' <= digit) && ('f' >= digit) || ('A' <= digit) && ('F' >= digit);
    }

    txt['commit'] = function() {
        var entered = $('textarea').value;

        var result = [];
        var lastNibble = 0;
        var hasLastNibble = false;
        for (var i = 0; i < entered.length; ++i) {
            if (i < entered.length && entered[i] <= ' ') {
                if (hasLastNibble) {
                    result.push(lastNibble);
                    lastNibble = 0;
                    hasLastNibble = false;
                }
            } else if (isValidHexDigit(entered[i])) {
                var value = lastNibble * 16 + parseInt(entered[i], 16);
                if (hasLastNibble) {
                    result.push(value);
                    lastNibble = 0;
                    hasLastNibble = false;
                } else {
                    lastNibble = value;
                    hasLastNibble = true;
                }
            } else {
                alert("'" + entered[i] + "' is not a valid hex digit");
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
        dom.addClass($('dimmer'), 'hidden');
    };
    $('dimmer').addEventListener('click', function(evt) {
        txt.hide();
        evt.preventDefault();
    });
    $('textbox').addEventListener('click', function(evt) {
        evt.stopPropagation();
    });
    $('textbox-ok').addEventListener('click', function(evt) {
        txt.commit();
        evt.preventDefault();
    });
    $('textbox-cancel').addEventListener('click', function(evt) {
        txt.hide();
        evt.preventDefault();
    });

    function repairSelection(textarea) {
        var ta = textarea;
        if (ta.selectionStart == ta.selectionEnd && ta.selectionEnd < ta.value.length) {
            ta.selectionEnd = ta.selectionStart + 1;
        }
    }
    var textarea = $('textarea');
    textarea.addEventListener('focus', function() {
        if (this.value.length > 0) {
            this.selectionStart = 0;
            this.selectionEnd = 1;
        }
    });
    textarea.addEventListener('select', function() {
        repairSelection(this);
    });
    textarea.addEventListener('keydown', function(evt) {
        var c = evt.keyCode;
        if (c == 13) {
            this.blur();
            txt.commit();
            evt.preventDefault();
        } else if (c == 8) {
            // delete
        } else if (c == 37) {
            var next = Math.max(0, this.selectionStart - 1);
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
    textarea.addEventListener('keyup', function() {
        repairSelection(this);
    });
    textarea.addEventListener('click', function() {
        repairSelection(this);
    });
});