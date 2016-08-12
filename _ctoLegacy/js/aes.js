
    //	    	JavaScrypt  --  Main page support functions
    
    //	    For details, see http://www.fourmilab.ch/javascrypt/

    var loadTime = (new Date()).getTime();  // Save time page was loaded
    var key;	    	    	    	    // Key (byte array)
    var prng;	    	    	    	    // Pseudorandom number generator
        
    //	setKey  --  Set key from string or hexadecimal specification
    
    function setKey() {
    	var s = encode_utf8(document.getElementById('key').value);
	    var i, kmd5e, kmd5o;

	    if (s.length == 1) {
	    	s += s;
	    }
	    
	    md5_init();
	    for (i = 0; i < s.length; i += 2) {
	    	md5_update(s.charCodeAt(i));
	    }
	    md5_finish();
	    kmd5e = byteArrayToHex(digestBits);
	    
	    md5_init();
	    for (i = 1; i < s.length; i += 2) {
	    	md5_update(s.charCodeAt(i));
	    }
	    md5_finish();
	    kmd5o = byteArrayToHex(digestBits);

	    var hs = kmd5e + kmd5o;
	    key =  hexToByteArray(hs);
	    hs = byteArrayToHex(key);
    }
    
    /*	Generate a key from the pseudorandom number generator
    	and stuff it in the key field.  The kind of key generated
	(text or hexadecimal) is determined by which box is checked
	below the key field.  */
    
    function Generate_key() {
    	var i, j, k = "";
	
    	var i, j, k = "";
	
	addEntropyTime();
	var seed = keyFromEntropy();
	
    	var prng = new AESprng(seed);
	    //	Text key
	    var charA = ("A").charCodeAt(0);
	    
	    for (i = 0; i < 12; i++) {
		if (i > 0) {
	    	    k += "-";
		}
		for (j = 0; j < 5; j++) {
	    	    k += String.fromCharCode(charA + prng.nextInt(25));
		}
	    }
    	document.getElementById('key').value = k;
	delete prng;
    }
    
    function Encrypt_text() {
    var modus=document.getElementById("modus").value;
 
    
    
	var v, i;
	var prefix = "";
	var suffix = "";
	
	
	if (document.getElementById('encrypt').value=="Verschlüsseln")
	{
	    prefix = "#####  AES-Verschlüsselung ("+modus+"). Zu entschlüsseln auf http://www.cryptool-online.org\n";
	    suffix = "#####  Ende der verschlüsselten Nachricht\n";
	}
	else
	{
	    prefix = "#####  AES-Encrypted ("+modus+"): decrypt with http://www.cryptool-online.org\n";
	    suffix = "#####  End encrypted message\n";
	}
	
    	if (document.getElementById('key').value.length == 0) {
	    return;
	}
    	if (document.getElementById('orgtxt').value.length == 0) {
    	document.getElementById('codtxt').value ="";
	    return;
	}
    	document.getElementById('codtxt').value = "";
    	setKey();

	addEntropyTime();
    	prng = new AESprng(keyFromEntropy());
	var plaintext = encode_utf8(document.getElementById('orgtxt').value);
	
	//  Compute MD5 sum of message text and add to header
	
	md5_init();
	for (i = 0; i < plaintext.length; i++) {
	    md5_update(plaintext.charCodeAt(i));
	}
	md5_finish();
	var header = "";
	for (i = 0; i < digestBits.length; i++) {
	    header += String.fromCharCode(digestBits[i]);
	}
	
	//  Add message length in bytes to header
	
	i = plaintext.length;
	header += String.fromCharCode(i >>> 24);
	header += String.fromCharCode(i >>> 16);
	header += String.fromCharCode(i >>> 8);
	header += String.fromCharCode(i & 0xFF);

    	/*  The format of the actual message passed to rijndaelEncrypt
	    is:
	    
	    	    Bytes   	Content
		     0-15   	MD5 signature of plaintext
		    16-19   	Length of plaintext, big-endian order
		    20-end  	Plaintext
		    
	    Note that this message will be padded with zero bytes
	    to an integral number of AES blocks (blockSizeInBits / 8).
	    This does not include the initial vector for CBC
	    encryption, which is added internally by rijndaelEncrypt.
	    
	*/

  
	var ct = rijndaelEncrypt(header + plaintext, key, modus);
	
	
	var encodingform=document.getElementById('encoding').value;
    	if (encodingform==1) {
	    v = armour_codegroup(ct);
	} else if (encodingform==2) {
    	    v = armour_hex(ct);
	} else if (encodingform==3) {
    	    v = armour_base64(ct);
	}
	document.getElementById('codtxt').value = prefix + v + suffix;
    	delete prng;
    }
    
    /*  Examine the message and determine which kind of ASCII
    	armour it uses from the sentinel preceding the message.
	We test for each of the sentinels and, if any are
	found, decide based on the one found first in the
	message (since, for example, the sentinel for
	codegroup armour might appear in a Base64 message,
	but only after the Base64 sentinel).  If none of
	the sentinels are found, we decode using the armour
	type specified by the checkboxes for encryption.
	The return value is an integer which identifies the
	armour type as follows:
	
	    	0   Codegroup
		1   Hexadecimal
		2   Base 64
    */
    
    function determineArmourType(s) {
    	var kt, pcg, phex, pb64, pmin;
	
	pcg = s.indexOf(codegroupSentinel);
	phex = s.indexOf(hexSentinel);
	pb64 = s.indexOf(base64sent);
	if (pcg == -1) {
	    pcg = s.length;
	}
	if (phex == -1) {
	    phex = s.length;
	}
	if (pb64 == -1) {
	    pb64 = s.length;
	}
	pmin = Math.min(pcg, Math.min(phex, pb64));
	if (pmin < s.length) {
	    if (pmin == pcg) {
	    	kt = 0;
	    } else if (pmin == phex) {
	    	kt = 1;
	    } else {
	    	kt = 2;
	    }
	} else {
	       var encodingform=document.getElementById('encoding').value;
    	    if (encodingform==1) {
    		kt = 0;
	    } else if (encodingform==2) {
    		kt = 1;
	    } else if (encodingform==3) {
    		kt = 2;
	    }
	}
	return kt;
    }
    
    //	Decrypt ciphertext with key, place result in plaintext field
    
    function Decrypt_text() {
    	if (document.getElementById('key').value.length == 0) return;
    	if (document.getElementById('codtxt').value.length == 0) 
      {
        document.getElementById('orgtxt').value ="";
        return;
      }

    	document.getElementById('orgtxt').value = "";
    	setKey();
	var ct = new Array(), kt;
	kt = determineArmourType(document.getElementById('codtxt').value);
    	if (kt == 0) {
    	    ct = disarm_codegroup(document.getElementById('codtxt').value);
	} else if (kt == 1) {
    	    ct = disarm_hex(document.getElementById('codtxt').value);
	} else if (kt == 2) {
    	    ct = disarm_base64(document.getElementById('codtxt').value);
	}

  var modus=document.getElementById("modus").value;
	var result = rijndaelDecrypt(ct, key, modus);
	if (!result) return;
	var header = result.slice(0, 20);
	result = result.slice(20);
	
	/*  Extract the length of the plaintext transmitted and
	    verify its consistency with the length decoded.  Note
	    that in many cases the decrypted messages will include
	    pad bytes added to expand the plaintext to an integral
	    number of AES blocks (blockSizeInBits / 8).  */
	
	var dl = (header[16] << 24) | (header[17] << 16) | (header[18] << 8) | header[19];
    	if ((dl < 0) || (dl > result.length)) {
	    //	Try to sauve qui peut by setting length to entire message
    	    dl = result.length;
	}
	
	/*  Compute MD5 signature of message body and verify
	    against signature in message.  While we're at it,
	    we assemble the plaintext result string.  Note that
	    the length is that just extracted above from the
	    message, *not* the full decrypted message text.
	    AES requires all messages to be an integral number
	    of blocks, and the message may have been padded with
	    zero bytes to fill out the last block; using the
	    length from the message header elides them from
	    both the MD5 computation and plaintext result.  */
	    
	var i, plaintext = "";
	
	md5_init();
	for (i = 0; i < dl; i++) {
	    plaintext += String.fromCharCode(result[i]);
	    md5_update(result[i]);
	}
	md5_finish();

	for (i = 0; i < digestBits.length; i++) {
	    if (digestBits[i] != header[i]) {
		break;
	    }
	}
	
	//  That's it; plug plaintext into the result field
	
	document.getElementById('orgtxt').value = decode_utf8(plaintext);
    }