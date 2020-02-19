import Threads from 'threads';

export default function UTF8EncodeThread() {
    const spawn = Threads.spawn;

    this.kill = function() {
        spawn.kill();
    };

    const thread = spawn(function (input, done) {
        let obj = input.obj;

        var str = encode_utf8(obj.text);

        done(str);

        function unicode_to_utf8(s) {
            var utf8 = "";

            for (var n = 0; n < s.length; n++) {
                var c = s.charCodeAt(n);

                if (c <= 0x7F) {
                    //  0x00 - 0x7F:  Emit as single byte, unchanged
                    utf8 += String.fromCharCode(c);
                } else if ((c >= 0x80) && (c <= 0x7FF)) {
                    //  0x80 - 0x7FF:  Output as two byte code, 0xC0 in first byte
                    //  	    	    	    	    	    0x80 in second byte
                    utf8 += String.fromCharCode((c >> 6) | 0xC0);
                    utf8 += String.fromCharCode((c & 0x3F) | 0x80);
                } else {
                    // 0x800 - 0xFFFF:  Output as three bytes, 0xE0 in first byte
                    //  	    	    	    	    	   0x80 in second byte
                    //  	    	    	    	    	   0x80 in third byte
                    utf8 += String.fromCharCode((c >> 12) | 0xE0);
                    utf8 += String.fromCharCode(((c >> 6) & 0x3F) | 0x80);
                    utf8 += String.fromCharCode((c & 0x3F) | 0x80);
                }
            }
            return utf8;
        }

        /*	ENCODE_UTF8  --  Encode string as UTF8 only if it contains
         a character of 0x9D (Unicode OPERATING
         SYSTEM COMMAND) or a character greater
         than 0xFF.  This permits all strings
         consisting exclusively of 8 bit
         graphic characters to be encoded as
         themselves.  We choose 0x9D as the sentinel
         character as opposed to one of the more
         logical PRIVATE USE characters because 0x9D
         is not overloaded by the regrettable
         "Windows-1252" character set.  Now such characters
         don't belong in JavaScript strings, but you never
         know what somebody is going to paste into a
         text box, so this choice keeps Windows-encoded
         strings from bloating to UTF-8 encoding.  */

        function encode_utf8(s) {
            var i, necessary = false;

            for (i = 0; i < s.length; i++) {
                if ((s.charCodeAt(i) == 0x9D) ||
                    (s.charCodeAt(i) > 0xFF)) {
                    necessary = true;
                    break;
                }
            }
            if (!necessary) {
                return s;
            }
            return String.fromCharCode(0x9D) + unicode_to_utf8(s);
        }

    });

    return {
        kill: this.kill,
        thread: thread,
    };

}