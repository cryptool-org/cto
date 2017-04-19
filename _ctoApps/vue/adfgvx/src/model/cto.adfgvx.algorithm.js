var CTOAdfgvx = function CTOAdfgvxAlgorithm(alpha) {

    var alphabet = alpha;

	this.getAlphabet = function() {
		return alphabet;
	};

	//substitution (encrypt)
	//@author Christian Sieche
	//@version 30.12.2008
	//@params:
	//         plaintext (string), keysquare (string), key (string)
	this.encodePartA = function(plaintext, keysquare, type = "ADFGVX") {
		var codtxt = "";
		keysquare = keysquare.toLowerCase();
		plaintext = plaintext.toLowerCase();
		if (type.length === 5) {
			plaintext = plaintext.replace(/j/gi, 'i');
		}
		//only allowed signs
		plaintext = plaintext.replace(/[^a-z0-9]/g, "");
		//substitution
		for (var i = 0; i < plaintext.length; i++) {
			var index = keysquare.indexOf(plaintext.charAt(i));
			codtxt += type.charAt(index / type.length) + type.charAt(index % type.length);
		}
		return(codtxt);
	};

	//transposition (decrypt)
	//@author Christian Sieche
	//@version 30.12.2008
	//@params:
	//         chipertext (string), keysquare (string), key (string)
	this.decodePartA = function(ciphertext, keysquare, key) {
		ciphertext=ciphertext.toLocaleLowerCase();
		var keybackup=key;
		var klen = key.length;
 		var cols, arrkw;
 		cols = new Array(klen);

		var newcols = new Array(klen);
		var transposition="";
    	chars=alphabet;
		var j=0;
		var i=0;

		//get transposition sequence
    	while(j < klen) {
				let t=key.indexOf(chars.charAt(i));
				if(t >= 0) {
					newcols[t] = cols[j++];
					arrkw = key.split("");
					arrkw[t] = "_";
					key = arrkw.join("");
					if (transposition != "") {
						transposition = transposition + "-" + t;
					} else {
						transposition = "" + t;
					}
				}
				else i++;
    	}

    	var chars = ciphertext.length;
    	//how many extra cols are needed because text is not dividable by key
    	var extracols = chars % klen;
    	//write transposition sequence to array
    	var transparray = transposition.split("-");
    	//get the array position of the needed extra cols
    	var indizesarray = new Array(extracols);
    	var o;
    	for (o=0; o<extracols; o++) {
    		//int to str
    		var helper;
    		helper = o + "";
    		indizesarray[o]=transparray.indexOf(helper);
    		indizesarray[o]=transparray.indexOf(helper);
    	}

		
        var colLength = ciphertext.length / klen;
        //must be int!
        colLength=parseInt(colLength);
		var extra=0;
		//transposition
   		for(i=0; i < klen; i++) {
   			var helper;
    		helper = i + "";
   			if (indizesarray.indexOf(i)==-1) cols[i] = ciphertext.substr((i*colLength)+extra,colLength);
   			//if this col got more signs
   			else
   			{
   				cols[i] = ciphertext.substr((i*colLength)+extra,colLength+1);
   				extra+=1;
   			}
   		}
	    	
		
   		var outputarray = new Array(klen);

		//write cols in correct sequence to an output array
		for (i=0; i<klen; i++) {
			var helper;
    		helper = i + "";
    		outputarray[i] = cols[transparray.indexOf(helper)];
    	}
    	

    	//read outbut array by rows not columns
    	var plaintext1 = "";
    	var tmpcolLength=colLength;
    	if (extracols>0) tmpcolLength++;
    	for(i=0; i < tmpcolLength; i++) {
        	for(j=0; j < klen; j++) plaintext1 += outputarray[j].charAt(i);
    	}
    	


    	//add tranposition information and return
		var endarrayint = new Array(transparray.length);
		var endarraystring = new Array(transparray.length);
		for (i=0; i<transparray.length; i++) {
			endarrayint[transparray[i]]=i+1;
			endarraystring[i]=keybackup.charAt(transparray[i]);
		}
		var endoutput1=endarrayint.join("-");
		var endoutput2=endarraystring.join("");
		var endoutput3=endoutput1+" ("+endoutput2+")";
		outputarray = new Array(plaintext1,endoutput3);
		return(outputarray);
	};

	//substitution (decrypt)
	//@author Christian Sieche
	//@version 30.12.2008
	//@params:
	//         substitutiontext (string), keysquare (string)
	this.decodePartB=decodePartB;
	function decodePartB(substitutiontext, keysquare, type = "ADFGVX") {
		console.log(type);
		substitutiontext = substitutiontext.toUpperCase();
		let plaintext = "";
		for (let i = 0; i < substitutiontext.length; i += 2) {
			let keyindex = type.indexOf(substitutiontext.charAt(i)) * type.length + type.indexOf(substitutiontext.charAt(i + 1));
			plaintext += keysquare.charAt(keyindex);
		}
		return (plaintext);
	}

	//transposition (encrypt)
	//@author Christian Sieche
	//@version 30.12.2008
	//@params:
	//         substitutiontext (string), key (string)
	this.encodePartB = function(substitutiontext, key) {
			var t, output="";
			var keybackup=key;
			var colLength = substitutiontext.length / key.length;
		console.log(colLength);
			var transposition="";
    	//	ciphertext = "";
			var k=0;
			for(let i=0; i < key.length; i++) {
				console.log('alpha: ' + this.getAlphabet().length);
				while(k < this.getAlphabet().length) {
					t = key.indexOf(this.getAlphabet().charAt(k));
          let arrkw = key.split("");
					arrkw[t] = "_";
					key = arrkw.join("");
					if(t >= 0) break;
					else k++;
      	}
				if (transposition != "") {
					transposition = transposition + "-" + t;
				} else {
					transposition = "" + t;
				}
				for(let j=0; j < colLength; j++) {
					output += substitutiontext.charAt(j*key.length + t);
				}
			}
			var transparray = transposition.split("-");
			console.log(transparray);
		console.log(transparray.length);
			var endarrayint = new Array(transparray.length);
			var endarraystring = new Array(transparray.length);
			for (var i=0; i < transparray.length; i++) {
				endarrayint[transparray[i]]=i+1;
				endarraystring[i]=keybackup.charAt(transparray[i]);
			}
			var endoutput1=endarrayint.join("-");
			var endoutput2=endarraystring.join("");
			var endoutput3=endoutput1+" ("+endoutput2+")";
			return (new Array(output, endoutput3));
    }

};
export default CTOAdfgvx;
