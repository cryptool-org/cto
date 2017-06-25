"use strict";

function Redefence() {
    this.encrypt = function (val, idx, key, alphabets, msg) {
        var i, j, dir;
        var cipher = "";
        var rows = [];
        var rails = document.getElementById("depth").selectedIndex + 3;
        var offset = document.getElementById("offset").selectedIndex;

        var orderInput = document.getElementById("order").value;
        var orderTmp = orderInput.split(" ");

        var order = orderTmp.filter(function(elem, index, self) {
            return index == self.indexOf(elem);
        });

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

        var result = "";

        for(var i = 0; i < rails; i++) {
            var n = parseInt(order[i]-1);
            result += rows[n].replace(/\s+/g, '');
        }

        return result.charAt(idx);
    };
    this.decrypt = function (val, idx, key, alphabets, msg2) {
        // org contains the text that will be decrypted
        var org = msg2;

        var result = "";
        var increment;

        var orderInput = document.getElementById("order").value;
        var orderTmp = orderInput.split(" ");

        // order defines in which order the rows are filled
        var order = orderTmp.filter(function(elem, index, self) {
            return index == self.indexOf(elem);
        });

        var rails = document.getElementById("depth").selectedIndex + 3;
        var offset = document.getElementById("offset").selectedIndex;

        var allAlphabets = "";
        for(var i = 0; i < alphabets.length; i++) {
            allAlphabets += alphabets[i].getElementsByClassName('alphabet')[0].value;
        }

        var regex = new RegExp('[^' + allAlphabets + ']', 'g');
        org = org.replace(regex, '');

        // oneTurn is the amount of characters before they reach the topmost position
        var oneTurn = rails*2-2;

        // halfTurn is the amount of characters before they reach the bottommost position
        var halfTurn = (rails*2-2)/2;

        // turns is an array that contains the amount of characters in each horizontal row
        var turns = [];
        var len = org.length;

        // resultArray contains the characters of each row (rA[0] is only the topmost row, rA[1] the second row ...)
        var resultArray = [];

        for(var i = 0; i < rails; i++) {
            turns[i] = Math.floor(len/oneTurn)*2;
            resultArray[i] = "";
        }
        turns[0] = Math.floor(len/oneTurn);
        turns[rails-1] = Math.floor(len/oneTurn);

        for(var i = 0; i < (len%oneTurn); i++) {
            if(i <= oneTurn/2)
                turns[i] = turns[i]+1;
            else
                turns[oneTurn-i] = turns[oneTurn-i] + 1;
        }

        // the loop goes through org and fills the entries of resultArray with as many characters as stated in turns[] for each row
        // it is filled in the order that was defined inside "order"
        for(var i = 0; i < rails; i++) {
            var m = order[i]-1;
            for(var j = 0; j < turns[m]; j++) {
                resultArray[m] += org.charAt(0);
                org = org.slice(1);
            }
        }

        // msg is a string that contains the ciphertext, but with the character groups in the correct order
        // now it will do the same same steps that are used in the standard railfence decryption
        var msg = resultArray.join("");


        msg = msg.replace(regex, '');


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

        return result.charAt(idx);

    };
}
let algo = new Redefence();