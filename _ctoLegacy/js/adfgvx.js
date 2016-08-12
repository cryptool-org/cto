//*******************************(service-layer)
//*******************************
//*******************************

function CTOAdfgvxAlgorithm(alpha)
{

    var alphabet=alpha;

	//substitution (encrypt)
	//@author Christian Sieche
	//@version 30.12.2008
	//@params:
	//         plaintext (string), keysquare (string), key (string)
	this.encodePartA=encodePartA;
    function encodePartA(plaintext, keysquare, key)
	{
		var adfgvx = "ADFGVX";
		var codtxt = "";
		keysquare = keysquare.toLowerCase();
		plaintext = plaintext.toLowerCase();
		//only allowed signs
		plaintext = plaintext.replace(/[^a-z0-9]/g, "");
		//substitution
		for (var i = 0; i < plaintext.length; i++)
		{
			var index = keysquare.indexOf(plaintext.charAt(i));
			codtxt += adfgvx.charAt(index / 6) + adfgvx.charAt(index % 6);
		}
		return(codtxt);
	}

	//transposition (decrypt)
	//@author Christian Sieche
	//@version 30.12.2008
	//@params:
	//         chipertext (string), keysquare (string), key (string)
	this.decodePartA=decodePartA;
    function decodePartA(ciphertext, keysquare, key)
	{
		ciphertext=ciphertext.toLocaleLowerCase();
		var keybackup=key;
    	klen = key.length;
 		var cols;
 		cols = new Array(klen);

    	var newcols = new Array(klen);
		var transposition="";
    	chars=alphabet;
		j=0;
		i=0;

		//get transposition sequence
    	while(j<klen)
		{
        	t=key.indexOf(chars.charAt(i));
        		if(t >= 0)
				{
            		newcols[t] = cols[j++];
            		arrkw = key.split("");
					arrkw[t] = "_";
					key = arrkw.join("");
					if (transposition != "")
					{
						transposition = transposition + "-" + t;
					}
					else
					{
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
    	for (o=0; o<extracols; o++)
    	{
    		//int to str
    		var helper;
    		helper = o + "";
    		indizesarray[o]=transparray.indexOf(helper);
    		indizesarray[o]=transparray.indexOf(helper);
    	}

		
        var colLength = ciphertext.length / klen;
        //must be int!
        colLength=parseInt(colLength)
		var extra=0;
		//transposition
   		for(i=0; i < klen; i++)
   		{
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
	    	
		
   		outputarray = new Array(klen);

		//write cols in correct sequence to an output array
		for (i=0; i<klen; i++)
		{
			var helper;
    		helper = i + "";
    		outputarray[i] = cols[transparray.indexOf(helper)];
    	}
    	

    	

    	//read outbut array by rows not columns
    	plaintext1 = "";
    	var tmpcolLength=colLength;
    	if (extracols>0) tmpcolLength++;
    	for(i=0; i < tmpcolLength; i++)
		{
        	for(j=0; j < klen; j++) plaintext1 += outputarray[j].charAt(i);
    	}
    	


    	//add tranposition information and return
		endarrayint = new Array(transparray.length);
		endarraystring = new Array(transparray.length);
		for (var i=0; i<transparray.length; i++)
		{
			endarrayint[transparray[i]]=i+1;
			endarraystring[i]=keybackup.charAt(transparray[i]);
		}
		var endoutput1=endarrayint.join("-");
		var endoutput2=endarraystring.join("");
		var endoutput3=endoutput1+" ("+endoutput2+")";
		outputarray = new Array(plaintext1,endoutput3);
		return(outputarray);
	}

	//substitution (decrypt)
	//@author Christian Sieche
	//@version 30.12.2008
	//@params:
	//         substitutiontext (string), keysquare (string)
	this.decodePartB=decodePartB;
    function decodePartB(substitutiontext, keysquare)
	{
		substitutiontext=substitutiontext.toUpperCase();
		adfgvx = "ADFGVX";
		plaintext = "";
    	for (i = 0; i < substitutiontext.length; i += 2)
		{
			keyindex = adfgvx.indexOf(substitutiontext.charAt(i)) * 6 + adfgvx.indexOf(substitutiontext.charAt(i + 1));
			plaintext += keysquare.charAt(keyindex);
		}
		return(plaintext);
    }

    this.getAlphabet=getAlphabet;
    function getAlphabet()
    {
    	return alphabet;
    }

	//transposition (encrypt)
	//@author Christian Sieche
	//@version 30.12.2008
	//@params:
	//         substitutiontext (string), key (string)
	this.encodePartB = encodePartB;
	function encodePartB (substitutiontext, key)
	{
			var output="";
			var keybackup=key;
    		var colLength = substitutiontext.length / key.length;
			var transposition="";
    		ciphertext = "";
			k=0;
    		for(i=0; i < key.length; i++)
			{
        		while(k<alphabet.length)
				{
            		t = key.indexOf(alphabet.charAt(k));
            		arrkw = key.split("");
					arrkw[t] = "_";
					key = arrkw.join("");
            		if(t >= 0) break;
            		else k++;
        		}
		    if (transposition != "")
			{
				transposition = transposition + "-" + t;
			}
			else
			{
				transposition = "" + t;
			}
        	for(j=0; j < colLength; j++) output += substitutiontext.charAt(j*key.length + t);
    		}
			var transparray = transposition.split("-");
			endarrayint = new Array(transparray.length);
			endarraystring = new Array(transparray.length);
			for (var i=0; i<transparray.length; i++)
			{
				endarrayint[transparray[i]]=i+1;
				endarraystring[i]=keybackup.charAt(transparray[i]);
			}
			var endoutput1=endarrayint.join("-");
			var endoutput2=endarraystring.join("");
			var endoutput3=endoutput1+" ("+endoutput2+")";
			outputarray = new Array(output,endoutput3);
			return(outputarray);
    }



}


//*******************************(gui-access-layer)
//*******************************
//*******************************

function CTOAdfgvxGuiAccess ()
{
	var alphabet = "";
    var cryptoclass = new CTOAdfgvxAlgorithm(alphabet);
	var ctolib = new CTOLib();


	//@author Christian Sieche
	//@version 23.12.2008
	//@params:
    this.ChangeParseAlphabetTextA = ChangeParseAlphabetTextA;
    function ChangeParseAlphabetTextA()
    {
    	//get latest status
    	var status=document.getElementById("vertical_statusA").innerHTML;
    	var alphtext;
    	//if its closed...
    	if (status=="close")
    	{
    		alphabetSlide.slideIn();
    		alphtext = document.getElementById("v_toggleA").value;
    		alphtext = alphtext.replace(/>>/g, "<<");
    	}
    	else
    	{
    		alphabetSlide.slideOut();
    		alphtext = document.getElementById("v_toggleA").value;
    		alphtext = alphtext.replace(/<</g, ">>");
    	}
    	document.getElementById("v_toggleA").value = alphtext;
    }

    //@author Christian Sieche
	//@version 23.12.2008
	//@params:
    this.ChangeParseAlphabetTextB = ChangeParseAlphabetTextB;
    function ChangeParseAlphabetTextB()
    {
    	//get latest status
    	var status=document.getElementById("vertical_statusB").innerHTML;
    	var alphtext;
    	//if its closed...
    	if (status=="close")
    	{
    		betaSlide.slideIn();
    		alphtext = document.getElementById("v_toggleB").value;
    		alphtext = alphtext.replace(/>>/g, "<<");
    	}
    	else
    	{
    		betaSlide.slideOut();
    		alphtext = document.getElementById("v_toggleB").value;
    		alphtext = alphtext.replace(/<</g, ">>");
    	}
    	document.getElementById("v_toggleB").value = alphtext;
    }




	//generates random keysquare for substitution
	//@author Christian Sieche
	//@version 30.12.2008
	//@params:
	this.genRandomKeysquare = genRandomKeysquare;
	function genRandomKeysquare()
	{
		genKeysquare(ctolib.genRandKey("ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"));
		adfgvxCrypt(false);
	}

	//generates standard keysquare for substitution
	//@author Christian Sieche
	//@version 30.12.2008
	//@params:
	this.genStandardKeysquare = genStandardKeysquare;
	function genStandardKeysquare()
	{
		genKeysquare("ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789");
		adfgvxCrypt(false);
	}

	//generates custom keysquare for substitution
	//@author Christian Sieche
	//@version 30.12.2008
	//@params:
	this.genMyKeysquare = genMyKeysquare;
	function genMyKeysquare(nocrypt)
	{
		var keysquare = document.getElementById("mymatrix").value;
		var result=false;
		var allowedkeys="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
		//check if character is allowed
		keysquare=keysquare.toUpperCase();
		keysquare=ctolib.cleanInputString(keysquare, allowedkeys, false);
		//check if the key got 36 characters
		if (keysquare.length<36) result=false;
		//check if all character are used unique
        else result = ctolib.uniqueTest(keysquare, allowedkeys);
		//output
		if (result==true)
		{
			genKeysquare(keysquare);
			if (nocrypt!=true) adfgvxCrypt(false);
		}
		else
		{
			document.getElementById('mymatrix').className = 'ctoformcss-invalid-style ctoformcss-adfgvx-matrix-input-size';
			if (document.CTOAdfgvxForm1.code[0].checked == true)
			{
				document.getElementById("codtxt").value = "";
				document.getElementById("substitutiontxt").value = "";
			}
			else
			{
				document.getElementById("orgtxt").value = "";
				document.getElementById("substitutiontxt").value = "";
			}
		}
		document.getElementById("mymatrix").value=keysquare;
	}


	//returns keysquare or false if keysquare is invalid
	//@author Christian Sieche
	//@version 30.12.2008
	//@params:
	this.getKeysquare = getKeysquare;
	function getKeysquare()
	{
		var keysquare = document.getElementById("mymatrix").value;
		var result=false;
		var allowedkeys="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
		//check if character is allowed
		keysquare=keysquare.toUpperCase();
		keysquare=ctolib.cleanInputString(keysquare, allowedkeys, false);
		//check if the key got 36 characters
		if (keysquare.length<36) return(false);
		//check if all character are used unique
        if (ctolib.uniqueTest(keysquare, allowedkeys)==false) return(false);
		//output
		genKeysquare(keysquare);
		document.getElementById('mymatrix').className = 'ctoformcss-txtinput-style ctoformcss-adfgvx-matrix-input-size';
		document.getElementById("mymatrix").value=keysquare;
		return(keysquare);
	}



	//generates/formates keysquare for substitution
	//@author Christian Sieche
	//@version 30.12.2008
	//@params: keysquare (string)
	this.genKeysquare = genKeysquare; //generate keysquare for substitution
	function genKeysquare(keysquare)
	{
		document.getElementById("AA").value=keysquare.charAt(0);
		document.getElementById("AD").value=keysquare.charAt(1);
		document.getElementById("AF").value=keysquare.charAt(2);
		document.getElementById("AG").value=keysquare.charAt(3);
		document.getElementById("AV").value=keysquare.charAt(4);
		document.getElementById("AX").value=keysquare.charAt(5);

		document.getElementById("DA").value=keysquare.charAt(6);
		document.getElementById("DD").value=keysquare.charAt(7);
		document.getElementById("DF").value=keysquare.charAt(8);
		document.getElementById("DG").value=keysquare.charAt(9);
		document.getElementById("DV").value=keysquare.charAt(10);
		document.getElementById("DX").value=keysquare.charAt(11);

		document.getElementById("FA").value=keysquare.charAt(12);
		document.getElementById("FD").value=keysquare.charAt(13);
		document.getElementById("FF").value=keysquare.charAt(14);
		document.getElementById("FG").value=keysquare.charAt(15);
		document.getElementById("FV").value=keysquare.charAt(16);
		document.getElementById("FX").value=keysquare.charAt(17);

		document.getElementById("GA").value=keysquare.charAt(18);
		document.getElementById("GD").value=keysquare.charAt(19);
		document.getElementById("GF").value=keysquare.charAt(20);
		document.getElementById("GG").value=keysquare.charAt(21);
		document.getElementById("GV").value=keysquare.charAt(22);
		document.getElementById("GX").value=keysquare.charAt(23);

		document.getElementById("VA").value=keysquare.charAt(24);
		document.getElementById("VD").value=keysquare.charAt(25);
		document.getElementById("VF").value=keysquare.charAt(26);
		document.getElementById("VG").value=keysquare.charAt(27);
		document.getElementById("VV").value=keysquare.charAt(28);
		document.getElementById("VX").value=keysquare.charAt(29);

		document.getElementById("XA").value=keysquare.charAt(30);
		document.getElementById("XD").value=keysquare.charAt(31);
		document.getElementById("XF").value=keysquare.charAt(32);
		document.getElementById("XG").value=keysquare.charAt(33);
		document.getElementById("XV").value=keysquare.charAt(34);
		document.getElementById("XX").value=keysquare.charAt(35);
		document.getElementById("mymatrix").value=keysquare;
		document.getElementById('mymatrix').className = 'ctoformcss-txtinput-style ctoformcss-adfgvx-matrix-input-size';
	}


	//@author Christian Sieche
	//@version 26.12.2008
	//@params: click(int) item which has been clicked. 1=uppercase, 2=blanks, 3=digits,
	//                                                 4=punctuation marks, 5=lowercase, 6=umlauts
	this.setAlphabet = setAlphabet; //specify the alphabet
	function setAlphabet(click)
	{
		// 0=click(int), 1=uppercase(boolean), 2=blanks(boolean),
		// 3=digits(boolean), 4=punctuation marks(boolean), 5=lowercase(boolean),
		// 6=umlauts(boolean), 7=rot-13(boolean), 8=alphabet(string)
		params = new Array(     click,
							   	document.getElementById("uppercase").checked,
								document.getElementById("blanks").checked,
								document.getElementById("digits").checked,
								document.getElementById("punctuationmarks").checked,
								document.getElementById("lowercase").checked,
								document.getElementById("umlauts").checked,
								false,
								alphabet);

		params = ctolib.setAlphabet(params);

		document.getElementById("uppercase").checked = params[1];
		document.getElementById("blanks").checked = params[2];
		document.getElementById("digits").checked = params[3];
		document.getElementById("punctuationmarks").checked = params[4];
		document.getElementById("lowercase").checked = params[5];
		document.getElementById("umlauts").checked = params[6];
		alphabet = params[8];

		document.getElementById("plaintextabc").innerHTML = ctolib.niceAlphabetOutput(alphabet);
		document.getElementById("alphalength").value = alphabet.length;
		cryptoclass = new CTOAdfgvxAlgorithm(alphabet);
		checkKey(); //starts encryption too
	}



	//@author Christian Sieche
	//@version 26.12.2008
	//@params:
    this.checkKey = checkKey;
    function checkKey() //check the key
    {
    var copy = key;
            var key=document.getElementById("key").value;
            if (document.getElementById("uppercase").checked == true && document.getElementById("lowercase").checked == false)
                key = key.toUpperCase();

            if (document.getElementById("uppercase").checked  == false && document.getElementById("lowercase").checked == true)
                key = key.toLowerCase();
			
			key=ctolib.cleanInputString(key, alphabet, false);
			if (copy!=key) document.getElementById("key").value=key;
			document.getElementById("key").value=key;
			adfgvxCrypt(false);
    }


	//@author Christian Sieche
	//@version 30.12.2008
	//@params:
	// type = "encode" or "decode"
    this.adfgvxCrypt = adfgvxCrypt;
    function adfgvxCrypt(type) //starts encryption
    {
        genMyKeysquare(true);
        
        //set value to radiogroup
        if (type == "encode")
        {
            document.CTOAdfgvxForm1.code[0].checked = true;
            document.CTOAdfgvxForm1.code[1].checked = false;
        }

        if (type == "decode")
        {
            document.CTOAdfgvxForm1.code[0].checked = false;
            document.CTOAdfgvxForm1.code[1].checked = true;
        }
        //get value of radiogroup
        var type;
        for (var i = 0; i < document.CTOAdfgvxForm1.code.length; i++)
			if (document.CTOAdfgvxForm1.code[i].checked)
                type = document.CTOAdfgvxForm1.code[i].value;

		var allowedinput="abcdefghijklmnopqrstuvwxyz0123456789";
		
		//start check key
			var key = document.getElementById("key").value;
			var allowedkeys=alphabet;
      key = ctolib.cleanInputString(key, allowedkeys, false);
      document.getElementById("key").value=key;
   //end check key

        if (type == "encode")
        {
    		document.getElementById('codtxt').className = 'ctoformcss-txtinput-style ctoformcss-default-input-size';
            var orgtext = document.getElementById("orgtxt").value;

            var isInputOK = ctolib.inputString(orgtext.toLowerCase(), allowedinput);

            if (isInputOK == false)
            {
                document.getElementById('orgtxt').className = 'ctoformcss-invalid-style ctoformcss-default-input-size';
            }
            else
            {
                document.getElementById('orgtxt').className = 'ctoformcss-txtinput-style ctoformcss-default-input-size';
            }

			if (key != "")
			{
				// substitution
				var outputsubstitution;
				var keysquare = getKeysquare();
				if (keysquare == false)
				{
					document.getElementById("codtxt").value = "";
					document.getElementById("substitutiontxt").value = "";
					return;
				}
				outputsubstitution = cryptoclass.encodePartA(orgtext, keysquare, key);
				var tmp;

				if (document.getElementById("cleansubstitution").checked == false)
				{
					tmp = ctolib.str_split(outputsubstitution, 45);
				}
				else
					tmp = ctolib.str_split(outputsubstitution, 2);
				tmp = tmp.join(" ");
				document.getElementById("substitutiontxt").value = tmp;

				// transposition
				outputarray = cryptoclass.encodePartB(outputsubstitution, key);
				var output = outputarray[0];

				var tmp2;

				if (document.getElementById("clean").checked == false)
				{
					tmp = ctolib.str_split(output, 45);
				}
				else
					tmp = ctolib.str_split(output, 2);
				tmp = tmp.join(" ");
				document.getElementById("codtxt").value = tmp;
				document.getElementById("columns").value = outputarray[1];
			}
			else
			{
				document.getElementById("key").value = key;
				document.getElementById("codtxt").value = "";
				document.getElementById("columns").value = "";
			}
        }

        if (type == "decode")
        {
			document.getElementById('orgtxt').className = 'ctoformcss-txtinput-style ctoformcss-default-input-size';
			if (document.getElementById('clean').checked==true) document.getElementById('clean').checked=false;
			var codtext = document.getElementById("codtxt").value
			var keysquare = getKeysquare();
			if (keysquare == false)
			{
				document.getElementById("orgtxt").value = "";
				document.getElementById("substitutiontxt").value = "";
				return;
			}

			//remove blanks and enter
			codtext=codtext.replace(/ /g, "");
			codtext=codtext.replace(/\r/g, "");
			codtext=codtext.replace(/\n/g, "");

			// transposition
			var re = /[^ADFGVXadfgvx]/;
			var error=0; //0=ok, 1=error, 2=ciphertext error, 2=
    		if(codtext.length < 1){ error=1; }
    		if(re.test(codtext)){ error=2;};
    		if(codtext.length % 2 != 0){ error=2; }
    		if(key.length <= 1){ error=1; }
			if (error>0)
			{
				if (error==2)
				{
				  document.getElementById('codtxt').className = 'ctoformcss-invalid-style ctoformcss-default-input-size';
				}
				else document.getElementById('codtxt').className = 'ctoformcss-txtinput-style ctoformcss-default-input-size';
				document.getElementById("substitutiontxt").value = "";
				document.getElementById("orgtxt").value = "";
				return;
			}
			document.getElementById('codtxt').className = 'ctoformcss-txtinput-style ctoformcss-default-input-size';
			outputarray = cryptoclass.decodePartA(codtext, keysquare, key);
			var outputsubstitution = outputarray[0];
			var tmp;
			if (document.getElementById("cleansubstitution").checked == false)
			{
				tmp = ctolib.str_split(outputsubstitution, 45);
			}
				else
					tmp = ctolib.str_split(outputsubstitution, 2);
			tmp = tmp.join(" ");
			document.getElementById("substitutiontxt").value = tmp.toUpperCase();
			document.getElementById("columns").value = outputarray[1];

			tmp = ctolib.str_split(cryptoclass.decodePartB(outputsubstitution, keysquare), 45);
			tmp = tmp.join(" ");
			document.getElementById("orgtxt").value = tmp;
        }
    }


}

//FX.Slide Effekt
var alphabetSlide;
window.onload = function() {
	var status = {
		'true': 'open',
		'false': 'close'
	};
	//-vertical
	this.alphabetSlide = new Fx.Slide('alphabet-options');
	this.alphabetSlide.hide();
	this.betaSlide = new Fx.Slide('substitution');
    this.betaSlide.hide();
	$('vertical_statusA').set('html', status[alphabetSlide.open]);
	$('vertical_statusB').set('html', status[betaSlide.open]);
	// When Vertical Slide ends its transition, we check for its status
	// note that complete will not affect 'hide' and 'show' methods
	alphabetSlide.addEvent('complete', function() {
		$('vertical_statusA').set('html', status[alphabetSlide.open]);
	});
	betaSlide.addEvent('complete', function() {
		$('vertical_statusB').set('html', status[betaSlide.open]);
	});

};


//create adfgvx object with alphabet and start necessary scripts
var CTOAdfgvxScripts = new CTOAdfgvxGuiAccess();