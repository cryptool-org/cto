
export default function ArmourCodeGroup() {
	var maxLineLength = 64; 	    	// Maximum line length for armoured text

	/*	    	    	    Codegroup Armour

	 Codegroup armour encodes a byte string into a sequence of five
	 letter code groups like spies used in the good old days.  The
	 first group of a message is always "ZZZZZ" and the last "YYYYY";
	 the decoding process ignores any text outside these start and
	 end sentinels.  Bytes are encoded as two letters in the range
	 "A" to "X", each encoding four bits of the byte.  Encoding uses
	 a pseudorandomly generated base letter and wraps around modulo
	 24 to spread encoded letters evenly through the alphabet.  (This
	 refinement is purely aesthetic; the base letter sequence is
	 identical for all messages and adds no security.  If the message
	 does not fill an even number of five letter groups, the last
	 group is padded to five letters with "Z" characters, which are
	 ignored when decoding.  */

	var acgcl, acgt, acgg;

	//	Output next codegroup, flushing current line if it's full

	function armour_cg_outgroup() {
		if (acgcl.length > maxLineLength) {
			acgt += acgcl + "\n";
			acgcl = "";
		}
		if (acgcl.length > 0) {
			acgcl += " ";
		}
		acgcl += acgg;
		acgg = "";
	}

	/*	Add a letter to the current codegroup, emitting it when
	 it reaches five letters.  */

	function armour_cg_outletter(l) {
		if (acgg.length >= 5) {
			armour_cg_outgroup();
		}
		acgg += l;
	}

	var codegroupSentinel = "ZZZZZ";

	function armour_codegroup(b) {
		var charBase = ("A").charCodeAt(0);

		acgcl = codegroupSentinel;
		acgt = "";
		acgg = "";

		var cgrng = new LEcuyer(0xbadf00d);
		for (i = 0; i < b.length; i++) {
			var r = cgrng.nextInt(23);
			armour_cg_outletter(String.fromCharCode(charBase + ((((b[i] >> 4) & 0xF)) + r) % 24));
			r = cgrng.nextInt(23);
			armour_cg_outletter(String.fromCharCode(charBase + ((((b[i] & 0xF)) + r) % 24)));
		}
		cgrng = null;

		//  Generate nulls to fill final codegroup if required

		while (acgg.length < 5) {
			armour_cg_outletter("Z");
		}
		armour_cg_outgroup();

		//  Append terminator group

		acgg = "YYYYY";
		armour_cg_outgroup();

		//  Flush last line

		acgt += acgcl + "\n";

		return acgt;
	}

	var dcgs, dcgi;

	/*	Obtain next "significant" character from message.  Characters
	 other than letters are silently ignored; both lower and upper
	 case letters are accepted.  */

	function disarm_cg_insig() {
		while (dcgi < dcgs.length) {
			var c = dcgs.charAt(dcgi++).toUpperCase();
			if ((c >= "A") && (c <= "Z")) {
//dump("c", c);
				return c;
			}
		}
		return "";
	}

	//	Decode a message in codegroup armour

	function disarm_codegroup(s) {
		var b = new Array();
		var nz = 0, ba, bal = 0, c;

		dcgs = s;
		dcgi = 0;

		//  Search for initial group of "ZZZZZ"

		while (nz < 5) {
			c = disarm_cg_insig();

			if (c == "Z") {
				nz++;
			} else if (c == "") {
				nz = 0;
				break;
			} else {
				nz = 0;
			}
		}

		if (nz == 0) {
			return "";
		}

		/*  Decode letter pairs from successive groups
		 and assemble into bytes.  */

		var charBase = ("A").charCodeAt(0);
		var cgrng = new LEcuyer(0xbadf00d);
		for (nz = 0; nz < 2; ) {
			c = disarm_cg_insig();
			//dump("c", c);

			if ((c == "Y") || (c == "")) {
				break;
			} else if (c != "Z") {
				var r = cgrng.nextInt(23);
				var n = c.charCodeAt(0) - charBase;
				n = (n + (24 - r)) % 24;
				//dump("n", n);
				if (nz == 0) {
					ba = (n << 4);
					nz++;
				} else {
					ba |= n;
					b[bal++] = ba;
					nz = 0;
				}
			}
		}
		cgrng = null;

		/*  Ponder how we escaped from the decoder loop and
		 issue any requisite warnings.  */

		var kbo = "  Attempting decoding with data received.";
		if (nz != 0) {
		} else {
			if (c == "Y") {
				nz = 1;
				while (nz < 5) {
					c = disarm_cg_insig();
					if (c != "Y") {
						break;
					}
					nz++;
				}
				if (nz != 5) {
				}
			} else {
			}
		}

		return b;
	}
}