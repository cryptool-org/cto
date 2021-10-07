"use strict";

function Railfence() {
    this.encrypt = function (val, idx, key, alphabets, msg) {
        var i, j, dir;
        var cipher = "";
        var rows = [];
        var rails = document.getElementById("depth").selectedIndex + 2;
        var offset = document.getElementById("offset").selectedIndex;
        var allAlphabets = "";
        for(var i = 0; i < alphabets.length; i++) {
            allAlphabets += alphabets[i].getElementsByClassName('alphabet')[0].value;
        }

        var regex = new RegExp('[^' + allAlphabets + ']', 'g');
        msg = msg.replace(regex, '');
        for (i = 0; i < rails; i += 1 ) {
            rows[i] = '';
        }
        if ( offset < rails ) {
            if (offset === (rails - 1)) {
                dir = -1;
            }
            else {
                dir = 1;
            }
        } else {
            offset = (rails * 2) - 2 - offset;
            dir = -1;
        }

        for (i = 0; i < msg.length; i += 1) {
            for (j = 0; j < rails; j += 1) {
                if (j === offset) {
                    rows[offset] += msg.substr(i, 1);
                } else {
                    rows[j] += ' ';
                }
            }
            offset += dir;
            if (offset < 0) {
                offset = 1;
                dir = 1;
            } else {
                if (offset === rails) {
                    offset = rails - 2;
                    dir = -1;
                }
            }
        }
        cipher = rows.join('').replace(/\s+/g, '');
        document.getElementById("railfence-display").value = "";
        for(var k = 0; k < rows.length; k++) {
            document.getElementById("railfence-display").value += rows[k];
            document.getElementById("railfence-display").value += "\n";
        }

        return cipher.charAt(idx);
    };
    this.decrypt = function (val, idx, key, alphabets, msg) {
        var result = "";
        var increment;
        var rows = [];
        var rowLengths = [];
        var allAlphabets = "";
        for(var i = 0; i < alphabets.length; i++) {
            allAlphabets += alphabets[i].getElementsByClassName('alphabet')[0].value;
        }

        var regex = new RegExp('[^' + allAlphabets + ']', 'g');
        msg = msg.replace(regex, '');

        var rails = document.getElementById("depth").selectedIndex + 2;
        var offset = document.getElementById("offset").selectedIndex;
        var oneTurn = rails*2-2;
        var n = Math.floor(msg.length / oneTurn);
        var turns = [];

        offset = offset % oneTurn;
        if (offset < 0)
            offset = offset + oneTurn;

        var k = msg.length + offset;
        var off = [];
        off[0] = Math.ceil(offset/oneTurn);

        for (var i = 1; i < oneTurn/2; i++) {
            off[i] = Math.ceil( (offset-i)/oneTurn ) + Math.floor( (offset+i-1)/oneTurn );
        }
        off[oneTurn/2] = Math.ceil( (offset - oneTurn/2)/oneTurn );

        var xs = [];
        for (var i = 0; i <= oneTurn/2; i++) {
            if (off[i] == 0) { xs[i] = "" }
            if (off[i] == 1) { xs[i] = " " }
            if (off[i] == 2) { xs[i] = "  " }
        }

        var blocklen;
        var a = [];
        msg = xs[0] + msg;
        a[0] = msg.slice(0, Math.ceil(k/oneTurn) ).split("");
        msg = xs[1] + msg.slice(Math.ceil(k/oneTurn));  // slices to end
        for (var i = 1; i < oneTurn/2; i++) {
            blocklen = Math.ceil( (k-i)/oneTurn ) + Math.floor( (k+i-1)/oneTurn );
            a[i] = msg.slice(0, blocklen).split("");
            msg = xs[i+1] + msg.slice(blocklen);
        }
        a[oneTurn/2] = msg.split("");

        var j = 0;
        while (a[j].length > 0) {
            result = result + a[j].shift();
            if (j == 0)
                increment = 1;

            if (j == oneTurn / 2)
                increment = -1;

            j = j + increment;
        }

        result = result.substr(offset);

        this.encrypt(val, idx, key, alphabets,result);
        return result.charAt(idx);

    };
}
let algo = new Railfence();
