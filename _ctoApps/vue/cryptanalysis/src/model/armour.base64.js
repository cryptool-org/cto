
export default function ArmourBase64() {
	var maxLineLength = 64; 	    	// Maximum line length for armoured text

	/*	    	    	    Base64 Armour

	 Base64 armour encodes a byte array as described in RFC 1341.  Sequences
	 of three bytes are encoded into groups of four characters from a set
	 of 64 consisting of the upper and lower case letters, decimal digits,
	 and the special characters "+" and "/".  If the input is not a multiple
	 of three characters, the end of the message is padded with one or two
	 "=" characters to indicate its actual length.  We prefix the armoured
	 message with "?b64" and append "?64b" to the end; if one or both
	 of these sentinels are present, text outside them is ignored.  You can
	 suppress the generation of sentinels in armour by setting base64addsent
	 false before calling armour_base64.  */


	var base64code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
		base64sent = "?b64", base64esent = "?64b", base64addsent = true;

	function armour_base64(b) {
		var b64t = "";
		var b64l = base64addsent ? base64sent : "";

		var i;
		for (i = 0; i <= b.length - 3; i += 3) {
			if ((b64l.length + 4) > maxLineLength) {
				b64t += b64l + "\n";
				b64l = "";
			}
			b64l += base64code.charAt(b[i] >> 2);
			b64l += base64code.charAt(((b[i] & 3) << 4) | (b[i + 1] >> 4));
			b64l += base64code.charAt(((b[i + 1] & 0xF) << 2) | (b[i + 2] >> 6));
			b64l += base64code.charAt(b[i + 2] & 0x3F);
		}

		//dump("b.length", b.length);  dump("i", i); dump("(b.length - i)", (b.length - i));
		if ((b.length - i) == 1) {
			b64l += base64code.charAt(b[i] >> 2);
			b64l += base64code.charAt(((b[i] & 3) << 4));
			b64l += "==";
		} else if ((b.length - i) == 2) {
			b64l += base64code.charAt(b[i] >> 2);
			b64l += base64code.charAt(((b[i] & 3) << 4) | (b[i + 1] >> 4));
			b64l += base64code.charAt(((b[i + 1] & 0xF) << 2));
			b64l += "=";
		}

		if ((b64l.length + 4) > maxLineLength) {
			b64t += b64l + "\n";
			b64l = "";
		}
		if (base64addsent) {
			b64l += base64esent;
		}
		b64t += b64l + "\n";
		return b64t;
	}

	function disarm_base64(s) {
		var b = new Array();
		var i = 0, j, c, shortgroup = 0, n = 0;
		var d = new Array();

		if ((j = s.indexOf(base64sent)) >= 0) {
			s = s.substring(j + base64sent.length, s.length);
		}
		if ((j = s.indexOf(base64esent)) >= 0) {
			s = s.substring(0, j);
		}

		/*  Ignore any non-base64 characters before the encoded
		 data stream and skip the type sentinel if present.  */

		while (i < s.length) {
			if (base64code.indexOf(s.charAt(i)) != -1) {
				break;
			}
			i++;
		}

		/*  Decode the base64 data stream.  The decoder is
		 terminated by the end of the input string or
		 the occurrence of the explicit end sentinel.  */

		while (i < s.length) {
			for (j = 0; j < 4;) {
				if (i >= s.length) {
					if (j > 0) {
						return b;
					}
					break;
				}
				c = base64code.indexOf(s.charAt(i));
				if (c >= 0) {
					d[j++] = c;
				} else if (s.charAt(i) == "=") {
					d[j++] = 0;
					shortgroup++;
				} else if (s.substring(i, i + base64esent.length) == base64esent) {
					//dump("s.substring(i, i + base64esent.length)", s.substring(i, i + base64esent.length));
					//dump("esent", i);
					i = s.length;
					continue;
				} else {
					//dump("s.substring(i, i + base64esent.length)", s.substring(i, i + base64esent.length));
					//dump("usent", i);
					// Might improve diagnosis of improper character in else clause here
				}
				i++;
			}
			//dump("d0", d[0]); dump("d1", d[1]); dump("d2", d[2]); dump("d3", d[3]);
			//dump("shortgroup", shortgroup);
			//dump("n", n);
			if (j == 4) {
				b[n++] = ((d[0] << 2) | (d[1] >> 4)) & 0xFF;
				if (shortgroup < 2) {
					b[n++] = ((d[1] << 4) | (d[2] >> 2)) & 0xFF;
					//dump("(d[1] << 4) | (d[2] >> 2)", (d[1] << 4) | (d[2] >> 2));
					if (shortgroup < 1) {
						b[n++] = ((d[2] << 6) | d[3]) & 0xFF;
					}
				}
			}
		}
		return b;
	}
}