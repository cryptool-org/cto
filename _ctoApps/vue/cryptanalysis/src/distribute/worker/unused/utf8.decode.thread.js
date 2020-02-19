import Threads from 'threads';

export default function UTF8DecodeThread() {
    const spawn = Threads.spawn;

    this.kill = function() {
        spawn.kill();
    };

    this.thread = spawn(function (input, done) {
        //let obj = input.obj;
        let result = input.result;
        let keys = input.keys;

        function byteToString(result) {
            if (!result) return;

            var plaintext = "";
            for (let k = 0; k < result.length; k++) {
                if (result[k] > 200) { continue; }
                plaintext += String.fromCharCode(result[k]);
            }

            //  That's it; plug plaintext into the result field
            return decode_utf8(plaintext);
        }

        let k, obj;
        for (k = 0; k < keys.length; k++) {
            obj = keys[k];
            //console.log(tmp);
            if (obj.key === result.tmp) {
                obj.otxt = byteToString(result.otxt);
                break;
            }
        }

        //var str = decode_utf8(obj.text);

        done(obj, k);

        //	UTF8_TO_UNICODE  --  Decode UTF-8 argument into Unicode string return value
        function utf8_to_unicode(utf8) {
            var s = "", i = 0, b1, b2, b3;

            while (i < utf8.length) {
                b1 = utf8.charCodeAt(i);
                if (b1 < 0x80) {	    // One byte code: 0x00 0x7F
                    s += String.fromCharCode(b1);
                    i++;
                } else if((b1 >= 0xC0) && (b1 < 0xE0)) {	// Two byte code: 0x80 - 0x7FF
                    b2 = utf8.charCodeAt(i + 1);
                    s += String.fromCharCode(((b1 & 0x1F) << 6) | (b2 & 0x3F));
                    i += 2;
                } else {	    	    // Three byte code: 0x800 - 0xFFFF
                    b2 = utf8.charCodeAt(i + 1);
                    b3 = utf8.charCodeAt(i + 2);
                    s += String.fromCharCode(((b1 & 0xF) << 12) |
                        ((b2 & 0x3F) << 6) |
                        (b3 & 0x3F));
                    i += 3;
                }
            }
            return s;
        }

        /*  DECODE_UTF8  --  Decode a string encoded with encode_utf8
         above.  If the string begins with the
         sentinel character 0x9D (OPERATING
         SYSTEM COMMAND), then we decode the
         balance as a UTF-8 stream.  Otherwise,
         the string is output unchanged, as
         it's guaranteed to contain only 8 bit
         characters excluding 0x9D.  */

        function decode_utf8(s) {
            if ((s.length > 0) && (s.charCodeAt(0) == 0x9D)) {
                return utf8_to_unicode(s.substring(1));
            }
            return s;
        }

    });

}