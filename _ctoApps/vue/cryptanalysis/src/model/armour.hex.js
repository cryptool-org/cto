import ConvertHex from './convert.hex';

export default function ArmourHexadecimal() {
	//var convertHex = new ConvertHex();
    var maxLineLength = 64; 	    	// Maximum line length for armoured text

    /*	    	    	    Hexadecimal Armour

    	A message is encoded in Hexadecimal armour by expressing its
	bytes as a hexadecimal string which is prefixed by a sentinel
	of "?HX?" and suffixed by "?H", then broken into lines no
	longer than maxLineLength.  Armoured messages use lower case
	letters for digits with decimal values of 0 through 15, but
	either upper or lower case letters are accepted when decoding
	a message.  The hexadecimal to byte array interconversion
	routines in aes.js do most of the heavy lifting here.  */

    var hexSentinel = "?HX?", hexEndSentinel = "?H";

    //	Encode byte array in hexadecimal armour
	this.armour_hex = armour_hex;
    function armour_hex(b) {
    	var h = hexSentinel + ConvertHex.byteArrayToHex(b) + hexEndSentinel;
    	var t = "";
    	while (h.length > maxLineLength) {
    	//dump("h.length", h.length);
    	    t += h.substring(0, maxLineLength) + "\n";
    	    h = h.substring(maxLineLength, h.length);
    	}
    	//dump("h.final_length", h.length);
    	t += h + "\n";
    	return t;
    }

    /*	Decode string in hexadecimal armour to byte array.  If the
    	string supplied contains a start and/or end sentinel,
	only characters within the sentinels will be decoded.
	Non-hexadecimal digits are silently ignored, which
	automatically handles line breaks.  We might want to
	diagnose invalid characters as opposed to ignoring them.  */
	this.disarm_hex = disarm_hex;
    function disarm_hex(s) {
    	var hexDigits = "0123456789ABCDEF"; //"0123456789abcdefABCDEF";
    	var hs = "", i;

    	//  Extract hexadecimal data between sentinels, if present

    	if ((i = s.indexOf(hexSentinel)) >= 0) {
    	    s = s.substring(i + hexSentinel.length, s.length);
    	}
    	if ((i = s.indexOf(hexEndSentinel)) >= 0) {
    	    s = s.substring(0, i);
	    }

    	//  Assemble string of valid hexadecimal digits

    	for (i = 0; i < s.length; i++) {
    	    var c = s.charAt(i);
    	    if (hexDigits.indexOf(c) >= 0) {
    	    	hs += c;
    	    }
    	}
    	//dump("hs", hs);
    	return ConvertHex.hexToByteArray(hs);
    }
}